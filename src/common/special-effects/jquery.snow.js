/* ===========================================================
 * jquery-Let_it_snow.js v1
 * ===========================================================
 * NOTE: This plugin is based on the work by Jason Brown (Loktar00)
 * https://github.com/loktar00/JQuery-Snowfall
 * http://www.thepetedesign.com
 *
 * As the end of the year approaches, let's add
 * some festive to your website!
 *
 * https://github.com/peachananr/Let_it_snow
 *
 * ========================================================== */

!function ($) {
    var defaults = {
        speed: 0,
        interaction: true,
        size: 2,
        count: 200,
        opacity: 0,
        color: "#ffffff",
        windPower: 0,
        image: false
    };

    var Let_it_snow = function (options) {
        this.state = false;
        this.settings = $.extend({}, defaults, options);
        this.el = this.settings.el;
        this.flakes = [];
        this.canvas = this.el.get(0);
        this.ctx = this.canvas.getContext("2d");
        this.flakeCount = this.settings.count;
        this.mX = -100;
        this.mY = -100;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        (function () {
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
            window.requestAnimationFrame = requestAnimationFrame;
        })();

        if (this.settings.image != false) {
            $("<img src='" + this.settings.image + "' style='display: none' id='lis_flake" + this.ctx.canvas.className + "'>").prependTo("body")
        }

        this.init();

        const _what = this;
        $(window).resize(function () {
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(() => {
                var el2 = _what.el.clone();
                el2.insertAfter(_what.el);
                this.el.remove();

                el2.Let_it_snow(_what.settings);
            }, 200);
        });

        if (this.settings.interaction == true) {
            this.canvas.addEventListener("mousemove", function (e) {
                this.mX = e.clientX,
                    this.mY = e.clientY
            });
        }
    };

    Let_it_snow.prototype.snow = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.flakeCount; i++) {
            var flake = this.flakes[i],
                x = this.mX,
                y = this.mY,
                minDist = 100,
                x2 = flake.x,
                y2 = flake.y;

            var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));

            if (dist < minDist) {
                var force = minDist / (dist * dist),
                    xcomp = (x - x2) / dist,
                    ycomp = (y - y2) / dist,
                    deltaV = force / 2;

                flake.velX -= deltaV * xcomp;
                flake.velY -= deltaV * ycomp;

            } else {
                flake.velX *= .98;
                if (flake.velY <= flake.speed) {
                    flake.velY = flake.speed
                }

                switch (this.settings.windPower) {
                    case false:
                        flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                        break;

                    case 0:
                        flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                        break;

                    default:
                        flake.velX += 0.01 + (this.settings.windPower / 100);
                }
            }

            var s = this.settings.color;
            var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
            var matches = patt.exec(s);
            var rgb = parseInt(matches[1], 16) + "," + parseInt(matches[2], 16) + "," + parseInt(matches[3], 16);


            flake.y += flake.velY;
            flake.x += flake.velX;

            if (flake.y >= this.canvas.height || flake.y <= 0) {
                // console.log('canvas.height', this.canvas.height)
                // console.log('canvas.width', this.canvas.width)
                // console.log('flake.y >= this.canvas.height || flake.y <= 0');
                // console.log('y', flake.y)
                // console.log('x', flake.x)
                // alert('yes')
                this.reset(flake);
            }


            if (flake.x >= this.canvas.width || flake.x <= 0) {
                // console.log('canvas.height', this.canvas.height)
                // console.log('canvas.width', this.canvas.width)
                // console.log('flake.x >= this.canvas.width || flake.x <= 0');
                // console.log('y', flake.y)
                // console.log('x', flake.x)
                // alert('no')
                this.reset(flake);
            }
            if (this.settings.image == false) {
                this.ctx.fillStyle = "rgba(" + rgb + "," + flake.opacity + ")"
                this.ctx.beginPath();
                this.ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.drawImage($("img#lis_flake" + this.ctx.canvas.className + "").get(0), flake.x, flake.y, flake.size * 2, flake.size * 2);
            }

        }
        if (this.state) {
            requestAnimationFrame(()=> this.snow());
        }
    }

    Let_it_snow.prototype.reset = function (flake) {
        if (this.settings.windPower == false || this.settings.windPower == 0) {
            flake.x = Math.floor(Math.random() * this.canvas.width);
            flake.y = 0;
        } else {
            if (this.settings.windPower > 0) {
                let xarray = Array(Math.floor(Math.random() * this.canvas.width), 0);
                let yarray = Array(0, Math.floor(Math.random() * this.canvas.height));
                let allarray = Array(xarray, yarray);
                let selected_array = allarray[Math.floor(Math.random() * allarray.length)];
                flake.x = selected_array[0];
                flake.y = selected_array[1];
            } else {
                let xarray = Array(Math.floor(Math.random() * this.canvas.width), 0);
                let yarray = Array(this.canvas.width, Math.floor(Math.random() * this.canvas.height));
                let allarray = Array(xarray, yarray);
                let selected_array = allarray[Math.floor(Math.random() * allarray.length)];
                flake.x = selected_array[0];
                flake.y = 0;
            }
        }

        flake.size = (Math.random() * 3) + this.settings.size;
        flake.speed = (Math.random() * 1) + this.settings.speed;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + this.settings.opacity;
    }

    Let_it_snow.prototype.init = function () {
        for (var i = 0; i < this.flakeCount; i++) {
            var x = Math.floor(Math.random() * this.canvas.width),
                y = Math.floor(Math.random() * this.canvas.height),
                size = (Math.random() * 3) + this.settings.size,
                speed = (Math.random() * 1) + this.settings.speed,
                opacity = (Math.random() * 0.5) + this.settings.opacity;

            this.flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: (Math.random()) / 30,
                step: 0,
                angle: 180,
                opacity: opacity
            });
        }
        this.state = true;
        this.snow();
    }

    Let_it_snow.prototype.stop = function () {
        this.state = false;
    };

    window.Let_it_snow = Let_it_snow;
}(window.jQuery);

