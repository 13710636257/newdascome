/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/15.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/15.
 */


//华健
var s = {
    //默认
    u: {
        host: 'http://192.168.11.211:8080',
        path: '/devctrl/cloud/printers',
    },
    //获取打印列表
    printers: function () {
        return s.u.host + s.u.path;
    },
    //获取打印列表
    alias: function (sn) {
        return s.u.host + '/devctrl/cloud/' + sn + '/updateAlias';
    },
    //获取打印模板
    print: function (sn) {
        return s.u.host + '/devctrl/dev/' + sn + '/print';
    }

}

// 君
var u = {
    o: {
        host: 'http://192.168.11.211:12000',
        path: '/common/session/',
        x: 'http://192.168.11.211:12000/common/session/'
    },
    //注册
    register: function () {
        return u.o.host +　'/common/users';
    },
    //登录
    login: function () {
        return u.o.x;
    },
    //退出
    quit: function () {
        return u.o.x;
    },

}


//给接口URL定义可配置
var Interface = function (options) {
    if (!this instanceof Interface) return new Interface(options);
    this.init(options);
}
Interface.prototype = {
    constructor: Interface,
    init: function (options) {
        var DEFAULTS = {
            hostname: 'http://192.168.11.211',
            port: '12000',
            path: '/common/session/'

        }
        if (!options) {
            this.hostname = DEFAULTS.hostname;
            this.port = DEFAULTS.port;
            this.path = DEFAULTS.path;
            this.removeCache = ''

        } else {
            this.hostname = options.hostname || DEFAULTS.hostname;
            this.port = options.port || DEFAULTS.port;
            this.path = options.path || DEFAULTS.path;
            this.removeCache = '';
            if (options.IEcache) {
                this.removeCache = Math.random().toString(36).slice(2);
            }
        }


    },
    pipe: function () {
        var hostname = this.hostname
            , port = this.port
            , path = this.path
            , para = this.removeCache;
        return hostname + ':' + port + path + para;
    }
}