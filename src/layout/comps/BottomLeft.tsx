import { useContext, useEffect, useState } from 'react'
import GlobalContext from '../../context/GlobalContext'
import styles from '../../styles/models/BottomLeft.module.css'

type Props = {
  songIsPaused: boolean | undefined
  handleStartSong: () => void
  handlePausedSong: () => void
}

const BottomLeft = ({ songIsPaused, handlePausedSong, handleStartSong }: Props) => {
  const { songData } = useContext(GlobalContext)
  return (
    <div className={styles.root}>
      <img src={songData.imgUrl} alt="图片" />
      <div className={styles.button}>
        <span className="iconfont icon-shangyishou"></span>
      </div>
      {(songIsPaused === true || songIsPaused === undefined) && (
        <div className={styles.button} onClick={handleStartSong}>
          <span className={'iconfont icon-ai23 ' + styles.mainButton}></span>
        </div>
      )}
      {songIsPaused === false && (
        <div className={styles.button} onClick={handlePausedSong}>
          <span className={'iconfont icon-tingzhi ' + styles.mainButton}></span>
        </div>
      )}
      <div className={styles.button}>
        <span className="iconfont icon-next-fill"></span>
      </div>
    </div>
  )
}

export default BottomLeft
