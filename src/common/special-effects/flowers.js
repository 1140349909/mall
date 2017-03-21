import {createWrapEle} from './base';
import './jquery.snow.js';

function Base() {
    this.el;
    this.el2;
    this.el3;
    this.el4;
    this.el5;
    this.el6;
    this.el7;
    this.el8;
    this.el9;
    this.el10;
    this.el11;
}

Base.prototype.render = function (ele) {
    let wrap = createWrapEle('special-effects-snow');
    wrap.innerHTML = `
		<canvas class='special-effects-snow'></canvas>
		<canvas class='special-effects-snow2'></canvas>
		<canvas class='special-effects-snow3'></canvas>
		<canvas class='special-effects-snow4'></canvas>
		<canvas class='special-effects-snow5'></canvas>
		<canvas class='special-effects-snow6'></canvas>
		<canvas class='special-effects-snow7'></canvas>
		<canvas class='special-effects-snow8'></canvas>
		<canvas class='special-effects-snow9'></canvas>
		<canvas class='special-effects-snow10'></canvas>
		<canvas class='special-effects-snow11'></canvas>
	`;

    ele.appendChild(wrap);

    this.el = new Let_it_snow({
        el: $('.special-effects .special-effects-snow'),
        speed: 1,
        interaction: false,
        size: 9,
        count: 1,
        windPower: -2,
        image: __uri('./img/flowers.png')
    });

    this.el2 = new Let_it_snow({
        el: $('.special-effects .special-effects-snow2'),
        speed: 1,
        interaction: false,
        size: 7,
        count: 1,
        windPower: -2,
        image: __uri('./img/flowers2.png')
    });

    this.el3 = new Let_it_snow({
        el: $('.special-effects .special-effects-snow3'),
        speed: 1,
        interaction: false,
        size: 8,
        count: 1,
        windPower: -2,
        image: __uri('./img/flowers3.png')
    });

    this.el4 = new Let_it_snow({
        el: $('.special-effects .special-effects-snow4'),
        speed: 1,
        interaction: false,
        size: 8,
        count: 1,
        windPower: -2,
        image: __uri('./img/flowers4.png')
    });

    this.el5 = new Let_it_snow({
        el: $('.special-effects .special-effects-snow5'),
        speed: 1,
        interaction: false,
        size: 8,
        count: 1,
        windPower: 0,
        image: __uri('./img/flowers5.png')
    });

    this.el6 = new Let_it_snow({
        el: $('.special-effects .special-effects-snow6'),
        speed: 1,
        interaction: false,
        size: 6,
        count: 1,
        windPower: -1,
        image: __uri('./img/flowers6.png')
    });

    this.el7 = new Let_it_snow({
        el: $('.special-effects .special-effects-snow7'),
        speed: 1,
        interaction: false,
        size: 8,
        count: 1,
        windPower: 0,
        image: __uri('./img/flowers7.png')
    });

    this.el8 = new Let_it_snow({
        el: $('.special-effects .special-effects-snow8'),
        speed: 1,
        interaction: false,
        size: 9,
        count: 1,
        windPower: -1,
        image: __uri('./img/flowers8.png')
    });

    this.el9 = new Let_it_snow({
        el: $('.special-effects .special-effects-snow9'),
        speed: 1,
        interaction: false,
        size: 9,
        count: 1,
        windPower: 0,
        image: __uri('./img/flowers9.png')
    });

    this.el10 = new Let_it_snow({
        el: $('.special-effects .special-effects-snow10'),
        speed: 1,
        interaction: false,
        size: 9,
        count: 1,
        windPower: -1,
        image: __uri('./img/flowers10.png')
    });

    this.el11 = new Let_it_snow({
        el: $('.special-effects .special-effects-snow11'),
        speed: 1,
        interaction: false,
        size: 8,
        count: 1,
        windPower: -1,
        image: __uri('./img/flowers11.png')
    });
};

Base.prototype.remove = function () {
    this.el.stop();
    this.el2.stop();
    this.el3.stop();
    this.el4.stop();
    this.el5.stop();
    this.el6.stop();
    this.el7.stop();
    this.el8.stop();
    this.el9.stop();
    this.el10.stop();
    this.el11.stop();
}

new Base();

export default {
    render: Base.prototype.render,
    remove: Base.prototype.remove
}
