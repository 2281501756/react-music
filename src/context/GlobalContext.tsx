import React, { createContext } from 'react'

interface GlobalState {
  router: string
  setRouter: Function
  imgURL: string
  setImgURL: Function
  videoDOM: React.RefObject<HTMLVideoElement> | null
}
const globalState: GlobalState = {
  router: 'seatch',
  setRouter: () => {
    throw new Error('路由未定义')
  },
  imgURL: '',
  setImgURL: () => {
    throw new Error('路由未定义')
  },
  videoDOM: null,
}

const AppContext = createContext(globalState)
export default AppContext
