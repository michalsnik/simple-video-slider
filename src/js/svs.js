/**
 * *******************************************************
 * SVS (Simple Video Slider)
 * made to create customizable slider with videos effortlessly
 * *******************************************************
 */

// Modules & helpers
var _throttle           = require('lodash.throttle');
var _debounce           = require('lodash.debounce');
var _extend             = require('lodash.assign');
var _foreach            = require('lodash.foreach');

var html                = require('./helpers/html');
var video               = require('./helpers/video');


(function(window, document, undefined) {

    // Default options
    var options = {
        startEvent: 'DOMContentLoaded',
        infinite: true,
        animation: 'fade'
    };

    var $sliders = [];

    /**
     * Render slider
     * Generate html for each video etc.
     */
    var render = function ($slider) {
        var $videos = $slider.instance.querySelectorAll('[data-svs-video]');

        $slider.instance.classList.add('svs-slider');

        _foreach($videos, function($video, i) {
            var videoHtml = html.video($video);
            $video.outerHTML = videoHtml;
            $slider.videos.push($video);
        });
    };

    var start = function ($slider) {
        // var src = video($slider.videos[0]).getAttribute('data-svs-src');
        // video($slider.videos[0]).setAttribute('src', src);
    };

    /**
     * Initialize svs plugin
     * extend settings, attach events, trigger rendering
     */
    var init = function (settings) {
        options = _extend(options, settings);

        var _slider = document.querySelectorAll('[data-svs="true"]')[0];

        $slider = {
            instance: _slider,
            videos: []
        };

        render($slider);
        start($slider);
    };

    // Prepare API for global object
    var api = {
        init: init
    };

    // Attach api to global SVS variable
    window.SVS = api;

})(window, document);
