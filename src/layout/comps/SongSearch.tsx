import React, { useRef, useState } from 'react'
import styles from '../../styles/models/SongSearch.module.css'

type Props = {
  onSubmit: (value: string) => void
}

const SongSearch = ({ onSubmit }: Props) => {
  const [value, setValue] = useState('')
  const inputDOM = useRef<HTMLInputElement>(null)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    handleSubmit()
  }
  const handleSubmit = () => {
    if (value === '') return
    onSubmit(value)
    handleClose()
  }
  const handleClose = () => {
    setValue('')
    if (inputDOM.current) inputDOM.current.value = ''
  }
  return (
    <div className={styles.box}>
      <div className={styles.search}>
        <input
          ref={inputDOM}
          type="text"
          className={styles.input}
          onChange={handleInput}
          onKeyDown={handleKey}
        />
        <div className={styles.submit}>
          <span onClick={handleSubmit} className="iconfont icon-search"></span>
        </div>
        <div className={[styles.close, value === '' ? styles.hide : ''].join(' ')}>
          <span onClick={handleClose} className="iconfont icon-guanbi"></span>
        </div>
      </div>
    </div>
  )
}

export default SongSearch
