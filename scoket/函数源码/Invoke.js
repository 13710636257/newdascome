var ds_res = "";
var WebsocketSever = "127.0.0.1:6688";
var t1 = null;
var t2 = null;
var t3 = null;
var lastHeartBeat = null;
var flag = 0;
var flagConment = null;
var currentJob = null;
var reqQueue = new Array();
var processQueue = new Array();
var resQueue = new Array();
var seq = 0;
var timebase = 0;
var StatusMachineSpeed = 1;
var hooker_packinfo = null;
var g_invoke_result = null;
var iterator = null;
function StatusMachine() {
    if (0 == flag) {
        ds_res = "";
        if (reqQueue.length != 0) {
            currentJob = reqQueue.pop();
            processQueue.unshift(currentJob);
            var callback = currentJob.CALLBACK[0];
            delete currentJob["CALLBACK"];
            ds_sendToPrinter(JSON.stringify(currentJob));
            currentJob.CALLBACK = new Array;
            currentJob.CALLBACK[0] = callback;
            timebase = Date.now();
            flag = 1;
            StatusMachineSpeed = 1
        } else {
            StatusMachineSpeed = 1
        }
    } else if (1 == flag) {
        var packtype = currentJob.PackType;
        var overtime = packtype == 10 ? 1500 : (packtype == 11 ? 100000 : 1000);
        if (Date.now() - timebase > overtime)flag = 3;
        if (ds_res != "")flag = 2;
        var o = {"RtnCode": -1002, "Remarks": currentJob.ReqInfo.FunName, "SEQ": currentJob.SEQ};
        flagConment = o
    } else if (2 == flag) {
        flag = 0;
        var o = eval('(' + ds_res + ')');
        resQueue.unshift(o);
        for (var i = 0; i < processQueue.length; i++) {
            var obj = processQueue[i];
            if (obj.ReqInfo.FunName == o.Remarks && obj.SEQ == o.SEQ) {
                processQueue.splice(i, 1);
                break
            }
        }
        currentJob = null;
        flagConment = o;
        var callback = obj.CALLBACK[0];
        if (callback != null) {
            if (t2 != null)window.clearTimeout(t2);
            t2 = window.setTimeout(callback(o), 1)
        }
    } else if (3 == flag) {
        flag = 0;
        var obj = null;
        var o = {"RtnCode": -1003, "Remarks": currentJob.ReqInfo.FunName, "SEQ": currentJob.SEQ};
        for (var i = 0; i < processQueue.length; i++) {
            var obj = processQueue[i];
            if (obj.ReqInfo.FunName == o.Remarks && obj.SEQ == o.SEQ) {
                obj = processQueue.splice(i, 1);
                break
            }
        }
        currentJob = null;
        flagConment = o;
        var callback = obj.CALLBACK[0];
        if (callback != null) {
            if (t2 != null)window.clearTimeout(t2);
            t2 = window.setTimeout(callback(o), 1)
        }
    }
    if (t1 != null)window.clearTimeout(t1);
    t1 = window.setTimeout(StatusMachine, StatusMachineSpeed)
}
function ConnectionTest() {
    hooker_packinfo = {
        "PackType": 12,
        "ReqInfo": {"FunName": "InvalidFunction", "Parameters": []},
        "SEQ": seq,
        "CALLBACK": []
    }
}
var websocket = null;
var FirstTime = true;
function InitService() {
    WebsocketSever = arguments[0];
    if ("WebSocket"in window) {
        websocket = new WebSocket("ws://" + WebsocketSever)
    } else if ("MozWebSocket"in window) {
        websocket = new MozWebSocket("ws://" + WebsocketSever)
    } else {
        alert("当前浏览器不支持WebSocket");
        return
    }
    websocket.onopen = function (evt) {
    };
    websocket.onmessage = function (evt) {
        var o = eval('(' + evt.data + ')');
        var str = o.Remarks;
        if (str != "KeepAlive") {
        }
        ds_res = evt.data
    };
    websocket.onerror = function (evt) {
        websocket.close();
        if (currentJob != null) {
            var s = {"RtnCode": -1004, "Remarks": currentJob.ReqInfo.FunName, "SEQ": currentJob.SEQ};
            ds_res = JSON.stringify(s)
        }
        if (FirstTime) {
            FirstTime = false;
            alert("DSCP600 Printer Service 服务未运行！")
        }
        return
    };
    websocket.onclose = function () {
        websocket = null;
        return
    };
    StatusMachine();
    KeepAlive(1)
}
function KeepAlive(s) {
    if (s == 1) {
        if (t3 != null)window.clearInterval(t3);
        t3 = window.setInterval(__KeepAlive, 3000)
    } else if (s == 0) {
        if (t3 != null)window.clearInterval(t3)
    }
    function __KeepAlive() {
        hooker_packinfo = {
            "PackType": 13,
            "ReqInfo": {"FunName": "KeepAlive", "Parameters": []},
            "SEQ": seq,
            "CALLBACK": []
        };
        Invoke("KeepAlive")
    }
}
function Invoke() {
    if (arguments.length == 0) {
    }
    var callback = null;
    var funname = "";
    var data = hooker_packinfo == null ? {
        "PackType": 11,
        "ReqInfo": {"FunName": "InvalidFunction", "Parameters": []},
        "SEQ": seq,
        "CALLBACK": []
    } : hooker_packinfo;
    hooker_packinfo = null;
    var parlen = 0;
    var obj = null;
    if (typeof arguments[0] != "object") {
        funname = arguments[0] + "";
        obj = new Array;
        for (var i = 1; i < arguments.length; i++)obj[i - 1] = arguments[i]
    } else {
        obj = arguments[0];
        funname = obj.callee + "";
        funname = funname.substring(funname.indexOf(" ") + 1, funname.indexOf("("))
    }
    data.ReqInfo.FunName = funname;
    parlen = obj.length;
    if (parlen > 0) {
        var tempCallback = obj[parlen - 1];
        if (typeof tempCallback == "function") {
            callback = obj[parlen - 1];
            parlen = parlen - 1
        }
        for (var i = 0; i < parlen; i++) {
            data.ReqInfo.Parameters[i] = obj[i]
        }
    }
    data.SEQ = seq;
    seq++;
    data.CALLBACK[0] = callback;
    reqQueue.unshift(data)
}
function ds_sendToPrinter(sdata) {
    if (JSON.parse(sdata).PackType != 13) {
    }
    websocket.send(sdata)
}
function include() {
    var scp1 = "<script language=javascript src='";
    var scp2 = "' charset='utf-8'></script>";
    for (var i = 0; i < arguments.length; i++) {
        var filename = arguments[i] + "";
        var suffix = filename.substring(filename.length - 3);
        if (suffix == ".js") {
            document.write(scp1 + filename + scp2)
        }
    }
}
/**
 * Created by a on 2017/8/21.
 */
