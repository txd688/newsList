// 获取dom元素
let dom = document.getElementsByClassName("wrap")[0];
getDetail();

// 获取详情页
function getDetail(){
  // 请求接口
  axios.get('/newsDetail',{
    params: {
      id: GetQuery('id'),
    },
  }).then(function (response) {
    let data = response.data.list;
    let str =  `
      <div class="button" onclick="window.history.go(-1)">返回</div>
      <h3>${ data.title }</h3>
      <div class="info">
        <div>${ data.author }&nbsp;|&nbsp;</div>
        <div>${ data.addTime }</div>
      </div>
      <div class="content">${ data.content }</div>
    `;
    dom.innerHTML = str;
  }).catch(function (error) {
    // handle error
    console.log(error);
  });
}
//  获取URL后缀
function GetQuery(key){
  let after = window.location.search;
  after = after.substr(1) || window.location.hash.split('?')[1];
  if (after) {
    const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
    const r = after.match(reg);
    if (r != null) {
      return (r[2]);
    }
    return null;
  }
  return null;
};

