import {createWrapEle} from './base';
import './jquery.snow.js';

function Base() {
    this.el;
}

Base.prototype.render = function (ele) {
    let wrap = createWrapEle('special-effects-snow');
    wrap.innerHTML = `
		<canvas class='snow-canvas'></canvas>
	`;

    ele.appendChild(wrap);

    this.el = new Let_it_snow({
        el: $('.special-effects .snow-canvas'),
        speed: 2,
        interaction: false,
        size: 10,
        count: 20,
        opacity: 0.4,
        windPower: -1,
        image: false
    });
};

Base.prototype.remove = function () {
    this.el.stop();
}

new Base();

export default {
    render: Base.prototype.render,
    remove: Base.prototype.remove
}
