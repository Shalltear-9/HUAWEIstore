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
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    // for (let i = 0; i < mySwiper.pagination.bullets.length; i++) {
    //     mySwiper.pagination.bullets[i].onmouseover = function() {
    //         this.click();
    //     };
    // };
    //选项卡
    // $('#list').tabs({
    //     ev: "mouseover"
    // });
    // $('#list').on('mouseout', function() {
    //     $('.content').removeClass('show');
    //     $('#list>.list-ul>li').removeClass('active');
    // });


    let mySwiper = new Swiper('.slide2', {
        loop: false,
        autoplay: false,
        // pagination: {
        //     clickable: true,
        //     el: '.swiper-pagination',
        // },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

});