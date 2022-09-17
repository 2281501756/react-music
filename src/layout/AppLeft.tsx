import LeftButton from './comps/LeftButton'
import styles from '../styles/layout/AppLeft.module.css'

type Props = {}

const AppLeft = ({}: Props) => {
  return (
    <div className={styles.appLeft}>
      <div className={styles.title}>Jay Music</div>
      <LeftButton title="搜索" iconName="icon-search2" url="seatch"></LeftButton>
      <LeftButton title="我喜欢" iconName="icon-love" url="favourite"></LeftButton>
    </div>
  )
}

export default AppLeft
