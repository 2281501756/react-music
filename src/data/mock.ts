/*
使用vite的静态文件夹作为服务器，把文件放入public文件夹即可，打包的时候会直接放入dist文件夹不编译

*/

export type Data = {
  id: number
  name: string
  album: string
  imgUrl: string
  videoUrl: string
}
const baseURL = '/'
const data: Data[] = [
  {
    id: 1,
    name: '可爱女人',
    album: 'jay',
    videoUrl: baseURL + '1-1-可爱女人.mp4',
    imgUrl: baseURL + '1-jay.jpg',
  },
  {
    id: 2,
    name: 'On & On',
    album: 'Cartoon',
    videoUrl: baseURL + 'On-On.mp3',
    imgUrl: baseURL + 'On-On.jpg',
  },
  {
    id: 3,
    name: 'Need You Now',
    album: 'Venemy',
    videoUrl: baseURL + 'need-you-now.mp3',
    imgUrl: baseURL + 'need-you-now.jpg',
  },
  {
    id: 4,
    name: 'Make Me Move',
    album: 'Culture Code',
    videoUrl: baseURL + 'make-me-move.mp3',
    imgUrl: baseURL + 'make-me-move.jpg',
  },
]

export default data
