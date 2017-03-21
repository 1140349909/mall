import {createWrapEle} from './base';
import './prefixfree.min.js';
import './jquery.stars.js';

function render(ele) {
    let wrap = createWrapEle();
    wrap.innerHTML = `
		<div class='special-effects-stars' style="width: ${$(window).width()}px; height:${$(window).height()}px"></div>
	`;
    ele.appendChild(wrap);

    $(wrap).find('.special-effects-stars').sparkleh({
        speed: 1,
        count: 80,
        color: ["#ff0080", "#373b93", "#0000FF"]
    });
}

function remove() {
    $('.special-effects-stars').remove();
}

export default {
    render,
    remove
}
