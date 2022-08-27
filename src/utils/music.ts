export const loadSound = (url: string): Promise<ArrayBuffer> => {
  return new Promise((resolve) => {
    const request = new XMLHttpRequest() //建立一个请求
    request.open('GET', url, true) //配置好请求类型，文件路径等
    request.responseType = 'arraybuffer' //配置数据返回类型
    // 一旦获取完成，对音频进行进一步操作，比如解码
    request.onload = () => {
      resolve(request.response)
    }
    request.send()
  })
}

export const bufferToAudio = (
  arrayBuffer: ArrayBuffer,
  audioContext: AudioContext
): Promise<AudioBuffer> => {
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(
      arrayBuffer,
      (res: AudioBuffer) => {
        resolve(res)
      },
      (err: any) => {
        reject(err)
      }
    )
  })
}
