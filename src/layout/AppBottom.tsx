import styles from '../styles/layout/AppBottom.module.css'
import GlobalContext from '../context/GlobalContext'
import { useContext } from 'react'

const AppBottom = () => {
  const { videoDOM } = useContext(GlobalContext)
  const handle = () => {
    console.log(videoDOM?.current?.src)
  }
  return (
    <div className={styles.bottom}>
      <button onClick={handle}>1231</button>
    </div>
  )
}
export default AppBottom
