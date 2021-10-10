import Router from 'koa-router'
import fs from "fs";
import path from 'path'
let routerApi = new Router();
const __dirname = path.resolve();

/**
 * des: 获取新闻列表接口
 * 接口配置：
 *    {
 *     contentType: 请求方式  application/x-www-form-urlencoded
 *     method: 请求类型 get
 *    }
 * 默认参数：
 *    {
 *      page: 1,      页数
 *      pageSize: 5  每页条数
 *    }
 * 返回参数：
 *    {
 *      pageSize: 5,
 *      page: 1,
 *      list: [{...},{...}...],
 *      count: *
 *    }
*/

routerApi.get("/list",ctx => {
  let page = ctx.query.page || 1;
  let pageSize = ctx.query.pageSize || 5;
  let newsList = JSON.parse(fs.readFileSync(__dirname + "/assets/data.json").toString());
  let count = 0 || newsList.length;

  ctx.body = {
    page,
    pageSize,
    count,
    list: newsList.slice(page * pageSize - pageSize, page * pageSize)
  }
});

/**
 * des: 获取新闻详情页
 * 接口配置：
 *    {
 *     contentType: 请求方式  application/x-www-form-urlencoded
 *     method: 请求类型 get
 *    }
 * 默认参数：
 *    {
 *      id: *
 *    }
 * 返回参数：
 *    {
 *      list: {...}
 *    }
*/

routerApi.get("/newsDetail",ctx => {
  let id = ctx.query.id;
  let newsList = JSON.parse(fs.readFileSync(__dirname + "/assets/data.json").toString());
  let list = undefined;
  for(let i = 0; i < newsList.length; i++){
    if(newsList[i].id == id){
      list = newsList[i];
      break;
    }
  }
  ctx.body = {
    list
  }
});

export default routerApi;
