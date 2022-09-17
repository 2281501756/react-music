import styles from '../../styles/models/LeftButton.module.css'
import GlobelContext from '../../context/GlobalContext'
import { useContext } from 'react'
type Props = {
  title: string
  iconName: string
  url: string
}

const LeftButton = ({ title, iconName, url }: Props) => {
  const { router, setRouter } = useContext(GlobelContext)
  const handleCLick = () => {
setRouter(url)
  }
  return (
    <div onClick={handleCLick} className={styles.button}>
      <span className={`iconfont  ${iconName} `}></span>
      <span>{title}</span>
    </div>
  )
}
export default LeftButton
