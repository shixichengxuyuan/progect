$(function() {
    var aBtns = $(".play").find("ol li");
    var oUl = $(".play").find("ul");
    var iNow = 0;
    var timer = null;

    $("#play")
        .mouseenter(function() {
            clearInterval(timer);
        })
        .mouseleave(function() {
            timer = setInterval(function() {
                iNow++;
                tab();
            }, 2000);
        });

    timer = setInterval(function() {
        iNow++;
        tab();
    }, 2000);

    aBtns.click(function() {
        iNow = $(this).index();
        tab();
    });

    function tab() {
        aBtns.removeClass("active").eq(iNow).addClass("active");
        if (iNow == aBtns.size()) {
            aBtns.eq(0).addClass("active");
        }

        oUl.animate({
            top: -480 * iNow
        }, 500, function() {
            if (iNow == aBtns.size()) {
                iNow = 0;
                oUl.css("top", 0);
            }
        });
    };

    　　
    $('.d1').on(　{
        "mouseenter": function() {
            $(this).css("width", "350px");
            $(this).children("button").show();
            $(this).children("img").css("margin-left", "60px")
        },
        "mouseleave": function() {
            $(this).css("width", "162px");
            $(this).children("button").hide()
            $(this).children("img").css("margin-left", "21px")
        }
    })

    sc_num();
    sc_msg();


    $.ajax({
        type: 'get',
        url: "./data.json",
        success: function(arr) {
            let str = ``;
            for (var i = 0; i < arr.length; i++) {
                str += `<li class="goods_item">
                        <div class="goods_pic">
                        <a href="shopDetails.html"><img src="${arr[i].img}" class="${arr[i].id}"alt=""> </a>
                        </div>
                        <div class="goods_title">
                            <a href="" >${arr[i].name}</a>

                            <span >${arr[i].anthor}</span>
                        </div>
                        <div class="goods_price">
                            <span class="price-n">￥${arr[i].price_n}</span>
                            <span class="price-o"><s>￥${arr[i].price_o}</s></span>
                        </div>
                        <div class="sc">
                            <div id="${arr[i].id}" class="sc_btn">加入购物车</div>
                        </div>
                    </li>`
            }
            $(".goods_box ul").html(str);
        },
        error: function(msg) {
            console.log(msg);
        }
    })

    $(".goods_box ul").on("click", '.goods_pic img', function() {
        var id = $(this).eq(0).attr("class");
        // console.log($(this).eq(0).attr("class"));
        var orr = {
            id: id,
        };
        $.cookie("shop", JSON.stringify(orr), {
            expires: 7
        });
    })
    $(".goods_box ul").on("click", '.sc_btn', function() {
        var id = this.id; //点击按钮的这个商品的id
        //1、判定是否是第一次添加
        var first = $.cookie("goods") == null ? true : false;

        if (first) {
            var arr = [{
                id: id,
                num: 1,

            }];
            $.cookie("goods", JSON.stringify(arr), {
                expires: 7
            });
        } else {
            //不是第一次，判定之前是否添加过
            var same = false; //假设之前没添加过
            var cookieArr = JSON.parse($.cookie("goods"));
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id === id) {
                    cookieArr[i].num++;
                    same = true;
                    break;
                }
            }

            if (!same) {
                var obj = {
                    id: id,
                    num: 1,

                };
                cookieArr.push(obj);
            }

            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
        }
        console.log($.cookie("goods"));
        sc_num();
        sc_msg();
    })

    //通过事件委托给右侧购物车商品添加事件委托
    $(".sc_right ul").on("click", ".delete_goodsBtn", function() {
        //1、页面上删除
        var id = $(this).closest("li").remove().attr("id");
        //2、通过cookie删除
        var cookieArr = JSON.parse($.cookie("goods"));
        var index = cookieArr.findIndex(item => item.id == id);
        //删除
        cookieArr.splice(index, 1);
        if (cookieArr.length) {
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
        } else {
            $.cookie("goods", null);
        }
        sc_num();
    })

    //给+和-添加事件
    $(".sc_right ul").on("click", '.sc_goodsNum button', function() {

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
        $(this).siblings("span").html("商品数量：" + cookieArr[index].num);
        //将改变完成数量的cookie存储回去
        $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
        })
        sc_num();
    })

    //计算购物车中商品的数量
    function sc_num() {
        var cookieStr = $.cookie("goods");
        var sum = 0;
        if (cookieStr) {
            var cookieArr = JSON.parse(cookieStr);
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }
        }
        $(".sc_right .sc_num").html(sum);
    }

    //给右侧购物车添加移入移出效果
    $(".sc_right").mouseenter(function() {
        $(this).stop(true).animate({
            right: 0
        }, 500);
    }).mouseleave(function() {
        $(this).stop(true).animate({
            right: -270
        }, 500);
    })

    //右侧购物上商品的加载
    //1、购物车数据，都在cookie中id num
    //2、商品信息在，服务器上
    function sc_msg() {
        var cookieStr = $.cookie("goods");
        if (!cookieStr) {
            return;
        }
        //1、请求商品数据
        $.ajax({
            type: 'get',
            url: './data.json',
            success: function(arr) {
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
                console.log(newArr);
                let str = ``;
                for (var i = 0; i < newArr.length; i++) {
                    str += `<li id="${newArr[i].id}">
                    <div class="sc_goodsPic">
                        <img src="${newArr[i].img}" alt="">
                    </div>
                    <div class="sc_goodsTitle">
                    <p>${newArr[i].name}</p>
                    </div>
                    <div class="sc_goodsBtn"> <a href="indent.html">购买 </a></div>
                    <div class="delete_goodsBtn">删除</div>
                    <div class="sc_goodsNum">
                        <div>
                            <button>+</button>
                            <button>-</button>
                            <span>商品数量：${newArr[i].num}</span>
                        </div>
                    </div>
                </li>`
                }
                $(".sc_right ul").html(str);
            }
        })
    }


    　　　


})