// 地图宽高
var H = 8;
var W = 8;
var block = '<div class="block"> </div>';

// 构建地图
function buildMap() {
    var h = H;
    var w = W;
    var map = [];
    for (var i = 0; i < h; i++) {
        var t = [];
        for (var j = 0; j < w; j++) {
            t.push(-1);
        }
        map.push(t);
    }
    window.map = map;
    _loop(function(i, j) {
        map[i][j] = randomColor(i, j);
    });
}

function randomColor(i, j) {
    var top = -1;
    var left = -1;
    if (i - 1 >= 0) {
        top = map[i - 1][j];
    }
    if (j - 1 >= 0) {
        left = map[i][j - 1];
    }
    var all = top + left;
    //var all = -2;
    if (all == -2) {
        return parseInt(Math.random() * 10 % 3);
    }
    if (top == -1) {
        return randomOut(left);
    }
    if (left == -1) {
        return randomOut(top);
    }
    if (left == top) {
        return randomOut(top);
    }
    if (all == 1) {
        return 2;
    }
    if (all == 2) {
        return 1;
    }
    if (all == 3) {
        return 0;
    }
};

function randomOut(out) {
    var a = 0;
    var b = 1;
    if (a == out) {
        a = 2;
    } else if (b == out) {
        b = 2;
    }
    if (Math.random() * 10 < 5) {
        return a;
    } else {
        return b;
    }

}

// 填充新色块
function fillNewBlock() {
    _loop(function(x, y) {
        if (!~map[x][y]) {
            map[x][y] = randomColor(x, y);
        }
    });
}

// 渲染地图
function renderMap() {
    var str = '';
    var $el = $('.map');
    $el.html('');
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            var $block = $(block);
            $block.addClass('color-' + map[i][j])
                .addClass(`p-${i}${j}`)
                .attr('x', i).attr('y', j);
            $el.append($block);
        }
        $el.append('<br>')
    }
}

function searchAll2() {
    var hash = {};
    var res = [];
    _loop(function(x, y) {
        if (hash[x + '' + y]) {
            return;
        }
        var step = searchRow(x, y);
        $.map(step, function(item) {
            hash[item.x + '' + item.y] = true;
        });
        if (step.length >= 3) {
            res.push(step);
        }
    });
    return res;
}

function searchAll() {
    var hash = {};
    var res = [];
    _loop(function(x, y) {
        if (hash[x + '' + y]) {
            return;
        }
        var step = [];
        search(x, y, map[x][y], {}, step);
        $.map(step, function(item) {
            hash[item.x + '' + item.y] = true;
        });
        if (step.length >= 3) {
            res.push(step);
        }
    });
    return res;
}

function searchCol(x, y, v, step, dir) {
    // 移动的四个方向 (可以优化成右和下两个方向)
    var dis = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];

    // 如果当前位置不在地图内，直接返回
    if ((x < 0 || x >= H) || (y < 0 || y > W)) {
        return;
    }

    // 如果当前位置v != 所给的v，直接返回
    if (map[x][y] !== v || map[x][y] == -1) {
        return;
    }

    // 可能的位置
    step.push({
        x: x,
        y: y
    });

    searchCol(x + dis[dir][0], y + dis[dir][1], v, step, dir);
}

function _concat(listA, listB) {
    var list = [];
    var hash = {};
    $.map(listA, function(item) {
        list.push(item);
        hash[item.x + '' + item.y] = true;
    });
    $.map(listB, function(item) {
        if (hash[item.x + '' + item.y]) return;
        list.push(item);
    });
    return list;
}

