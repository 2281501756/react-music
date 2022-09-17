import AppLeft from './layout/AppLeft'
import AppRight from './layout/AppRight'
import AppBottom from './layout/AppBottom'
import GlobalContext from './context/GlobalContext'
import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [router, setRouter] = useState('seatch')
  const [imgURL, setImgURL] = useState('')
  const videoDOM = useRef<HTMLVideoElement>(null)
  return (
    <GlobalContext.Provider value={{ router, setRouter, imgURL, setImgURL, videoDOM }}>
      <AppLeft></AppLeft>
      <AppRight></AppRight>
      <AppBottom></AppBottom>
      <video ref={videoDOM} style={{ display: 'none' }} src=""></video>
    </GlobalContext.Provider>
  )
}

export default App
