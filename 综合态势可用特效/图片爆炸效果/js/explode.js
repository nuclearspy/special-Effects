/*Javascript代码片段*/
$(document).ready(function() {

    // 产生碎片. 这个示例中我用了5片,你也可以用25片:-)
    (genClips = function() {

        // 为了便于使用
        $t = $('.clipped-box');

        // 就像我刚才说的,我使用五个碎片
        var amount = 5;

        // 德得到每个长方形碎片的宽度
        var width = $t.width() / amount;
        var height = $t.height() / amount;

        // 总和是正方形块的数量
        var totalSquares = Math.pow(amount, 2);

        // 生成HTML内容
        var html = $t.find('.content').html();

        var y = 0;

        for (var z = 0; z <= (amount * width); z = z + width) 
        {

            $('<div class="clipped" style="clip: rect(' + y + 'px, ' + (z + width) + 'px, ' + (y + height) + 'px, ' + z + 'px)">' + html + '</div>').appendTo($t);

            if (z === (amount * width) - width) 
            {

                y = y + height;
                z = -width;

            }

            if (y === (amount * height)) 
            {
                z = 9999999;
            }

        }

    })();

    // 快速选择随机数量的块
    function rand(min, max) {

        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    // 检查动画即将结束时的变量
    var first = false,
        clicked = false;

    // 点击事件
    $('.clipped-box div').on('click', function() {

        if (clicked === false) {

            clicked = true;

            $('.clipped-box .content').css({ 'display': 'none' });

            // 应用到每个大正方形块
            $('.clipped-box div:not(.content)').each(function() {

                // 这个小块的输入介意 90m/s and 120m/s的随机数.,看起来好像很多的样子
                // 但是有时候它看起来会比较慢,不信你试试=_=. 这个取决于我设置timeout的时间.
                var v = rand(120, 90),
                    angle = rand(80, 89),
                    theta = (angle * Math.PI) / 180,
                    g = -9.8;


                var self = $(this);

                var t = 0,
                    z, r, nx, ny,
                    totalt = 15;


                var negate = [1, -1, 0],
                    direction = negate[Math.floor(Math.random() * negate.length)];


                var randDeg = rand(-5, 10),
                    randScale = rand(0.9, 1.1),
                    randDeg2 = rand(30, 5);


                var color = $(this).css('backgroundColor').split('rgb(')[1].split(')')[0].split(', '),
                    colorR = rand(-20, 20),
                    colorGB = rand(-20, 20),
                    newColor = 'rgb(' + (parseFloat(color[0]) + colorR) + ', ' + (parseFloat(color[1]) + colorGB) + ', ' + (parseFloat(color[2]) + colorGB) + ')';



                $(this).css({
                    'transform': 'scale(' + randScale + ') skew(' + randDeg + 'deg) rotateZ(' + randDeg2 + 'deg)',
                    'background': newColor
                });


                z = setInterval(function() {


                    var ux = (Math.cos(theta) * v) * direction;


                    var uy = (Math.sin(theta) * v) - ((-g) * t);


                    nx = (ux * t);


                    ny = (uy * t) + (0.5 * (g) * Math.pow(t, 2));


                    $(self).css({ 'bottom': (ny) + 'px', 'left': (nx) + 'px' });


                    t = t + 0.10;


                    if (t > totalt) {

                        clicked = false;
                        first = true;


                        $('.clipped-box').css({ 'top': '-1000px', 'transition': 'none' });
                        $(self).css({ 'left': '0', 'bottom': '0', 'opacity': '1', 'transition': 'none', 'transform': 'none' });



                        clearInterval(z);

                    }

                }, 10);

            });

        }

    });



    r = setInterval(function() {



        if (first === true) {

            $('.clipped-box').css({ 'top': '0', 'transition': '' });
            $('.clipped-box div').css({ 'opacity': '1', 'transition': '', 'background-color': '' });

            $('.content').css({ 'display': 'block' });

            first = false;

        }

    }, 300);
});