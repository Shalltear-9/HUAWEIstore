import $ from './modules/jquery.js';

// 导入jQuery插件时无需指定名称 不需要调用
// 在改写时 需要在插件中引入jQuery作为模块
import './modules/jquery-tabs.js';
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

    $('.swiper-slide').hover(function() {
        $(this).css('border', '1px solid red');
    }, function() {
        $(this).css('border', 'none');
    });
    $('.swiper-slide>img').on('mouseover', function() {
        $('.imgwrap>img').attr('src', $(this).attr('src'));
    })


    //放大镜



});