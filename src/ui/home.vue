<script lang="ts" setup>
import { onUnmounted, onMounted, ref } from 'vue'
// import jayData, { Data } from '../data/mock'
import jayData, { Data } from '../data/jay'

let index = 0

const video = ref<Data>(jayData[index])
const videoDOM = ref<HTMLVideoElement>()
const progress = ref<HTMLDivElement>()
const voice = ref<HTMLDivElement>()
const mode = ref<'random' | 'order' | 'single'>('random')
const nowTime = ref('00:00')
const allTime = ref('00:00')
const isPlaying = ref(false)
const showMV = ref(false)
const showList = ref(false)
let INTERVAL_ID: number | null = null

// 时间转换格式
const timeFormatting = (time: number) => {
  time = time | 0
  let res = '0'
  let m = (time / 60) | 0
  res += m + ':'
  time = time % 60
  if (time < 10) res += '0'
  return res + time
}

//上一首
const upSong = () => {
  pause()
  if (mode.value === 'random') {
    index = (Math.random() * jayData.length) | 0
    video.value = jayData[index]
  } else {
    index = (index + jayData.length - 1) % jayData.length
    video.value = jayData[index]
  }
  if (videoDOM.value) {
    videoDOM.value.oncanplay = () => {
      allTime.value = timeFormatting((videoDOM.value as HTMLVideoElement).duration)
      start()
    }
  }
}

// 下一首
const nextSong = () => {
  pause()
  if (mode.value === 'random') {
    let random = (Math.random() * jayData.length) | 0
    while (random === index) random = (Math.random() * jayData.length) | 0
    index = random
    video.value = jayData[index]
  } else {
    index = (index + 1) % jayData.length
    video.value = jayData[index]
  }
  if (videoDOM.value) {
    videoDOM.value.oncanplay = () => {
      allTime.value = timeFormatting((videoDOM.value as HTMLVideoElement).duration)
      start()
    }
  }
}

// 改变播放方式
const changeMode = () => {
  if (mode.value === 'single' && videoDOM.value) {
    mode.value = 'order'
    videoDOM.value.onended = () => {
      nextSong()
    }
  } else if (mode.value === 'order' && videoDOM.value) {
    mode.value = 'random'
    videoDOM.value.onended = () => {
      nextSong()
    }
  } else if (mode.value === 'random' && videoDOM.value) {
    mode.value = 'single'
    videoDOM.value.onended = () => {
      ;(videoDOM.value as HTMLVideoElement).currentTime = 0
      start()
    }
  }
}

// 开始
const start = async () => {
  if (!videoDOM.value) return
  if (FIRST_START) {
    firstStartFun()
  }
  videoDOM.value.play()
  isPlaying.value = true
  if (INTERVAL_ID !== null) {
    clearInterval(INTERVAL_ID)
  }
  INTERVAL_ID = setInterval(() => {
    checkProgress()
    checkTime()
  }, 500)
}

// 暂停
const pause = () => {
  videoDOM.value?.pause()
  isPlaying.value = false
  if (INTERVAL_ID) {
    clearInterval(INTERVAL_ID)
    INTERVAL_ID = null
  }
}
// 更新播放时间
const checkTime = () => {
  if (videoDOM.value) {
    nowTime.value = timeFormatting(videoDOM.value.currentTime)
  } else {
    nowTime.value = '00:00'
  }
}
// 更新进度条
const checkProgress = () => {
  if (videoDOM.value && progress.value) {
    let t = (videoDOM.value.currentTime * 100) / videoDOM.value.duration
    progress.value.style.width = t.toFixed(2) + '%'
  }
}
// 点击进度条
const headerProgress = (e: MouseEvent) => {
  if (videoDOM.value) {
    let t = (e.offsetX / 336) * videoDOM.value.duration
    videoDOM.value.currentTime = t
    checkTime()
    checkProgress()
    start()
  }
}
let handleVoiceStopBind: any = null
const handleVoice = (e: MouseEvent) => {
  voiceEventCallback(e)
  handleVoiceStopBind = handleVoiceStop.bind(this, e)
  e.target?.addEventListener('mousemove', voiceEventCallback)
  window.addEventListener('mouseup', handleVoiceStopBind)
}
const handleVoiceStop = (e: MouseEvent) => {
  e.target?.removeEventListener('mousemove', voiceEventCallback)
  window.removeEventListener('mouseup', handleVoiceStopBind)
}
const voiceEventCallback = (e: any) => {
  if (videoDOM.value && voice.value) {
    let t = e.offsetX / 100.8
    videoDOM.value.volume = t
    voice.value.style.width = (t * 100).toFixed(2) + '%'
    localStorage.setItem('jayVolume', (e.offsetX / 100.8).toFixed(2))
  }
}
// 选择歌曲
const selectSong = (id: number) => {
  pause()
  index = id
  video.value = jayData[index]
  if (videoDOM.value) {
    videoDOM.value.oncanplay = () => {
      allTime.value = timeFormatting((videoDOM.value as HTMLVideoElement).duration)
      start()
    }
  }
}

