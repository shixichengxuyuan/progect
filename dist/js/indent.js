$(function() {
    sc_num();
    sc_total();
    //通过事件委托给右侧购物车商品添加事件委托
    $(".shop ul").on("click", ".delete_goodsBtn", function() {
        var id = $(this).closest("li").remove().attr("id");
        var cookieArr = JSON.parse($.cookie("goods"));
        var index = cookieArr.findIndex(item => item.id == id);
        cookieArr.splice(index, 1);
        if (cookieArr.length) {
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
        } else {
            $.cookie("goods", null);
        }
        sc_num();
        sc_total();
    })

    $(".shop ul").on("click", '.sc_goodsNum button', function() {

        var id = $(this).closest("li").attr("id");
        //从cookie中找出这个id的数据
        var cookieArr = JSON.parse($.cookie("goods"));
        var index = cookieArr.findIndex(item => item.id == id);

        if (this.innerHTML == "+") {
            cookieArr[index].num++;
        } else {
            cookieArr[index].num == 1 ? alert("数量为1，不能减少") : cookieArr[index].num--;
        }
        //改变页面上的数量
        $(this).siblings("span").html("数量：" + cookieArr[index].num);
        //将改变完成数量的cookie存储回去
        $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
        })
        sc_num();
        sc_total();
    })

    function sc_num() {
        var cookieStr = $.cookie("goods");
        var sum = 0;
        if (cookieStr) {
            var cookieArr = JSON.parse(cookieStr);
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }

        }
        $(".shopBottom .d1 .s1").html(sum);

    }
    $.ajax({
        type: 'get',
        url: './data.json',
        success: function(arr) {
            var cookieStr = $.cookie("goods");
            //在cookie中取出数据
            var newArr = []
            var cookieArr = JSON.parse(cookieStr);
            for (var i = 0; i < cookieArr.length; i++) {
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j].id == cookieArr[i].id) {
                        arr[j].num = cookieArr[i].num;
                        newArr.push(arr[j]);
                        break;
                    }
                }
            }
            // console.log(newArr);
            let str = ``;
            for (var i = 0; i < newArr.length; i++) {
                str += ` <li id="${newArr[i].id}">
                    <div class="sc_goodsPic">
                    <td>
                <input id="check${newArr[i].id}" type="checkbox">
            </td>    
                    <img src="${newArr[i].img}" alt="">
                    </div>
                    <div class="sc_goodsTitle">
                        <a href="">${newArr[i].name}</a>
                    </div>
                    <div>￥${newArr[i].price_n}</div>
                    <div>${newArr[i].price_o}</div>
                    

                    <div class="sc_goodsNum">

                        <button>+</button>

                        <span>数量：${newArr[i].num}</span>
                        <button>-</button>

                    </div>
                    <div class="delete_goodsBtn"><a href="">删除</a></div>
                </li>`


            }
            $(".shop ul").html(str);
        }
    });

    function  sc_total() {  
        var  cookieStr  =  $.cookie("goods");  
        if (!cookieStr) {     return;   }  
        $.ajax({    
            type: "get",
                url: "data.json",
                success: function(arr) {       //在cookie中取出数据
                      
                var  newArr  =   []      
                var  cookieArr  =  JSON.parse(cookieStr);      
                for (var  i  =  0;  i  <  cookieArr.length;  i++) {        
                    for (var  j  =  0;  j  <  arr.length;  j++) {          
                        if (arr[j].id  ==  cookieArr[i].id) {            
                            arr[j].num  =  cookieArr[i].num;            
                            newArr.push(arr[j]);            
                            break;          
                        }        
                    }      
                }      
                console.log(newArr);      
                let  str  =   [];      
                let  num1  =   [];      
                let  sun  =  0;      
                for (var  i  =  0; i  <  newArr.length;  i++) {        
                    str  =  newArr[i].price_n  -  0;        
                    num1  =  newArr[i].num;        
                    sun  +=  str  *  num1;             
                }       // sun += sun;
                     
                $(".shopBottom .d2 .s2").html(sun);    
            }  
        })  
    }

})