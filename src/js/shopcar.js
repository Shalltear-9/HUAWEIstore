import $ from './modules/jquery.js';
import { cookie } from './modules/cookie.js';
import { addItem } from './modules/addItem.js';
$(function() {
    (function() {
        let shop = cookie.get('shop');
        if (shop) {
            shop = JSON.parse(shop);
            let idList = shop.map(elm => elm.id).join();
            $.ajax({
                type: "get",
                url: "../interface/shopcar.php",
                data: { idList: idList },
                dataType: "json",
                success: function(res) {
                    // console.log(res);
                    let temp = '';
                    res.forEach(elm => {
                        let picture = JSON.parse(elm.picture);

                        let arr = shop.filter(val => val.id === elm.id);

                        temp += `
                        <div class="middle-inner container">
                        <div class="wrap-left">
                        <div class="checkbox">
                            <input type="checkbox" class="check" checked>
                        </div>
                        <div class="img">
                            <img src="${picture[0].src}" alt="">
                        </div>
                        <div class="title">
                            ${elm.title}
                        </div>
                    </div>
                    <div class="wrap-right">
                        <div class="price">
                            ￥${elm.price}
                        </div>
                        <div class="num">
                            <button class="minus">-</button>
                            <input type="text" value="${arr[0].num}" min="1" max="${elm.num}" name="${elm.id}">
                            <button class="plus">+</button>
                        </div>
                        <div class="small-sum">
                            ￥${elm.price*arr[0].num}
                        </div>
                        <div class="del">
                            <a href="#">删除</a>
                        </div>
                    </div>
                    </div>
                            `;
                    });
                    $('.middle').append(temp);

                    // 改变选取商品数量
                    let ck = JSON.parse(cookie.get('shop'));
                    let count = 0;
                    ck.forEach(elm => {
                        count += parseInt(elm.num);
                    });
                    $('.calc>p:last').html(`已选择${count}件商品`);

                    //商品总价
                    let sumAll = 0;
                    ck.forEach(elm => {
                        sumAll += elm.num * elm.price;
                    });
                    $('.calc>p:first>span').html(`￥${sumAll}`);

                    //数量增加
                    $('.middle').on('click', '.plus', function() {
                        let i = $(event.target.parentNode).children('input').val();
                        i++;
                        $(event.target.parentNode).children('input').val(i);

                        count++;
                        $('.calc>p:last').html(`已选择${count}件商品`);
                        let id = $(event.target.parentNode).children('input').attr('name');
                        res.forEach(elm => {
                            if (elm.id === id) {
                                sumAll += parseInt(elm.price);
                                $('.calc>p:first>span').html(`￥${sumAll}`);
                            }
                        });
                    });

                    //数量减少
                    $('.middle').on('click', '.minus', function() {
                        let i = $(event.target.parentNode).children('input').val();
                        count--;
                        $('.calc>p:last').html(`已选择${count}件商品`);
                        if (i > 0) {
                            i--;
                            $(event.target.parentNode).children('input').val(i);
                        }
                        let id = $(event.target.parentNode).children('input').attr('name');
                        res.forEach(elm => {
                            if (elm.id === id) {
                                sumAll -= parseInt(elm.price);
                                $('.calc>p:first>span').html(`￥${sumAll}`);
                            }
                        });
                    });

                    //点按钮
                    $('.middle').on('click', 'button', function() {
                        let id = $(event.target.parentNode).children('input').attr('name');
                        let price;
                        // console.log(ck);
                        if (ck.some(elm => elm.id === id)) {
                            ck.forEach(elm => {
                                elm.id === id ? price = elm.price : null
                                elm.id === id ? elm.num = $(event.target.parentNode).children('input').val() : null;
                            });
                        }
                        let sum = $(event.target.parentNode).children('input').val() * price;
                        $(event.target.parentNode.parentNode).children('.small-sum').html('￥' + sum);
                        cookie.set('shop', JSON.stringify(ck), 2);

                    });
                }
            });

        }


    })();



});