function searchRow(x, y) {
    // 移动的四个方向 (可以优化成右和下两个方向)
    var dis = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];
    var q = [];
    var res = [];
    var now = {};
    var hash = {};
    q.push({
        x: x,
        y: y
    });
    while (now = q.pop()) {
        var step = []
        for (var i = 0; i < dis.length; i++) {
            var _step = [];
            var new_x = now.x + dis[i][0];
            var new_y = now.y + dis[i][1];
            if (hash[new_x + '' + new_y]) {
                step.push([]);
            } else {
                searchCol(now.x, now.y, map[now.x][now.y], _step, i);
                step.push(_step);
            }
        }
        // 左右
        var col = _concat(step[0], step[1]);
        if (col.length > 2) {
            $.map(col, (item) => {
                res.push(item);
            });
        }
        // 上下
        var row = _concat(step[2], step[3]);
        if (row.length > 2) {
            $.map(row, (item) => {
                res.push(item);
            });
        }
        var all = _concat(col, row);
        $.map(all, (item) => {
            hash[item.x + '' + item.y] = true;
            if (item.x == now.x && item.y == now.y) return;
            q.push(item);
        });
    }
    if (res.length > 2) {
        return res;
    } else {
        return [];
    }
}

// 搜索x,y相邻的点也是v的数量
function search(x, y, v, hash, step) {
    // 移动的四个方向 (可以优化成右和下两个方向)
    var dis = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];

    // 如果当前位置已经走过了，直接返回
    if (hash[x + '' + y]) {
        return 0;
    }

    // 如果当前位置不在地图内，直接返回
    if ((x < 0 || x >= H) || (y < 0 || y > W)) {
        return 0;
    }


    // 如果当前位置v != 所给的v，直接返回
    if (map[x][y] !== v || map[x][y] == -1) {
        return 0;
    }

    // 标记此位置已经走过了
    hash[x + '' + y] = true;


    //高亮色块
    step.push({
        x: x,
        y: y
    });

    var all = 1;
    // 开始枚举当前位置的四个方向
    for (var i = 0; i < dis.length; i++) {
        all += search(x + dis[i][0], y + dis[i][1], v, hash, step);
    }

    return all;
}

function highLight(list) {
    $.map(list, function(item) {
        var x = item.x;
        var y = item.y;
        var xy = `.p-${x}${y}`;
        $(xy).addClass('high-light');
    });
}

// 消除相同的色块
function clearSameBlock() {
    _loop(function(x, y) {
        var xy = `.p-${x}${y}`;
        // 判断是否高亮
        if ($(xy).hasClass('high-light')) {
            // 标记消除
            map[x][y] = -1;
        }
    });
}

// 掉落色块
function dropNewBlock() {
    for (var j = 0; j < W; j++) {
        var c = 0;
        for (var i = H - 1; i >= 0; i--) {
            if (!~map[i][j]) {
                c++;
            } else if (c) {
                map[i + c][j] = map[i][j];
                map[i][j] = -1;
            }
        }
    }
}


function _loop(cb) {
    for (var i = 0; i < H; i++) {
        for (var j = 0; j < W; j++) {
            cb && cb(i, j);
        }
    }
}

function start() {
    //var same = searchAll();
    var same = searchAll2();
    if (same.length) {
        while (step = same.pop()) highLight(step);
        setTimeout(function() {
            clearSameBlock();
            renderMap();
        }, 300);

        setTimeout(function() {
            dropNewBlock();
            renderMap();
        }, 600);

        setTimeout(function() {
            fillNewBlock();
            renderMap();
        }, 900);

        setTimeout(function() {
            start();
        }, 1000);
    }
}

function listen() {
    var s;
    $('body').on('click', '.block', function(e) {
        var $item = $(e.target);
        var x = +$item.attr('x');
        var y = +$item.attr('y');
        //var step = searchRow(x, y);
        //highLight(step);
        //return;
        if (!s) {
            s = {
                x: x,
                y: y
            }
        } else {
            var c = map[x][y];
            map[x][y] = map[s.x][s.y];
            map[s.x][s.y] = c;
            renderMap();
            start();
            s = null;
        }
    });

}

function init() {
    buildMap();
    renderMap();
    start();
    listen();
}


init();

