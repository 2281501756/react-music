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
  const { id, name, album, imgUrl, videoUrl } = song
  return (
    <div className={styles.song}>
      <span className={styles.index}>{id}</span>
      <span>{name}</span>
      <span>{album}</span>
      <span>周杰伦</span>
    </div>
  )
}

export default Song
