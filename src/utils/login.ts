const login = async () => {
  // 在打包的时候直接把AcWingOS挂载到window上面省事一点
  let AcWingOS = window.AcWingOS
  if (!AcWingOS) return
  // 设置 acapp的窗口大小 这里写死了 766px 和 618px 高度得特殊处理一下要除以17 / 18 这样才是真实高度
  window.AcWingOS.api.window.resize(
    (766 * 100) / window.innerWidth,
    (618 * 100 * 18) / window.innerHeight / 17
  )
}

login()
