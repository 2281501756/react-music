// 视频地址转Blob
function xhrequest(url: string, callback: any) {
  //创建XMLHttpRequest对象
  var xhr = new XMLHttpRequest()
  //前两个参数固定，第三个参数true时是异步，false时是同步
  xhr.open('get', url, true)
  //选定输出格式为blob格式
  xhr.responseType = 'blob'
  //onload后回调this本身  onload本身不携带参数
  xhr.onload = function () {
    callback(this.response)
  }
  //关闭xhr  一定要加
  xhr.send()
}
export default xhrequest
