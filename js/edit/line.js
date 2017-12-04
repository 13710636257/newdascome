/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/25.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/25.
 */
define(function (require, exports, module) {
    'use strict';
    var Konva = require('konva')
        , config = require('config')
        , DEFAULTS = config.group
        , ellipse = config.line


    function Line(options) {
        if (!this instanceof Line) return new Line(options);
        this.init(options);
    }

    Line.prototype = {
        constructor: Line,
        init: function (options) {


        }
    }

    module.exports = Line;
});
