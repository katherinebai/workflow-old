// JavaScript source code
var useSpecialPrint = true;

var old = Forguncy.ExportCommand.prototype.execute;
Forguncy.ExportCommand.prototype.execute = function () {
    if (useSpecialPrint) {
        var oldOpen = window.open;
        try {
            window.open = function (url) {
                Forguncy.Helper.post("customapi/serverprint/print", { url: url, port: window.location.port }, function () {
                    alert("打印成功，请到一楼管理部墙角的打印机上取你的报销单，然后粘贴发票");
                });
                return true;
            }
            old.call(this);
        } finally {
            window.open = oldOpen;
        }
    } else {
        old.call(this);
    }
}