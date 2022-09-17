import styles from '../styles/models/Search.module.css'
import SongSearch from '../layout/comps/SongSearch'
import Song from '../layout/comps/Song'
import data from '../data/jay'

const Search = () => {
  const search = (value: string) => {
    console.log(value)
  }
  return (
    <div className={styles.seatch}>
      <SongSearch onSubmit={search}></SongSearch>
      <div className={styles.songHead}>
        <span>id</span>
        <span>歌曲名</span>
        <span>专辑名</span>
        <span>歌手</span>
      </div>
      {data.map((item) => {
        if (item.id > 10) return
        else return <Song song={item}></Song>
      })}
    </div>
  )
}

export default Search