const openMV = () => {
  // 判断视频音源是否是mp4形式
  let t = video.value.videoUrl.split('.')[1]
  if (t === 'mp3') return
  start()
  showMV.value = true
}

const closeMV = () => {
  showMV.value = false
}

const openList = () => {
  showList.value = true
}
const closeList = () => {
  showList.value = false
}

onMounted(() => {
  if (videoDOM.value) {
    const volume = localStorage.getItem('jayVolume')
    if (volume && voice.value) {
      videoDOM.value.volume = Number(volume)
      voice.value.style.width = (Number(volume) * 100).toFixed(2) + '%'
    } else videoDOM.value.volume = 0.1

    videoDOM.value.oncanplay = () => {
      allTime.value = timeFormatting((videoDOM.value as HTMLVideoElement).duration)
    }
    if (mode.value === 'single') {
      videoDOM.value.onended = () => {
        ;(videoDOM.value as HTMLVideoElement).currentTime = 0
        start()
      }
    } else {
      videoDOM.value.onended = () => {
        ;(videoDOM.value as HTMLVideoElement).currentTime = 0
        nextSong()
      }
    }
  }
})

// 滚动事件
const list = ref<HTMLDivElement>()
function onmousewheel(e: any) {
  let dom = list.value
  if (e.wheelDelta > 0 && dom) {
    dom.scrollTop -= 60
  } else if (e.wheelDelta < 0 && dom) {
    dom.scrollTop += 60
  }
}
onMounted(() => {
  if (list.value) list.value.addEventListener('mousewheel', onmousewheel, false)
})
onUnmounted(() => {
  if (list.value) list.value.removeEventListener('mousewheel', onmousewheel)
})
// 搜索
const seach = ref('')
const songData = ref(jayData)
const handleSeach = () => {
  songData.value = jayData.filter((song) => {
    if (song.name.indexOf(seach.value) >= 0) return true
    else if (song.album.indexOf(seach.value) >= 0) return true
    else return false
  })
}

// 音频可视化
let FIRST_START = true
let analyser: any = null
let bufferLength: any = null
let dataArray: any = null
let audioContext: any = null

function firstStartFun() {
  if (!videoDOM.value) return
  audioContext = new AudioContext()
  analyser = audioContext.createAnalyser()
  analyser.fftSize = 512
  bufferLength = analyser.frequencyBinCount
  dataArray = new Uint8Array(bufferLength)
  let audioSrc = audioContext.createMediaElementSource(videoDOM.value)
  audioSrc.connect(analyser)
  analyser.connect(audioContext.destination)

  draw()
  FIRST_START = false
}

// cavase 画图
let canvas: any = null
let canvasCtx: any = null
onMounted(() => {
  canvas = document.querySelector('#canvas')
  canvasCtx = canvas.getContext('2d')
})
function draw() {
  requestAnimationFrame(draw)
  analyser.getByteTimeDomainData(dataArray)

  canvasCtx.fillStyle = 'rgb(40, 135, 227)'
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
  canvasCtx.beginPath()

  var sliceWidth = (canvas.width * 1.0) / bufferLength
  var x = 0

  for (var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 128.0
    var y = (v * canvas.height) / 2

    if (i === 0) {
      canvasCtx.moveTo(x, y)
    } else {
      canvasCtx.lineTo(x, y)
    }

    x += sliceWidth
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2)
  canvasCtx.lineTo(canvas.width, canvas.height)
  canvasCtx.lineTo(0, canvas.height)
  canvasCtx.lineTo(0, 0)
  canvasCtx.save()
  canvasCtx.clip()
  canvasCtx.fillStyle = 'rgba(22, 25, 30)'
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
  canvasCtx.restore()
}
</script>

