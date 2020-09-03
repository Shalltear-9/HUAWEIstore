import $ from './modules/jquery.js';
import { cookie } from './modules/cookie.js';
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
                            <input type="checkbox" class="check check-future" checked>
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

                    //点击加减按钮改变商品数量
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

                    //全选
                    $('.top>.left>.check').on('click', function() {
                        $('.check-future').prop('checked', $(this).prop('checked'));

                        //判断全选按钮是否按下
                        if ($('.top>.left>.check').prop('checked')) {
                            $('.calc>p:last').html(`已选择${count}件商品`);
                            $('.calc>p:first>span').html(`￥${sumAll}`);
                        } else {
                            $('.calc>p:last').html(`已选择${0}件商品`);
                            $('.calc>p:first>span').html(`￥${0}`);
                        }

                    });

                    //遍历商品的复选框，判断是否被选中
                    $('.middle').on('click', '.check-future', function() {
                        let flag = (Array.from($('.check-future')).every(elm => elm.checked));
                        if (flag) {
                            $('.top>.left>.check').prop('checked', true);
                        } else {
                            $('.top>.left>.check').prop('checked', false);
                        }

                        //点击复选框改变总价和数量
                        let id = $(event.target).parents('.middle-inner').children('.wrap-right').children('.num').children('input').attr('name');
                        ck.forEach(elm => {
                            if (elm.id === id) {
                                if ($(event.target).prop('checked')) {
                                    sumAll += parseInt(elm.price * elm.num);
                                    $('.calc>p:first>span').html(`￥${sumAll}`);
                                    count += parseInt(elm.num);
                                    $('.calc>p:last').html(`已选择${count}件商品`);
                                } else {
                                    sumAll -= parseInt(elm.price * elm.num);
                                    $('.calc>p:first>span').html(`￥${sumAll}`);
                                    count -= elm.num;
                                    $('.calc>p:last').html(`已选择${count}件商品`);
                                }

                            }
                        });
                    });

                    //删除
                    $('.middle').on('click', '.del', function() {
                        event.preventDefault();
                        $(event.target).parents('.middle-inner').remove();
                        let id = $(event.target).parents('.middle-inner').children('.wrap-right').children('.num').children('input').attr('name');
                        ck.forEach((elm, i) => {
                            if (elm.id === id) {
                                sumAll -= parseInt(elm.price * elm.num);
                                $('.calc>p:first>span').html(`￥${sumAll}`);
                                count -= elm.num;
                                $('.calc>p:last').html(`已选择${count}件商品`);
                                // console.log(elm, i);
                                ck.splice(i, 1);
                                // console.log(ck);
                                cookie.remove('shop');
                                cookie.set('shop', JSON.stringify(ck), 2);
                            }
                        });

                    });

                }
            });

        }


    })();



});