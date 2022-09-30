import AppLeft from './layout/AppLeft'
import AppRight from './layout/AppRight'
import AppBottom from './layout/AppBottom'
import GlobalContext from './context/GlobalContext'
import { useRef, useState } from 'react'
import { Data, initData } from './data/jay'
import './App.css'

function App() {
  const [router, setRouter] = useState('seatch')
  const [songData, setSongData] = useState<Data>(initData)
  const videoDOM = useRef<HTMLVideoElement>(null)
  return (
    <GlobalContext.Provider value={{ router, setRouter, songData, setSongData, videoDOM }}>
      <AppLeft></AppLeft>
      <AppRight></AppRight>
      <AppBottom></AppBottom>
      <video ref={videoDOM} style={{ display: 'none' }} src={songData.videoUrl}></video>
    </GlobalContext.Provider>
  )
}

export default App
