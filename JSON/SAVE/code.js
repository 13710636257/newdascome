/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/20.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/20.
 */

var BaseCode = function () {

}
BaseCode.prototype = {}



var StatusCode = function (options) {
    this.init(options);
}

StatusCode.prototype = {
    init: function (options) {
        this.xhr = options.xhr;


    },
    401: function () {

    },
    403: function () {

    }

}