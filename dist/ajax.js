//ES6的模块化方式引入我们的代码
export {
  $ajax,
  $get,
  $post,
  $_ajax,
  showTime
}


function $get(url, data, complete){
  $ajax({
    url: url,
    data: data,
    success: complete,
    error: complete
  })
}

function $post(url, data, complete){
  $ajax({
    type: 'post',
    url,
    data,
    success: complete,
    error: complete
  })
}

function $_ajax(requestObj){
  let {type, url, data} = requestObj;
  return new Promise((resolve, reject) => {
    $ajax({
      type,
      url,
      data,
      success: function(response){
        // 下载数据
        resolve(response)
      },
      error: function(msg){
        reject(msg);
      }
    })
  })
}

function $ajax({type = 'get', url, data, success, error}){
  type = type.toLowerCase();
  var xhr = null;
  try{
    xhr = new XMLHttpRequest();
  }catch(error){
    xhr = new ActiveXObject('"Microsoft.XMLHTTP"');
  }

  //调用open方法
  if(type == "get" && data){
    url += "?" + queryString(data);
  }
  xhr.open(type, url, true);

  if(type == "post"){
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(queryString(data));
  }else{
    xhr.send();
  }

  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status == 200){
        success && success(xhr.responseText);
      }else{
        error && error(xhr.status);
      }
    }
  }

}
function queryString(dataObj){
  var arr = [];
  for(var attr in dataObj){
    arr.push(attr + "=" + dataObj[attr]);
  }
  return arr.join("&");
}

function showTime(time){
  var d = new Date(time);
  var year = d.getFullYear();
  var month = d.getMonth() + 1; //0~11
  var date = d.getDate();

  //星期0~6  星期0是周日
  var week = d.getDay();
  week = chineseFromNum(week);

  var hours = double(d.getHours());
  var min = double(d.getMinutes());
  var sec = double(d.getSeconds());

  //字符串拼接
  return year + "年" + month + "月" + date + "日 星期" + week + " " + hours + ":" + min + ":" + sec;
}


//转成汉字
function chineseFromNum(num){
  var arr = ["日", "一", "二", "三", "四", "五", "六"];
  return arr[num];
}


//单数变双数
function double(num){
  if(num < 10){
      return "0" + num;
  }else{
      return num;
  }
}
