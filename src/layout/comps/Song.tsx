import { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'
import styles from '../../styles/models/Song.module.css'

type Props = {
  song: {
    id: number
    name: string
    album: string
    imgUrl: string
    videoUrl: string
  }
}

const Song = ({ song }: Props) => {
  const { setSongData, videoDOM } = useContext(GlobalContext)
  const { id, name, album, imgUrl, videoUrl } = song
  const handleSong = () => {
    setSongData(song)
    if (videoDOM?.current?.src) videoDOM.current.src = videoUrl
    videoDOM?.current?.addEventListener('canplay', () => {
      videoDOM.current?.play()
    })
  }
  return (
    <div className={styles.song} onClick={handleSong}>
      <span className={styles.index}>{id}</span>
      <span>{name}</span>
      <span>{album}</span>
      <span>周杰伦</span>
    </div>
  )
}

export default Song
