<script lang="ts" setup>
import { onUnmounted, onMounted, ref } from 'vue'
// import jayData, { Data } from '../data/jay'
import jayData, { Data } from '../data/mock'

let index = 0
const video = ref<Data>(jayData[index])
const videoDOM = ref<HTMLVideoElement>()
const progress = ref<HTMLDivElement>()
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
const start = () => {
  videoDOM.value?.play()
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

// 转blob 视频地址加密但是响应时间太长了，得与后端结合不太会
// const getBlob = () => {
//   xhrequest(video.value.videoUrl, (t: any) => {
//     if (videoDOM.value) videoDOM.value.src = URL.createObjectURL(t)
//   })
// }
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
      <div class="list-scroll" ref="list">
        <div
          v-for="item in jayData"
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
      <div>{{ allTime }}</div>
    </div>
  </div>
</template>

<style scoped>
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
  padding: 50px 10px 10px 10px;
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
  height: 100%;
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
