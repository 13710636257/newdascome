/**
 * Created by ds008 on 2017/10/18.
 */
define(function (require, exports, module) {

    var $ = require('jquery')

    var s = function () {
        console.log(0)
    };

    var must = function () {
        console.log(2)
    };



    module.exports = {
        must:must,
        s:s
    }
})