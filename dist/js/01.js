window.onload = function() {
    var oUsernamec = document.getElementById("usernamec");
    var oUsernamec_span = document.getElementById("usernamec_span");
    console.log(oUsernamec_span);
    oUsernamec.onfocus = function() {
        oUsernamec_span.style.display = 'block';
        oUsernamec_span.style.color = 'grey';
        oUsernamec_span.innerHTML = '可通过手机号找回密码';
    }
    oUsernamec.onblur = function() {
        var oValuec = oUsernamec.value;
        if (!oValuec) {
            oUsernamec_span.style.display = 'none';
        } else {
            if (oValuec.length != 11) {
                oUsernamec_span.style.color = 'red';
                oUsernamec_span.innerHTML = '&nbsp;请填写正确的中国大陆地区手机号，其他地区手机号请<a  href="">点击此处</a>';

            } else {
                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(oValuec)) {
                    oUsernamec_span.style.color = 'red';
                    oUsernamec_span.innerHTML = '&nbsp;请填写正确的中国大陆地区手机号，其他地区手机号请<a  href="">点击此处</a>';
                } else {
                    oUsernamec_span.style.display = 'none';
                }
            }
        }
    }

    var oUsernameb = document.getElementById("usernameb");
    var oUsernameb_span = document.getElementById("usernameb_span");
    console.log(oUsernameb_span);
    oUsernameb.onfocus = function() {
        oUsernameb_span.style.display = 'block';
        oUsernameb_span.style.color = 'grey';
        oUsernameb_span.innerHTML = '6～18个字符，区分大小写';
    }
    oUsernameb.oninput = function() {
        var oValueb = oUsernameb.value;
        if (!oValueb) {
            oUsernameb_span.style.display = 'none';
        } else {
            if (oValueb.length < 6 || oValueb.length > 18) {
                oUsernameb_span.style.color = 'red';
                oUsernameb_span.innerHTML = '&nbsp;密码长度应为6～16个字符';
            } else {
                oUsernameb_span.style.display = 'none';

            }
        }

    }

    var oUsernamea = document.getElementById("usernamea");
    var oUsernamea_span = document.getElementById("usernamea_span");
    console.log(oUsernamea_span);
    oUsernamea.onfocus = function() {
        oUsernamea_span.style.display = 'block';
        oUsernamea_span.style.color = 'grey';
        oUsernamea_span.innerHTML = '请再次输入密码';
    }
    oUsernamea.onblur = function() {
        var oValueb = oUsernameb.value;
        var oValuea = oUsernamea.value;
        if (!oValuea) {
            oUsernamea_span.style.display = 'none';
        } else {
            if (oValuea != oValueb) {
                oUsernamea_span.style.color = 'red';
                oUsernamea_span.innerHTML = '请输入相同密码';
            } else {
                oUsernamea_span.style.display = 'none';
            }
        }
    }
}