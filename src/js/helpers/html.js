/**
 * HTML generator
 */

module.exports = {
    video: function ($video) {
        var src = $video.getAttribute('data-svs-video');
        return  '<div class="svs-video">' +
                    '<video data-svs-src="' + src + '" src="" loop muted></video>' +
                '</div>';
    }
}
