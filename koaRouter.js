import router from './api/api.js'

// 重定向，如果页面地址是/ ,自动跳转到/index
router.get("/",async ctx=>{
  ctx.redirect('/index');
});

// 首页
router.get("/index",async ctx=>{
  await ctx.render("./index.html");//渲染views下的index.html
});

// 详情页
router.get("/detail",async ctx=>{
  await ctx.render("./detail.html");
});

export default router;