# 技术栈
vite vue3 typescript

# 安装
我用的是yarn 如果没有可以使用 npm install yarn -g 来全局安装一下，使用npm也可以
```shell
git clone git@git.acwing.com:DongHAO/musicapp.git  # 拷贝项目

cd musicapp

yarn add #安装依赖
yarn dev #运行项目
yarn build #打包项目


npm i  #安装依赖
npm run dev #运行项目
npm run build #打包项目
```
# 运行效果
![Snipaste_2022-08-12_23-32-16.jpg](https://cdn.acwing.com/media/article/image/2022/08/12/67937_f737ae021a-Snipaste_2022-08-12_23-32-16.jpg) 
# 目录介绍

- data 存储歌曲信息
- font 存储字体文件 [iconfont地址](https://www.iconfont.cn/)
- ui 主页面
- utils 工具
# 打包
不要修改vite.config文件我配置好啦 直接yarn build 或 npm run build即可
之后就可以放到服务器上跑了， 如果要在acwing上运行需要增加一些配置 
打开dist/index.js 格式化 最后有两行代码名字可能不一样

在最后加上几行代码
```js
export class Game {
  constructor(id, AcWingOS) {
    window.AcWingOS = AcWingOS
    Ts()
    fs(ws).mount('#' + id)
  }
}
```
把上面的两行代码复制进来然后把'#app' 改成 '#' + id 即可


![Snipaste_2022-08-12_23-37-30.jpg](https://cdn.acwing.com/media/article/image/2022/08/12/67937_ca0006ba1a-Snipaste_2022-08-12_23-37-30.jpg) 
![Snipaste_2022-08-12_23-37-55.jpg](https://cdn.acwing.com/media/article/image/2022/08/12/67937_ce9a20171a-Snipaste_2022-08-12_23-37-55.jpg) 
