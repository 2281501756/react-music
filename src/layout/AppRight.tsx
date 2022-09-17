import Search from '../view/Search'
import Favourite from '../view/Favourite'
import styles from '../styles/layout/AppRight.module.css'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const AppRight = () => {
  const { router, setRouter } = useContext(GlobalContext)
  return (
    <div className={styles.appRight}>
      {router === 'seatch' && <Search></Search>}
      {router === 'favourite' && <Favourite></Favourite>}
    </div>
  )
}

export default AppRight