<template>
  <div id="container" class="container" :class="{ 'MV-active': showMV }">
    <div v-show="showMV" class="MV">
      <div>
        <i
          @click="closeMV()"
          style="font-size: 30px; color: #fff; font-weight: bold"
          class="iconfont icon-guanbi"
        ></i>
      </div>
      <video
        crossOrigin="anonymous"
        ref="videoDOM"
        :src="video.videoUrl"
        controls
        controlslist="nodownload"
        @contextmenu.prevent="
          () => {
            return false
          }
        "
      ></video>
    </div>
    <div v-show="showList" class="list">
      <div class="close-list">
        <i
          @click="closeList()"
          style="font-size: 18px; color: #111; font-weight: bold"
          class="iconfont icon-guanbi"
        ></i>
      </div>
      <input v-model="seach" @input="handleSeach()" type="text" />
      <div class="list-scroll" ref="list">
        <div
          v-for="item in songData"
          :key="item.id"
          :class="['song', { songActive: item.id === video.id }]"
          @click="selectSong(item.id - 1)"
        >
          <img
            style="width: 48px; height: 48px; border-radius: 3px"
            :src="item.imgUrl"
            alt="图片"
          />
          <div>
            <div>{{ item.name }}</div>
            <div>{{ item.album }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="header">
      <i
        @click="openList()"
        class="iconfont icon-zhankai"
        style="font-weight: 800; color: #111"
      ></i>
    </div>
    <div class="image">
      <img :src="video.imgUrl" style="width: 100%; height: 100%" alt="图片" />
    </div>
    <div class="name">
      <div>{{ video.name }}</div>
      <div>{{ video.album }}</div>
    </div>
    <div class="button-list">
      <i
        title="随机播放"
        @click="changeMode()"
        v-if="mode === 'random'"
        class="iconfont icon-suijibofang"
      ></i>
      <i
        title="单曲循环"
        @click="changeMode()"
        v-if="mode === 'single'"
        class="iconfont icon-danquxunhuan1"
      ></i>
      <i
        title="顺序播放"
        @click="changeMode()"
        v-if="mode === 'order'"
        class="iconfont icon-23_shunxubofang"
      ></i>
      <i class="iconfont icon-shangyishou" @click="upSong()"></i>
      <i v-if="!isPlaying" class="iconfont icon-kaishi1" @click="start()"></i>
      <i v-else class="iconfont icon-zantingtingzhi" @click="pause()"></i>
      <i class="iconfont icon-next-fill" @click="nextSong()"></i>
      <i class="iconfont icon-shipin" @click="openMV()"></i>
    </div>
    <div @click="headerProgress($event)" class="progress-bar">
      <div ref="progress"></div>
    </div>
    <div class="time-bar">
      <div>{{ nowTime }}</div>
      <div class="voice-bar" @mousedown="handleVoice($event)" title="声音调节">
        <div class="voice" ref="voice"></div>
      </div>
      <div>{{ allTime }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 32px;
  border-radius: 5px;
  transition: all 0.5s;
}

#container.MV-active {
  width: 700px;
}
.MV {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #555;
  position: absolute;
}
.MV > div {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 999999;
}
video {
  width: 100%;
  height: 100%;
  z-index: 99;
}

.header {
  height: 30px;
  text-align: right;
}
.image {
  height: 296px;
  margin: 10px 20px;
  background-color: grey;
}
.name {
  text-align: center;
}
.name > div:first-child {
  font-weight: 500;
  font-size: 22px;
}
.name > div:last-child {
  font-size: 14px;
  color: #777;
}
i:active {
  transform: scale(0.98);
}
.button-list {
  margin: 20px 0;
  display: flex;
  justify-content: space-evenly;
}
.button-list > i {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.button-list > i:nth-child(3) {
  height: 60px;
  width: 60px;
  background-color: #2887e3;
  border-radius: 50%;
  font-size: 30px;
  color: white;
}

.button-list > i:nth-child(2),
.button-list > i:nth-child(4) {
  font-size: 30px;
}

.button-list > i:nth-child(1),
.button-list > i:nth-child(5) {
  color: #555;
}

.progress-bar {
  margin-bottom: 10px;
  height: 5px;
  width: 100%;
  border-radius: 2.5px;
  overflow: hidden;
  background-color: #eee;
  cursor: pointer;
}
.progress-bar > div {
  height: 5px;
  width: 0%;
  background-color: #2887e3;
  cursor: pointer;
}
.voice-bar {
  margin-bottom: 10px;
  height: 5px;
  width: 30%;
  border-radius: 2.5px;
  overflow: hidden;
  background-color: #ccc;
  cursor: pointer;
}
.voice {
  height: 5px;
  width: 10%;
  background-color: #111;
  cursor: pointer;
}
.time-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.list {
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 20px 10px 10px 10px;
}
.list > input {
  width: 85%;
  height: 40px;
  margin: 5px 0;
  border-radius: 5px;
  border: 2px solid #3271ae;
  outline: none;
  padding: 0 5px;
  font-size: 18px;
  position: relative;
}

.song {
  display: flex;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
.song:hover {
  background-color: #f3f3f3;
}
.song > div {
  margin: 0 10px;
}
.song > div > div:first-child {
  font-size: 19px;
  font-weight: 500;
}
.song > div > div:last-child {
  font-size: 15px;
  color: #555;
}

.list-scroll::-webkit-resizer,
.list-scroll::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 3px;
}
.list-scroll::-webkit-scrollbar-corner,
.list-scroll::-webkit-scrollbar-track {
  background: 0 0;
}
.list-scroll::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.list-scroll {
  overflow-y: scroll;
  height: calc(100% - 50px);
}
.close-list {
  position: absolute;
  top: 30px;
  right: 30px;
}
.songActive {
  background-color: #40a9ff;
}
.songActive:hover {
  background-color: #40a9ff;
}
</style>
