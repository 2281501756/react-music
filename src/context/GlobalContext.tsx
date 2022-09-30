import React, { createContext } from 'react'
import { Data, initData } from '../data/jay'

interface GlobalState {
  router: string
  setRouter: Function
  songData: Data
  setSongData: Function
  videoDOM: React.RefObject<HTMLVideoElement> | null
}
const globalState: GlobalState = {
  router: 'seatch',
  setRouter: () => {
    throw new Error('路由未定义')
  },
  songData: initData,
  setSongData: () => {
    throw new Error('路由未定义')
  },
  videoDOM: null,
}

const GlobalContext = createContext(globalState)
export default GlobalContext
