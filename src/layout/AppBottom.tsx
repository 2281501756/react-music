import BottomLeft from './comps/BottomLeft'
import BottomCenter from './comps/BottomCenter'
import styles from '../styles/layout/AppBottom.module.css'
import GlobalContext from '../context/GlobalContext'
import { useContext, useState, useEffect } from 'react'
const AppBottom = () => {
  const { videoDOM } = useContext(GlobalContext)
  // 加载音乐的时间
  const [allTime, setAllTime] = useState(0)
  const loadAllTime = () => {
    if (videoDOM?.current?.duration) setAllTime(videoDOM.current.duration)
  }
  useEffect(() => {
    videoDOM?.current?.addEventListener('canplay', loadAllTime)
    return () => {
      videoDOM?.current?.removeEventListener('canplay', loadAllTime)
    }
  }, [])
  // 音乐开始定时器
  const [nowTime, setNowTime] = useState(0)
  const progressTimer = () => {
    if (videoDOM?.current?.currentTime) setNowTime(videoDOM.current.currentTime)
  }
  // 音乐播放
  let [songIsPaused, setSongIsPaused] = useState(videoDOM?.current?.paused)
  let PROGRESS_BAR_TIMER = -1
  const handleStartSong = () => {
    videoDOM?.current?.play()
    setSongIsPaused(false)
    PROGRESS_BAR_TIMER = setInterval(() => {
      progressTimer()
    }, 1000)
  }
  const handlePausedSong = () => {
    videoDOM?.current?.pause()
    setSongIsPaused(true)
    clearInterval(PROGRESS_BAR_TIMER)
  }
  // 进度条点击
  const handleProgressBar = (
    e: React.MouseEvent,
    dom: React.RefObject<HTMLDivElement>,
    barDom: React.RefObject<HTMLDivElement>
  ) => {
    if (dom.current && barDom.current) {
      const v = (e.nativeEvent.offsetX / dom.current.clientWidth) * 100
      if (videoDOM?.current?.currentTime) {
        videoDOM.current.currentTime = (v / 100) * allTime
        setNowTime(videoDOM.current.currentTime)
      }
      barDom.current.style.width = v.toFixed(2) + '%'
    }
  }

  return (
    <div className={styles.bottom}>
      <BottomLeft
        songIsPaused={songIsPaused}
        handlePausedSong={handlePausedSong}
        handleStartSong={handleStartSong}
      ></BottomLeft>
      <BottomCenter
        allTime={allTime}
        nowTime={nowTime}
        handleProgressBar={handleProgressBar}
      ></BottomCenter>
    </div>
  )
}
export default AppBottom
