import styles from '../../styles/models/BottomCenter.module.css'
import GlobalContext from '../../context/GlobalContext'
import React, { useContext, useEffect, useRef } from 'react'
import { MMSS } from '../../utils/time'

type Props = {
  allTime: number
  nowTime: number
  handleProgressBar: (
    e: React.MouseEvent,
    dom: React.RefObject<HTMLDivElement>,
    barDom: React.RefObject<HTMLDivElement>
  ) => void
}

const BottomCenter = ({ allTime, nowTime, handleProgressBar }: Props) => {
  const { songData } = useContext(GlobalContext)
  const progressbar = useRef<HTMLDivElement>(null)
  const progressbarDOM = useRef<HTMLDivElement>(null)
  const getTime = () => {
    return MMSS(nowTime) + ' / ' + MMSS(allTime)
  }
  useEffect(() => {
    if (progressbar.current) {
      const t = (nowTime / allTime) * 100
      progressbar.current.style.width = t.toFixed(2) + '%'
    }
  }, [nowTime, allTime])
  return (
    <div className={styles.box}>
      <div>{songData.name + ' - ' + songData.album + ' - ' + '周杰伦'}</div>
      <div>
        <div className={styles.progressBar}>
          <div ref={progressbar} className={styles.progressBarUpper}></div>
          <div
            ref={progressbarDOM}
            className={styles.progressBarBelow}
            onClick={(e) => handleProgressBar(e, progressbarDOM, progressbar)}
          ></div>
        </div>
        <div className={styles.songTime}>{getTime()}</div>
      </div>
    </div>
  )
}

export default BottomCenter
