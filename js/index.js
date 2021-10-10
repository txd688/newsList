let page = 1;// 当前页
let pageSize = 5;// 每页页数
// 获取dom元素
let dom = document.getElementById("news-list");
let paginationDom = document.getElementById("pagination");
// 一共多少页
let allPage = undefined;
// 判断是否为第一次执行
let init = true;

getNewsList();
// 获取新闻列表
function getNewsList(){
  axios.get('/list',{
    params: {
      page,
      pageSize
    },
  }).then(function (response) {
    const data = response.data;
    // 新闻列表
    let str = '';
    data.list.forEach(element => {
      str += `
        <li>
          <div>
            <h3><a href="detail?id=${ element.id }">${ element.title }</a></h3>
            <div class="info">
              <span class="tips"><span>${ element.country }</span></span>
              <span class="time">&nbsp;|&nbsp;${ element.addTime }</span>
          </div>
          </div>
        </li>
      `;
    });
    dom.innerHTML = str;

    // 分页器
    // 如果是第一执行，添加分页器元素，否则只修改点击的某一页样式
    if(init){
      init = false;
      let paginationStr = `
        <a href="javascript:;" class="prev" onclick="paginationClick('prev')"> 
          <svg viewBox="64 64 896 896" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
          </svg>
        </a>
      `;
      allPage = Math.ceil(data.count / data.pageSize);
      for(let i = 1; i <= allPage; i++){
        if(data.page == i){
          paginationStr += `
            <a href="javascript:;" class="active" onclick="paginationClick('${ i }')">${ i }</a>
          `;
        }else{
          paginationStr += `
            <a href="javascript:;" onclick="paginationClick('${ i }')">${ i }</a>
          `;
        }
      }
      paginationStr += `
        <a href="javascript:;" class="next" onclick="paginationClick('next')">
          <svg viewBox="64 64 896 896" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
          </svg>
        </a>
      `;
      paginationDom.innerHTML = paginationStr;
    }else{
      // 处理分页器的当前页
      document.getElementsByClassName("active")[0]?.classList.remove('active');
      paginationDom.children[data.page].classList.add("active");
    }
    
  }).catch(function (error) {
    // handle error
    console.log(error);
  });
}
// 点击分页器，刷新列表
function paginationClick(sort){
  switch(sort){
    case 'prev':
      page--;
      if(page <= 0){
        page = 1;
        return;
      }
      break;
    case 'next':
      page++;
      if(page > allPage){
        page = allPage;
        return;
      }
      break;
    default:
      page = +sort;
  }
  getNewsList();
}

