
function getOneUrl($video, done) {
    function foo($video, done) {
        var src = $video.find('video').attr('src');
        if (src) {
            setTimeout(function() {
                $video.find('.hv-ring').click();
            }, 1000);
            done(src, $video);
        } else {
            setTimeout(function() {
                foo($video, done);
            }, 100);
        }
    }
    $video.find('.hv-ring').click();
    foo($video, done);
}

function getUrl() {
    var $videoList = $('.html5-video');
    console.log($videoList);
    for (var i = 0; i < $videoList.length; i++) {
        getOneUrl($videoList.eq(i), function(url, $video) {
            console.log(url);
            $video.parent().append('<a href="' + url + '" download="1.mp4">下载</a>')
        });
    }
}


var node = document.createElement('script');
node.src = 'http://zeptojs.com/zepto.min.js';
node.onload = function() {
    getUrl();
}
document.body.appendChild(node);



