/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/11.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/11.
 */

define(function (require, exports, module) {
    'use strict';
    var b = require('background');
    var t = require('text');
    var r = require('rect');
    var i = require('picture');
    var e = require('ellipse');

    
    module.exports = {
        Picture: i,
        Rect: r,
        Text: t,
        Background: b,
        Ellipse:e
    }
});


