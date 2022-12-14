import Search from '../view/Search'
import Favourite from '../view/Favourite'
import styles from '../styles/layout/AppRight.module.css'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import Word from '../view/Word'

const AppRight = () => {
  const { router, setRouter } = useContext(GlobalContext)
  return (
    <div className={styles.appRight}>
      {router === 'seatch' && <Search></Search>}
      {router === 'favourite' && <Favourite></Favourite>}
      {router === 'word' && <Word></Word>}
    </div>
  )
}

export default AppRight
