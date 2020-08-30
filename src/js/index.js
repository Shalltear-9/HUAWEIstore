import $ from './modules/jquery.js';

// 导入jQuery插件时无需指定名称 不需要调用
// 在改写时 需要在插件中引入jQuery作为模块
import './modules/jquery-tabs.js';
import './modules/jquery-md5.js'; // MD5插件，可以对字符串进行MD5算法加密
import Swiper from './modules/swiper-bundle.js';

// console.log($.md5('abc')); // MD5插件使用语法


$(function() {
    let mySwiper = new Swiper('.slide1', {
        loop: true,
        autoplay: true,
        pagination: {
            clickable: true,
            el: '.slide1-pagination',
        },
        navigation: {
            nextEl: ".slide1-next",
            prevEl: ".slide1-prve",
        },
    });
    for (let i = 0; i < mySwiper.pagination.bullets.length; i++) {
        mySwiper.pagination.bullets[i].onmouseover = function() {
            this.click();
        };
    };

    // 选项卡
    $('#list').tabs({
        ev: "mouseover"
    });
    $('#list').on('mouseout', function() {
        $('.content').removeClass('show');
        $('#list>.list-ul>li').removeClass('active');
    });


    let mySwiper1 = new Swiper('.slide2', {
        loop: false,
        autoplay: false,

        navigation: {
            nextEl: ".slide2-next",
            prevEl: ".slide2-prev",
        },
    });
    let mySwiper3 = new Swiper('.slide3', {
        loop: true,
        autoplay: true,
        pagination: {
            clickable: true,
            el: '.slide3-pagination',
        }
    });
    for (let i = 0; i < mySwiper3.pagination.bullets.length; i++) {
        mySwiper3.pagination.bullets[i].onmouseover = function() {
            this.click();
        };
    };
});