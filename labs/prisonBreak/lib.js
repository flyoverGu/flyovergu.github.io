'use strict';

const MAP = [
    '@A.B.',
    'a*.*.',
    '*..*^',
    'c..b*'
]

const _log = function() {
    //console.log.apply({}, arguments);
}

const _for = function(map, cb) {
    let lenY = map.length;
    let lenX = map[0].length;
    for (let y = 0; y < lenY; y++) {
        for (let x = 0; x < lenX; x++) {
            cb && cb(y, x);
        }
    }
}

/**
 * 检测位置是否合法
 *
 * @param {object} map
 * @param {object} pos
 * @returns {boolean}
 */
const _checkVaild = function(map, pos) {
    let lenY = map.length;
    let lenX = map[0].length;
    if (pos.x < 0 || pos.x >= lenX) return false;
    if (pos.y < 0 || pos.y >= lenY) return false;
    if (map[pos.y][pos.x] == '*') return false;
    return true;
}

/**
 * 检测是否碰到门了
 * 同时检查本身是否带着钥匙,如果带了钥匙就认为不是门
 *
 * @param {object} map
 * @param {object} pos
 * @returns {boolean}
 */
const _checkDoor = function(map, pos) {
    let c = map[pos.y][pos.x];
    if (c <= 'J' && c >= 'A') {
        if (pos.keys && ~pos.keys.indexOf(c.toLowerCase())) return false;
        return true;
    }
    return false;
}

/**
 * 检测是否找到钥匙了
 *
 * @param {object} map
 * @param {object} pos
 * @returns {boolean}
 */
const _checkKey = function(map, pos) {
    let c = map[pos.y][pos.x];
    if (c <= 'j' && c >= 'a') {
        // 如果已经有钥匙了
        if (pos.keys && ~pos.keys.indexOf(c)) {
            return false;
        }
        return true;
    }
    return false;
}

/**
 * 判定是否找到出口
 *
 * @param {object} map
 * @param {object} pos
 * @returns {boolean}
 */
const _getOut = function(map, pos) {
    if (map[pos.y][pos.x] == '^') {
        return true;
    }
    return false;
}

const _findPos = function(map, c) {
    let pos;
    _for(map, (y, x) => {
        if (c == map[y][x]) pos = {
            x, y
        };
    });
    return pos;
}

/**
 * 向四个方向枚举
 *
 * @param {function} cb
 */
const _go = function(cb) {
    [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ].forEach((item) => {
        cb && cb(item[0], item[1]);
    });
}

/**
 * 判断是否已经走过了
 *
 * @param {object} hash
 * @param {object} pos
 */
const _isAlreadyStep = function(hash, pos) {
    if (hash[`${pos.y}-${pos.x}`]) return true;
    hash[`${pos.y}-${pos.x}`] = true;
    return false;
}

const bfs = function(map, start, end) {
    let now;
    let out;
    let hash = {};
    let keys = [];
    let q = [start];
    while (now = q.shift()) {
        // 非法检测
        if (!_checkVaild(map, now)) continue;
        if (_isAlreadyStep(hash, now)) continue;
        // 碰到门
        if (_checkDoor(map, now)) continue;
        // 找到出口
        if (_getOut(map, now)) {
            out = now;
            break;
        }
        // 找到钥匙
        if (_checkKey(map, now)) {
            now.keys = now.keys || [];
            // 把钥匙放口袋里
            now.keys.push(map[now.y][now.x]);
            keys.push(now);
        }
        _log(now);
        // 遍历四个方向
        _go((offY, offX) => {
            let x = now.x + offX;
            let y = now.y + offY;
            q.push({
                keys: Object.assign([], now.keys),
                step: now.step.concat({
                    x, y
                }),
                x,
                y,
            });
        });
    }
    return {
        out,
        keys
    }
};

const search = function(map) {
    let start = _findPos(map, '@');
    let end = _findPos(map, '^');
    start.step = [];
    let q = [start];
    let now;
    let res;
    while (now = q.shift()) {
        res = bfs(map, now, end);
        _log(res);
        if (res.out) {
            break;
        }
        q = q.concat(res.keys);
    }
    _log(res);
    return res.out;
}

//search(MAP);
