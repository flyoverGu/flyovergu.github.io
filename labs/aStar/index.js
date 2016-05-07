var map = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, -1, 0, 0, 0],
    [0, 0, 0, -1, 0, 0, 0],
    [0, 1, 0, -1, 0, 2, 0],
    [0, 0, 0, -1, 0, 0, 0],
    [0, 0, 0, -1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

var dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
];

var H = map.length,
    W = map[0].length;

function _loop(cb, ccb) {
    $.map(map, (col, x) => {
        $.map(col, (row, y) => {
            cb && cb(x, y, row);
        });
        ccb && ccb(x, col);
    });

}

function render() {
    $('.map').append('---------------------------------------<br>');
    _loop((x, y, v) => {
        var $d = $('<div class="block"></div>');
        $d.addClass('color-' + v);
        $('.map').append($d);
    }, () => {
        $('.map').append('<br>');
    });
}

function findStartAndEnd() {
    var res = {};
    _loop((x, y, v) => {
        if (v == 1) {
            res.start = {
                x, y
            };
        }
        if (v == 2) {
            res.end = {
                x, y
            }
        }
    });
    return res;
}

function g() {
    var start = {
        x: 3,
        y: 1
    };
    var end = {
        x: 3,
        y: 5
    };
    // 优先队列
    var q = [],
        now, hash = {};
    q.push(start);
    while (now = q.pop()) {
        console.log(now.x, now.y);
        if (hash[now.x + '' + now.y]) {
            // 已经走过了 
            continue;
        }
        if (now.x < 0 || now.x >= H || now.y < 0 || now.y >= W) {
            // 超出地图了
            continue;
        }
        if (!~map[now.x][now.y]) {
            // 撞墙了
            continue;
        }
        if (now.x == end.x && now.y == end.y) {
            console.log('found');
            return;
        }
        map[now.x][now.y] = 1;
        hash[now.x + '' + now.y] = true;
        render();
        $.map(dir, (i) => {
            var cx = now.x + i[0],
                cy = now.y + i[1]
            q.push({
                x: cx,
                y: cy,
                v: h({
                    x: cx,
                    y: cy
                }, end)
            });
            //console.log('q', q);
        });
        q.sort((a, b) => {
            if (a.v > b.v) return -1;
            else return 1;
        });
    }
}

// 评估函数
function h(now, end) {
    var dx = now.x - end.x,
        dy = now.y - end.y;
    return dx * dx + dy * dy;
}

render();
g();
