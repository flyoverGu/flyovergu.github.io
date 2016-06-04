'use strict';

const _getTpl = function(id) {
    return $(`#${id}`).html();
}

const _buildPrison = function(h, w) {
    let lenY = h
    let lenX = w
    let p = $('.prison');
    for (let y = 0; y < lenY; y++) {
        let row = $(_getTpl('row'));
        for (let x = 0; x < lenX; x++) {
            var b = $(_getTpl('block'));
            b.attr('y-x', `${y}-${x}`);
            row.append(b);
        }
        p.append(row);
    }
}

const _allow = function() {
    event.preventDefault();
}

const _drop = function(e) {
    let c = e.dataTransfer.getData('class');
    $(e.target).addClass(c);
}

const _dropOver = function(e) {
    let $e = $(e.target);
    if ($e.hasClass('prison')) return;
    if (window.holdWall && $e.hasClass('block')) {
        $e.addClass('wall');
    }
}

const _dragStart = function(e, c) {
    e.dataTransfer.setData('class', c);
    _downWall();
}

const _bind = function() {
    $('.start').on('click', () => _start());
    $('.reset').on('click', () => _reset());
    $('body').on('click', () => _downWall());
    $('.item .wall').on('click', () => _holdWall());
}

const _holdWall = function() {
    window.holdWall = true;
    return false;
}

const _downWall = function() {
    window.holdWall = false;
}

const _scan = function() {
    return [].map.call($('.prison .row'), (row) => {
        return [].map.call($(row).find('.block'), (block) => {
            let $b = $(block);
            if ($b.hasClass('people')) {
                return '@';
            }
            if ($b.hasClass('wall')) {
                return '*';
            }
            if ($b.hasClass('key-1')) {
                return 'a';
            }
            if ($b.hasClass('door-1')) {
                return 'A';
            }
            if ($b.hasClass('key-2')) {
                return 'b';
            }
            if ($b.hasClass('door-2')) {
                return 'B';
            }
            if ($b.hasClass('key-3')) {
                return 'c';
            }
            if ($b.hasClass('door-3')) {
                return 'C';
            }
            if ($b.hasClass('key-4')) {
                return 'd';
            }
            if ($b.hasClass('door-4')) {
                return 'D';
            }
            if ($b.hasClass('key-5')) {
                return 'e';
            }
            if ($b.hasClass('door-5')) {
                return 'E';
            }
            if ($b.hasClass('out-door')) {
                return '^';
            }
            if ($b.hasClass('people')) {
                return '@';
            }
            return '.';
        }).join("");
    });
}

const _renderPath = function(map, step) {
    let now;
    while (now = step.shift()) {
        $(`[y-x=${now.y}-${now.x}]`).addClass('step');
    }
}

const _reset = function() {
    $('.prison .block')
        .removeClass('out-door')
        .removeClass('step')
        .removeClass('wall')
        .removeClass('key')
        .removeClass('door')
        .removeClass('people');
}

const _start = function() {
    let map = _scan();
    console.log(map);
    let out = search(map);
    console.log(out);
    _renderPath(map, out.step);
}

const init = function() {
    _buildPrison(20, 30);
    _bind();
}

init();
