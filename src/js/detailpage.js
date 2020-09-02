import $ from './modules/jquery.js';

// 导入jQuery插件时无需指定名称 不需要调用
// 在改写时 需要在插件中引入jQuery作为模块
import './modules/jquery-tabs.js';
import { cookie } from './modules/cookie.js'
import Swiper from './modules/swiper-bundle.js';

$(function() {
    $('.headdown>span').on('mouseover', function() {
        $('#list').addClass('show')
    });

    $('#list').tabs({
        ev: "mouseover"
    });
    $('#list').on('mouseleave', function() {
        // $('.content').removeClass('show');
        // $('#list>.list-ul>li').removeClass('active');
        $(this).removeClass('show')
    });

    (function() {
        let id = location.search.split('=')[1]
        $.ajax({
            type: "get",
            url: "../interface/detail.php",
            data: { id: id },
            dataType: "json",
            success: function(res) {

                let picture = JSON.parse(res.picture)
                    // console.log(picture);
                let template = '';
                let temptitle = '';
                let tempname = '';
                picture.forEach(elm => {
                    template += `
                        <div class="swiper-slide">
                            <img src="${elm.src}" alt="">
                        </div>
                        `;
                    temptitle = `<p class="h4">${res.title}</p>
                    <p>全新7nm 锐龙强劲处理器，轻薄机身全面屏，多屏协同，便携快充，一键指纹开机登录！</p>
                    <div class="price">
                        <p>价&nbsp;&nbsp;&nbsp;&nbsp;格<span>￥${res.price}</span></p>
                        <p>促&nbsp;&nbsp;&nbsp;&nbsp;销<span class="red">赠送积分</span>购买即赠商城积分，积分可抵现~</p>
                    </div>`;
                    tempname = ` &gt; <a href="#">笔记本电脑</a> &gt; <a href="#">${res.title}</a>`;
                });
                let temp = `<div class="imgwrap">
                <img src="${picture[0].src}" alt="">
                </div>`;

                $('.imgpreview').prepend(temp);
                $('.swiper-wrapper').append(template);
                $('.contentright').prepend(temptitle);
                $('.title').append(tempname);

                $('.join').on('click', function() {
                    addItem(res.id, res.price, $('.input>input').val());
                })
            }
        });

        //向cookie中存数据
        function addItem(id, price, num) {
            // console.log(id, price, num);
            let shop = cookie.get('shop');
            let goods = {
                id: id,
                price: price,
                num: num
            }
            if (shop) {
                shop = JSON.parse(shop);
                if (shop.some(elm => elm.id === id)) {
                    // console.log('有');
                    shop.forEach(elm => {
                        elm.id === id ? elm.num = num : null;
                    });
                } else {
                    shop.push(goods);
                }
            } else {
                shop = [];
                shop.push(goods);
            }
            cookie.set('shop', JSON.stringify(shop), 2);
        }

        //事件
        $('.swiper-wrapper').on('mouseover', '.swiper-slide>img', function() {
            $('.imgwrap>img').attr('src', $(this).attr('src'));
        });


    })();

    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 5,
        spaceBetween: 3,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });



    //放大镜

    $('.chosecolor>div').on('click', function() {
        $(this).addClass('active2').siblings().removeClass('active2');
    });

    $('.chosedeploy>div').on('click', function() {
        $(this).addClass('active2').siblings().removeClass('active2');
    });
    let i = $('.shopcar>.input>input').val()
    $(".shopcar>.input>button:contains('+')").on('click', function() {
        i++;
        $('.shopcar>.input>input').val(i);
    })

    $(".shopcar>.input>button:contains('-')").on('click', function() {
        if (i) {
            i--;
            $('.shopcar>.input>input').val(i);
        }

    });





});