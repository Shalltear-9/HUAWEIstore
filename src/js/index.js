import $ from './modules/jquery.js';
// import { cookie } from './modules/cookie';

$(function() {
    $('#btn').on('click', function() {
        import ('./modules/cookie.js').then(function({ cookie }) {
            console.log(cookie);
        })
    })
})