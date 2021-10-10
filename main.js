import Koa from 'koa'
import koaStatic from 'koa-static'
import views from 'koa-views'
import router from './koaRouter.js'
import path from 'path'

let app = new Koa();

// 当前项目的路径
const __dirname = path.resolve(); 

// 引入静态目录（简单来说可以文件中可以引入的js、图片等这类静态资源，如本项目index.html文件中引入了../js/index.js）
app.use(koaStatic(__dirname)); 

// 使用html格式
app.use(views(__dirname+"/views"), {
  extension: "html"
});

// 引入路由，并使用
app.use(router.routes());

// node项目启动
app.listen(8887,'127.0.0.9', ()=>{
  console.log('127.0.0.9:8887')
});