/**
 * @author ghost
 */
var mySo = air.SharedObject.getLocal("cookie");;
var charset_in = "utf-8";
var charset_out = "utf-8";
var file_content = "";
var file_num = 0;
var file_content_num = 0;
var _files = [];
var _files_content = [];
var save_path = "";
var _temp_n = [];
var _temp = [];
var p;
var URL = 0;
var fname = "";
var os = (function(){
    var o = window.runtime.flash.system.Capabilities.os;
    o = o.split(" ");
    return o;
})();
var pathType = air.File.separator;
//set
var _set = {
    mark: false,
    cr: air.File.lineEnding,
    cssStart: ".cssStart{display:none}",
    cssEnd: ".cssEnd{display:none}",
    inc: true,
    inc_path: false,
    mode_qsave: false,
    mode_qfile: false,
    mode_choose_file: false,
    mode_batch: false,
    other_path: false,
    other_path_inp: "",
    desktop_path: false,
    site_path: "",
    site_path2: "",
    site_path_sg: false,
    read: true,
    batch: false,
    semicolon: ";"
}
var _fileName = {
    enable: false,
    suffix: "",
    bakfile: false
}
var _picVersion = {
    enable: false,
    all: false,
    delver: false,
    list: [],
    text: "v",
    ver: getNum(1)
}

function setPrefs(){
    _set.other_path_inp = $("#other_path").val();
	_picVersion.text = "v";
	_picVersion.ver = getNum(1);
    mySo.data.set = _set;
    mySo.data.fileName = _fileName;
    mySo.data.picVersion = _picVersion;
    mySo.data.charset_in = charset_in;
    mySo.data.charset_out = charset_out;
    var flushStatus = null;
    try {
        flushStatus = mySo.flush();
    } 
    catch (error) {
    }
    if (flushStatus != null) {
        switch (flushStatus) {
            case air.SharedObjectFlushStatus.PENDING:
                air.trace("no");
                break;
            case air.SharedObjectFlushStatus.FLUSHED:
                air.trace("OK");
                break;
        }
    }
}

function getPrefs(){
	//mySo.clear();
    if (mySo.data.set) {
        $("#main_div").show();
        _set = mySo.data.set;
        _fileName = mySo.data.fileName;
        _picVersion = mySo.data.picVersion;
        charset_in = mySo.data.charset_in;
        charset_out = mySo.data.charset_out;
        
        if (_set.mode_qsave) {
            $("#ckbox_set_qsave").attr("checked", true);
        }
        else {
            $("#ckbox_set_qsave").attr("checked", false);
        }
        if (_set.inc) {
            $("#ckbox_set_import").attr("checked", true);
            $("#set_import_path").show();
            if (_set.inc_path) {
                $("#ckbox_set_import_path").attr("checked", true);
                $("#set_import_path_div").show();
                $("#input_set_import_path").val(_set.site_path);
                $("#input_set_import_path2").val(_set.site_path2);
            }
            else {
                $("#ckbox_set_import_path").attr("checked", false);
                $("#set_import_path_div").hide();
                $("#input_set_import_path").val(_set.site_path);
                $("#input_set_import_path2").val(_set.site_path2);
            }
        }
        else {
            $("#ckbox_set_import").attr("checked", false);
            $("#set_import_path").hide();
            $("#set_import_path_div").hide();
        }
        if (_set.site_path_sg) {
            $("#ckbox_set_import_path_sg").attr("checked", true);
        }
        else {
            $("#ckbox_set_import_path_sg").attr("checked", false);
        }
        if (_set.mark) {
            $("#ckbox_set_se").attr("checked", true);
        }
        else {
            $("#ckbox_set_se").attr("checked", false);
        }
        if (_set.cr == "") {
            $("#ckbox_set_cr").attr("checked", true);
        }
        else {
            $("#ckbox_set_cr").attr("checked", false);
        }
        if (_set.semicolon == "") {
            $("#ckbox_set_semicolon").attr("checked", true);
			_set.semicolon = "";
        }
        else {
            $("#ckbox_set_semicolon").attr("checked", false);
			_set.semicolon = ";";
        }
        if (_set.other_path) {
            $("#radio_other_path").attr("checked", true);
            $("#set_other_path_div").show();
            $("#other_path").val(_set.other_path_inp);
        }
        else 
            if (_set.desktop_path) {
                $("#radio_desktop_path").attr("checked", true);
                $("#set_other_path_div").hide();
                $("#other_path").val(_set.other_path_inp);
            }
            else {
                $("#radio_dir_path").attr("checked", true);
                $("#set_other_path_div").hide();
                $("#other_path").val(_set.other_path_inp);
            }
        
        if (charset_in == "utf-8") {
            $("#set_in_charset_utf8").attr("checked", true);
        }
        else {
            $("#set_in_charset_gb2312").attr("checked", true);
        }
        if (charset_out == "utf-8") {
            $("#set_out_charset_utf8").attr("checked", true);
        }
        else {
            $("#set_out_charset_gb2312").attr("checked", true);
        }
        if (_picVersion.enable) {
            $("#ckbox_picpath_doit").attr("checked", true);
            $("#set_pic_path_div").show();
            if (_picVersion.delver) {
                $("#ckbox_picpath_delver").attr("checked", true);
            }
            else {
                $("#ckbox_picpath_delver").attr("checked", false);
            }
            if (_picVersion.all) {
                $("#radio_picpath_all").attr("checked", true);
                $("#textarea_picpath_list").hide();
            }
            else {
                $("#radio_picpath_list").attr("checked", true);
                $("#textarea_picpath_list").show();
            }
        }
        else {
            $("#ckbox_picpath_doit").attr("checked", false);
            $("#set_pic_path_div").hide();
        }
        if (_fileName.enable) {
            $("#set_file_name").attr("checked", true);
            $("#set_time").attr("checked", false).attr("disabled", "true");
            $("#set_hzname").attr("value", "").attr("disabled", "true");
        }
        else {
            if (_fileName.suffix == "") {
                $("#set_time").attr("checked", true);
                $("#set_hzname").attr("value", "").attr("disabled", "true");
            }
            else {
                $("#set_time").attr("checked", false);
            }
        }
    }
    else {
        $("#hint_div").show();
        setPrefs();
    }
}

function file(){
    this.load = false;
    this.N = file_num;
    this.num = file_num;
    this.name = "";
    this.path = "";
    this.content = "";
    this.level = 0;
    this.parent = 0;
    this.IO = true;
    this._level_files = [];
    this.level_files = function(){
        var temp = this.level_files_path();
        
        if (temp && temp.length > 0) {
            var lf = [];
            for (n = 0; n < temp.length; n++) {
                var temp_array_arr = temp[n].match(/\("*(.*?)"*\)/g);
                temp_array_arr = temp_array_arr[0].split("?");
                var fullPath = temp_array_arr[0].replace(/\(\"*/g, "").replace(/\"*\)/g, "");
                var path = this.path.split(pathType).slice(0, -1).join(pathType);
                lf[n] = ConversionPath(path, fullPath);
            }
            return lf;
        }
        else {
            return false;
        }
    };
    this.level_files_num = function(){
        if (this._level_files_path) {
            return this._level_files_path.length;
        }
        else {
            return 0;
        }
    };
    this.level_files_path = function(){
        var temp = this.content.replace(/\/\*((.|\s)*?)\*\//g, "");
        temp = temp.match(/@import *[url\("]+(.*?)["\)]+;?/g);
        return temp;
    };
    this.ext_file = function(){
        var _re = [], temp = this.content;
        temp = temp.replace(/;( *)/g, ";");
        _re[0] = /\/\*((.|\s)*?)\*\//g;
        _re[1] = /@(import|charset)( *.*?);+/g;
        _re[2] = _set.cssStart;
        _re[3] = _set.cssEnd;
        
        for (n = 0; n < _re.length; n++) {
            temp = temp.replace(_re[n], "");
        }
        
        temp = temp.replace(/\}(\r\n)+/g, "}");
        temp = temp.replace(/\r\n/g, " ");
        temp = temp.replace(/[\f\n\r\t\v]*/g, "");
        temp = temp.replace(/( *),( *)/g, ",");
        temp = temp.replace(/({|;)( +)/g, "$1");
        temp = temp.replace(/ *: */g, ":");
        temp = temp.replace(/\x20*\{/g, "{");
        temp = temp.replace(/  +/g, " ");
        temp = temp.replace(/^ /g, "");
        temp = temp.replace(/ *;;*/g, ";");
        temp = temp.replace(/\"\"*/g, "\"");
        temp = temp.replace(/:0[px|pt|em|%]+/g, ":0");
        temp = temp.replace(/ +0[px|pt|em|%]+/g, " 0");
        temp = temp.replace(/content:\"[; ]/g, "content:\"\";");
        temp = temp.replace(/} */g, "}" + _set.cr);
        temp = temp.replace(/;\}/g, _set.semicolon + "}");
        temp = temp.replace(/\}[\f\n\r\t\v]*\}/g, "}}");
        if (_picVersion.enable) {
            if (!_picVersion.delver) {
                if (_picVersion.all) {
                    temp = temp.replace(/background(\s*\:|-image\s*\:)(.*?)url\([\'|\"]?([\w+:\/\/^]?[^? \}]*\.(\w+))\?*.*?[\'|\"]?\)/g, "background$1$2url($3?" + _picVersion.text + "=" + _picVersion.ver + ".$4)");
                    temp = temp.replace(/Microsoft\.AlphaImageLoader\((.*?)?src=[\'|\"]?([\w+:\/\/^]?[^? \}]*\.(\w+))[\?\w\d=]+[\'|\"]?(.*?)\)/g, "Microsoft.AlphaImageLoader($1src='$2?" + _picVersion.text + "=" + _picVersion.ver + ".$3'$4)");
                }
                else 
                    if (_picVersion.list.length > 0) {
                        for (var n = 0; n < _picVersion.list.length; n++) {
                            var re = new RegExp("background(\s*\\\:|-image\s*\\\:)(.*?)url\\\([\\\'|\\\"]?(" + _picVersion.list[n].split("?")[0] + ")\\\?*.*?[\\\'|\\\"]?\\\)", "g");
                            var str = re + "";
                            var patt = new RegExp("\\([\\w+:\\/\\/^]?[^? ]*\\.(\\w+)\\?*.*?\\)", "g");
                            var hz = patt.exec(str);
                            temp = temp.replace(re, "background$1$2url($3?" + _picVersion.text + "=" + _picVersion.ver + "." + hz[1] + ")");
                        }
                        for (var n = 0; n < _picVersion.list.length; n++) {
                            var re = new RegExp("Microsoft\\\.AlphaImageLoader\\\((.*?)?src=[\\\'|\\\"]?(" + _picVersion.list[n].split("?")[0] + ")[\\\?\\\w\\\d=]+[\\\'|\\\"]?(.*?)\\\)", "g");
                            var str = re + "";
                            var patt = new RegExp("\\([\\w+:\\/\\/^]?[^? ]*\\.(\\w+)\\?*.*?\\)", "g");
                            var hz = patt.exec(str);
                            temp = temp.replace(re, "Microsoft.AlphaImageLoader($1src='$2?" + _picVersion.text + "=" + _picVersion.ver + "." + hz[1] + "'$3)");
                        }
                    }
            }
            else {
                // 删除版本控制
                if (_picVersion.all) {
                    temp = temp.replace(/background(?:\s*\:|-image\s*\:)(.*?)url\([\'|\"]?([\w+:\/\/^]?[^? \}]*\.\w+)\?*.*?[\'|\"]?\)/g, "background$1url($2)");
                    temp = temp.replace(/Microsoft\.AlphaImageLoader\((.*?)?src=[\'|\"]?([\w+:\/\/^]?[^? \}]*\.\w+)[\?\w\d=]+[\'|\"]?(.*?)\)/g, "Microsoft.AlphaImageLoader($1src='$2'$3)");
                }
                else 
                    if (_picVersion.list.length > 0) {
                        for (var n = 0; n < _picVersion.list.length; n++) {
                            var re = new RegExp("background(?:\s*\\\:|-image\s*\\\:)(.*?)url\\\([\\\'|\\\"]?(" + _picVersion.list[n].split("?")[0] + ")\\\?*.*?[\\\'|\\\"]?\\\)", "g");
                            temp = temp.replace(re, "background$1url($2)");
                        }
                    }
            }
        }
        return temp;
    }
}

function doBrowseFile(){
    var filters = new runtime.Array(new air.FileFilter('CSS(*.css)', '*.css'));
    
    if ($("#ckbox_set_qsave").is(":checked")) {
        _set.mode_qsave = true;
    }
    else {
        _set.mode_qsave = false;
    }
    if (_set.mode_qsave) {
        file_css.browseForOpenMultiple('Select an CSS', filters);
        file_css.addEventListener(air.FileListEvent.SELECT_MULTIPLE, doSelectFile);
    }
    else {
        file_css.browseForOpen('Select an CSS', filters);
        file_css.addEventListener(air.Event.SELECT, doSelectFile);
    }
}

function doSelectFile(e){
    URL = 0;
    if (!_set.mode_batch) {
        if (_set.mode_choose_file) {
            save_mode(2);
            if (checkFileType(file_css.nativePath)) {
                _files[file_num] = new file(file_css);
                var txt = '读取" ' + file_css.nativePath + ' "...';
                print(txt);
                readFile(file_css.nativePath);
                fname = file_css.name;
                preCSSname(fname);
                file_list();
                mergeFile();
                $("#input_save").attr("disabled", "");
            }
        }
        else {
            retset();
            save_mode(1);
            if ($("#ckbox_set_se").is(":checked")) {
                _set.mark = true;
            }
            else {
                _set.mark = false;
            }
            if ($("#ckbox_set_import").is(":checked")) {
                _set.inc = true;
            }
            else {
                _set.inc = false;
            }
            if ($("#ckbox_set_import_path").is(":checked")) {
                _set.inc_path = true;
            }
            else {
                _set.inc_path = false;
            }
            if ($("#ckbox_picpath_doit").is(":checked")) {
                _picVersion.enable = true;
            }
            else {
                _picVersion.enable = false;
            }
            if ($("#ckbox_set_cr").is(":checked")) {
                _set.cr = "";
            }
            else {
                _set.cr = air.File.lineEnding;
            }
            if (_set.mode_qsave) {
                for (i = 0; i < e.files.length; i++) {
                    if (checkFileType(e.files[i].nativePath)) {
                        _files[file_num] = new file(e.files[i]);
                        var txt = '读取" ' + e.files[i].nativePath + ' "...';
                        print(txt);
                        readFile(e.files[i].nativePath);
                        if (_set.mode_choose_file) {
                            file_list();
                        }
                        fname = e.files[i].name;
                        preCSSname(fname);
                        mergeFile();
                        $("#input_save").attr("disabled", "");
                        if (URL == 0) {
                            doSave();
                        }
                    }
                }
            }
            else {
                if (checkFileType(file_css.nativePath)) {
                    _files[file_num] = new file(file_css);
                    var txt = '读取" ' + file_css.nativePath + ' "...';
                    print(txt);
                    readFile(file_css.nativePath);
                    fname = file_css.name;
                    preCSSname(fname);
                    mergeFile();
                    $("#input_save").attr("disabled", "");
                }
            }
        }
    }
    else {
        var txt = '<span style="color:#D94A0B;">批处理模式下只能处理文件列表 !</span>';
        print(txt);
    }
}

function readFile(path){
    if (path.substr(0, 4) != "http") {
        try {
            var f = air.File.applicationDirectory.resolvePath(path);
            
            var fs = new air.FileStream();
            fs.open(f, air.FileMode.READ);
            _files[file_num].name = f.name;
            _files[file_num].path = path;
            var byteArr = new air.ByteArray();
            fs.readBytes(byteArr, 0, fs.size);
            _files[file_num].content = transEncodingText(byteArr);
            byteArr.position = 0;
            //_files[file_num].content = fs.readMultiByte(fs.bytesAvailable, charset_out);
            fs.close();
            _files[file_num]._level_files_path = _files[file_num].level_files_path();
            _files[file_num]._level_files = _files[file_num].level_files();
            var file_n = file_num;
            file_num++;
            var files_list = _files[file_n]._level_files;
            var files_level = _files[file_n].level;
            var files_parent = _files[file_n].num;
            
            if (files_list) {
                for (var i = 0; i < files_list.length; i++) {
                    _files[file_num] = new file();
                    _files[file_num].level = files_level + 1;
                    _files[file_num].parent = files_parent;
                    readFile(files_list[i]);
                }
            }
            var txt = '已读取" ' + path + ' ".';
            print(txt);
        } 
        catch (error) {
            _files[file_num].load = false;
            var txt = '<span style="color:#D94A0B;">读取" ' + path + ' "失败 !</span>';
            print(txt);
        }
    }
    else 
        if (URL == 0) {
            var loader = new air.URLLoader();
            configureListeners(loader);
            var request = new air.URLRequest(path);
            file_content_num = file_num;
            file_num++;
            try {
                loader.load(request);
                _files[file_content_num].path = path;
                URL++;
                var txt = '<span style="color:#D94A0B;">读取非本地文件" ' + path + ' "... </span>';
                print(txt);
            } 
            catch (error) {
                _files[file_content_num].path = path;
                _files[file_num].load = false;
                var txt = '<span style="color:#D94A0B;">读取 非本地文件" ' + path + ' "失败 ! 找不到指定文件。</span>';
                print(txt);
            }
        }
}

function transEncodingText(bytes){
    if (bytes[0] == 255 && bytes[1] == 254) {
        return bytes.readMultiByte(bytes.length, "unicode");
    }
    if (bytes[0] == 98 && bytes[1] == 111) {
        return bytes.readMultiByte(bytes.length, "utf-8");
    }
    if (bytes[0] == 254 && bytes[1] == 255) {
        return bytes.readMultiByte(bytes.length, "UTF-16BE");
    }
    if (bytes[0] == 239 && bytes[1] == 187) {
        return bytes.readMultiByte(bytes.length, "utf-8");
    }
    if (bytes[0] == 64 && bytes[1] == 99) {
        if (charset_in == "gb2312") {
            return bytes.readMultiByte(bytes.length, "gb2312");
        }
        if (charset_in == "utf-8") {
            return bytes.readMultiByte(bytes.length, "utf-8");
        }
    }
    return bytes.readMultiByte(bytes.length, air.File.systemCharset);
}

function configureListeners(dispatcher){
    dispatcher.addEventListener(air.Event.COMPLETE, completeHandler);
    dispatcher.addEventListener(air.HTTPStatusEvent.HTTP_STATUS, httpStatusHandler);
    dispatcher.addEventListener(air.IOErrorEvent.IO_ERROR, ioErrorHandler);
}

function httpStatusHandler(event){
    if (event.status == 200) {
        _files[file_content_num].load = true;
    }
    else {
        _files[file_content_num].load = false;
    }
}

function ioErrorHandler(event){
    //air.trace("ioErrorHandler: " + event);
    if (event.errorID == 2032) {
        URL--;
        var text = event.text;
        text = text.match(/http:\/\/.*/g);
        var txt = '<span style="color:#D94A0B;">链接不到" ' + text + ' "文件，请确认网络链接正常及路径正确！</span>';
        print(txt);
    }
    if (URL == 0 && _set.mode_qsave) {
        doSave();
    }
}

function completeHandler(event){
    if (_files[file_content_num].load) {
        var loader = air.URLLoader(event.target);
        _files[file_content_num].content = loader.data;
        _files[file_content_num]._level_files_path = 0;
        _files[file_content_num]._level_files = _files[file_content_num].level_files();
        mergeFile();
        URL--;
        var txt = '已读取" ' + _files[file_content_num].path + ' ".';
        print(txt);
    }
    if (URL == 0 && _set.mode_qsave) {
        doSave();
    }
}

function doOver(e){
    for (var t = 0; t < e.dataTransfer.types.length; t++) {
        if (e.dataTransfer.types[t] == 'application/x-vnd.adobe.air.file-list') {
            e.preventDefault();
        }
    }
}

function doDrop(e){
    URL = 0;
    var files = e.dataTransfer.getData('application/x-vnd.adobe.air.file-list');
    if (!_set.mode_batch) {
        if (_set.mode_choose_file) {
            save_mode(2);
            for (var t = 0; t < files.length; t++) {
                if (checkFileType(files[t].nativePath)) {
                    _files[file_num] = new file(files[t]);
                    var txt = '读取" ' + files[t].nativePath + ' "...';
                    print(txt);
                    readFile(files[t].nativePath);
                }
            }
            file_list();
            fname = _files[0].name;
            preCSSname(fname);
            mergeFile();
            $("#input_save").attr("disabled", "");
        }
        else {
            retset();
            save_mode(1);
            $("#mode_list_file").hide();
            $("#ckbox_set_import").attr("disabled", false);
            
            if ($("#ckbox_set_se").is(":checked")) {
                _set.mark = true;
            }
            else {
                _set.mark = false;
            }
            if ($("#ckbox_set_import").is(":checked")) {
                _set.inc = true;
            }
            else {
                _set.inc = false;
            }
            if ($("#ckbox_set_qsave").is(":checked")) {
                _set.mode_qsave = true;
            }
            else {
                _set.mode_qsave = false;
            }
            if ($("#ckbox_set_import_path").is(":checked")) {
                _set.inc_path = true;
            }
            else {
                _set.inc_path = false;
            }
            if ($("#ckbox_picpath_doit").is(":checked")) {
                _picVersion.enable = true;
            }
            else {
                _picVersion.enable = false;
            }
            if ($("#ckbox_set_cr").is(":checked")) {
                _set.cr = "";
            }
            else {
                _set.cr = air.File.lineEnding;
            }
            
            if (_set.mode_qsave) {
                var _files_list = [];
                for (var t = 0; t < files.length; t++) {
                    if (checkFileType(files[t].nativePath)) {
                        _files_list[t] = files[t];
                    }
                }
                for (var t = 0; t < files.length; t++) {
                    retset();
                    if (checkFileType(_files_list[t].nativePath)) {
                        _files[file_num] = new file(_files_list[t]);
                        var txt = '读取" ' + _files_list[t].nativePath + ' "...';
                        print(txt);
                        readFile(_files_list[t].nativePath);
                        fname = _files_list[t].name;
                        preCSSname(fname);
                        mergeFile();
                    }
                    $("#input_save").attr("disabled", "");
                    if (URL == 0) {
                        doSave(_files_list[t].nativePath);
                    }
                }
            }
            else 
                if (checkFileType(files[0].nativePath)) {
                    _files[file_num] = new file(files[0]);
                    var txt = '读取" ' + files[0].nativePath + ' "...';
                    print(txt);
                    readFile(files[0].nativePath);
                    fname = _files[0].name;
                    preCSSname(fname);
                    mergeFile();
                    $("#input_save").attr("disabled", "");
                }
            
        }
    }
    else {
        var txt = '<span style="color:#D94A0B;">批处理模式下只能处理文件列表 !</span>';
        print(txt);
    }
}

function checkFileType(path){
    path = path + "";
    if (path.substr(0, 4) != "http") {
        var temp = path.split(pathType);
        temp = temp.pop();
        var temp_file = temp.split(".");
        temp_file = temp_file.pop();
        var temp_type = "css,CSS";
        if (temp_type.search(temp_file) >= 0) {
            return true;
        }
        else {
            var txt = '<span style="color:#D94A0B;">" ' + path + ' "文件类型错误 !</span>';
            print(txt);
            return false;
        }
    }
}

function getFilePath(path){
    if (path.substr(0, 4) != "http") {
        var temp_path = path.split(pathType);
        temp_path.pop();
        var temp_filePath = temp_path.join(pathType);
        return temp_filePath + pathType;
    }
    else {
        return air.File.desktopDirectory.nativePath + pathType;
    }
}

function ConversionPath(dirPath, filePath){
    var temp = filePath.substr(0, 4);
    if (temp == "http") {
        return filePath;
    }
    else {
        if (os[0] == "Windows") {
            var temp = filePath.substr(0, 1);
            if (temp == "/") {
                return filePath;
            }
            else {
                filePath = filePath.replace(/\//g, pathType);
            }
        }
        else {
            filePath = filePath.replace(/\\/g, pathType);
        }
    }
    var temp_filePath = filePath.split(pathType);
    if (temp_filePath.length == 1) {
        return dirPath + pathType + filePath;
    }
    else 
        if (temp_filePath.length > 1) {
            var temp_dirPath = dirPath.split(pathType);
            switch (temp_filePath[0]) {
                case "..":
                    temp_dirPath.pop();
                    temp_filePath.shift();
                    temp_dirPath = temp_dirPath.join(pathType);
                    temp_filePath = temp_filePath.join(pathType);
                    return ConversionPath(temp_dirPath, temp_filePath);
                    break;
                case ".":
                    temp_filePath.shift();
                    temp_dirPath = temp_dirPath.join(pathType);
                    temp_filePath = temp_filePath.join(pathType);
                    return temp_dirPath + pathType + temp_filePath;
                    break;
                case "":
                    temp_filePath.shift();
                    temp_filePath = temp_filePath.join(pathType);
                    return ConversionPath(temp_dirPath[0], temp_filePath);
                    break;
                default:
                    return dirPath + pathType + filePath;
            }
        }
}

function file_list(){
    $("#div_list_file").html("");
    var temp_path = "<ul>";
    for (var t = 0; t < _files.length; t++) {
        if (_files[t].path != "") {
            temp_path += '<li class="fileslist' + _files[t].level + '" style="margin-left:' + _files[t].level + '0px">';
            temp_path += '<label><input type="checkbox" name="checkboxname" level="' + _files[t].level + '" num="' + _files[t].num + '" />';
            temp_path += _files[t].path + "</label>";
            temp_path += "</li>";
        }
    }
    temp_path += "</ul>";
    $("#div_list_file").html(temp_path);
    
    $("#div_list_file li input").attr("checked", true);
    $("#div_list_file li input").click(function(){
        var n = $(this).attr("num");
        if ($(this).is(":checked")) {
            _files[n].IO = true;
        }
        else {
            _files[n].IO = false;
        }
    });
}

function sortN(){
    _temp = [];
    _temp_n = [];/*堆栈*/
    if (_set.mode_choose_file) {
        for (var i = 0; i < _files.length; i++) {
            if (_files[i].level == 0) {
                getNN(i);
            }
        }
    }
    else {
        getN(0);
    }
    for (var i = 0; i < _files.length; i++) {
        _files[i].N = _temp[i];
    }
}

function getNN(i){
    var f = _files.length;
    var v = _temp_n.length;
    if (v > 0) {
        p = _temp_n[_temp_n.length - 1];
    }
    else {
        p = 0;
    }
    if (i < f) {
        if (i == f - 1) {
            if (_files[i].num > 0 && _files[i].level == 0 && _files[i].parent == 0) {
                if (v == 1) {
                    _temp.push(_temp_n.pop());
                }
                else 
                    if (v > 1) {
                        for (var m = v; m > 0; m--) {
                            _temp.push(_temp_n.pop());
                        }
                    }
            }
            _temp.push(_files[i].num);
            if (v > 1) {
                for (var m = v; m > 0; m--) {
                    _temp.push(_temp_n.pop());
                }
            }
        }
        else {
            if (_files[i].level_files_num() == 0) {
                if (_files[i].level == 0 || _files[i].parent == p) {
                    if (_files[i].num > 0 && _files[i].level == 0 && _files[i].parent == 0) {
                        if (v == 1) {
                            _temp.push(_temp_n.pop());
                        }
                    }
                    _temp.push(_files[i].num);
                }
                else {
                    _temp.push(_temp_n.pop());
                    _temp.push(_files[i].num);
                }
            }
            else {
                if (_files[i].num > 0 && _files[i].level == 0 && _files[i].parent == 0 && v > 1) {
                    for (var m = v; m > 0; m--) {
                        _temp.push(_temp_n.pop());
                    }
                }
                if (_files[i].level > 0 && v > 1) {
                    if (_files[i].num > 0 && _files[i].level == 0) {
                        _temp.push(_temp_n.pop());
                    }
                }
                else 
                    if (_files[i].level == 0 && v == 1) {
                        _temp.push(_temp_n.pop());
                    }
                
                _temp_n.push(_files[i].num);
                for (var j = i + 1; j < f; j++) {
                    if (_temp.length < f) {
                        getNN(j);
                    }
                }
                _temp.push(_temp_n.pop());
            }
        }
    }
}

function getN(i){
    var f = _files.length;
    if (_temp_n.length > 0) {
        p = _temp_n[_temp_n.length - 1];
    }
    if (i < f) {
        if (_files[i].level_files_num() == 0) {
            if (_files.length == 1 || _files[i].parent == p) {
                _temp.push(_files[i].num);
            }
            else {
                _temp.push(_temp_n.pop());
                _temp.push(_files[i].num);
            }
        }
        else {
            if (_files[i].num > 0 && _files[i].level == 0) {
                _temp.push(_temp_n.pop());
            }
            _temp_n.push(_files[i].num);
            for (var j = i + 1; j < f; j++) {
                if (_temp.length < f) {
                    getN(j);
                }
            }
            _temp.push(_temp_n.pop());
        }
    }
}

function mergeFile(){
    var css_start = "", css_end = "";
    if (_set.inc) {
        for (var i = 0; i < _files.length; i++) {
            if (_files[i].level != 0) {
                _files[i].IO = false;
            }
        }
    }
    else {
        if (!_set.mode_choose_file) {
            for (var i = 0; i < _files.length; i++) {
                if (_files[i].level != 0) {
                    _files[i].IO = true;
                }
            }
        }
    }
    if ($("#ckbox_set_cr").is(":checked")) {
        _set.cr = "";
    }
    else {
        _set.cr = air.File.lineEnding;
    }
    if (!_set.mark) {
        css_start = "";
        css_end = "";
    }
    else {
        css_start = _set.cssStart + _set.cr;
        css_end = _set.cssEnd;
    }
    
    var temp_content = '@charset "' + charset_out + '";' + _set.cr + css_start;
    var _temp_files = [];
    sortN();
    if (_set.inc) {
        for (var t = 0; t < _files.length; t++) {
            if (!_set.inc_path) {
                var m = _files[t]._level_files_path;
                if (m && _files[t].IO) {
                    temp_content += m.join("");
                }
            }
            else {
                var m = _files[t]._level_files;
                var mm = [];
                var mmm = [];
                if (m && _files[t].IO) {
                    if (_set.site_path != "") {
                        for (i in m) {
                            mmm[i] = m[i].replace(_set.site_path, _set.site_path2);
                        }
                        if (_set.site_path_sg) {
                            for (i in m) {
                                mmm[i] = mmm[i].replace(/\\/g, "\/");
                            }
                        }
                        else {
                            for (i in m) {
                                mmm[i] = mmm[i].replace(/\//g, "\\");
                            }
                        }
                        for (i in m) {
                            mm[i] = '@import url("' + mmm[i] + '");';
                        }
                    }
                    else {
                        for (i in m) {
                            mm[i] = '@import url("' + m[i] + '");';
                        }
                    }
                    temp_content += mm.join("");
                }
            }
        }
        temp_content += _set.cr;
        for (var t = 0; t < _files.length; t++) {
            if (_files[t].IO) {
                _temp_files[t] = _files[t].ext_file();
            }
            else {
                _temp_files[t] = "";
            }
        }
    }
    else {
        for (var t = 0; t < _files.length; t++) {
            if (_files[_temp[t]].IO) {
                _temp_files[t] = _files[_temp[t]].ext_file();
            }
            else {
                _temp_files[t] = "";
            }
        }
    }
    temp_content += _temp_files.join("");
    temp_content += css_end;
    $("#file_content").text(temp_content);
}

function checkFileName(fileName){
    if (fileName.substr(0, 1) == "~") {
        $("#set_file_name").attr("disabled", "true");
        $("#set_time").attr("disabled", "true");
        $("#set_hzname").attr("disabled", "true");
        $("#pre_new_css_name").attr("disabled", "true");
        _fileName.bakfile = true;
        return true;
    }
    else {
        if (_fileName.enable) {
            $("#set_file_name").attr("checked", true);
            $("#set_time").attr("checked", false).attr("disabled", "true");
            $("#set_hzname").attr("value", "").attr("disabled", "true");
        }
        else {
            if (_fileName.suffix == "") {
                $("#set_time").attr("checked", true);
                $("#set_hzname").attr("value", "").attr("disabled", "true");
            }
            else {
                $("#set_time").attr("checked", false);
                $("#set_hzname").attr("value", getNum());
            }
        }
        $("#pre_new_css_name").attr("disabled", "");
        _fileName.bakfile = false;
        return false;
    }
}

function doSave(FilePath){
    var temp = $("#input_save").attr("disabled");
    
    if (!temp) {
        var TempSavePath = _files[0].path;
        if (FilePath) {
            TempSavePath = FilePath;
        }
        mergeFile();
        
        _set.other_path_inp = $("#other_path").val();
        if ($("#radio_other_path").is(":checked") && _set.other_path_inp) {
            _set.other_path = true;
        }
        else {
            _set.other_path = false;
            if ($("#radio_desktop_path").is(":checked")) {
                _set.desktop_path = true;
            }
            else {
                _set.desktop_path = false;
            }
        }
        
        var temp_name = $("#pre_new_css_name").attr("value");
        var note = $("#file_content").text();
        if (!_set.other_path) {
            save_path = getFilePath(TempSavePath);
        }
        else {
            save_path = $("#other_path").val() + pathType;
        }
        if (!checkFileType(temp_name)) {
            temp_name += ".css";
        }
        checkFileName(temp_name);
        if (_fileName.bakfile || _fileName.enable) {
            var tmp_name = temp_name.split(".");
            tmp_name.pop();
            var bak_path = save_path + "~" + tmp_name + "_" + getNum(1) + ".css";
            var path = "";
            try {
                var txt = '<span style="color:#009966;">文件已备份到';
                if (_set.desktop_path) {
                    path = temp_name;
                    txt += '桌面"';
                }
                else 
                    if (!_fileName.bakfile) {
                        path = save_path + temp_name;
                        if (!_set.other_path) {
                            txt += ' "';
                            var file = air.File.desktopDirectory.resolvePath(path);
                            var copyToFile = air.File.desktopDirectory.resolvePath(bak_path);
                            
                            file.copyTo(copyToFile, true);
                            txt += bak_path + ' " !<\/span>';
                            print(txt);
                        }
                    }
            } 
            catch (error) {
                var txt = '<span style="color:#D94A0B;">文件备份失败!<\/span>';
                print(txt);
            }
            try {
                var file = air.File.desktopDirectory.resolvePath(path);
                
                var temp_file = air.File.createTempFile();
                var stream = new air.FileStream();
                stream.open(temp_file, air.FileMode.WRITE);
                stream.writeMultiByte(note, charset_out);
                stream.close();
                
                temp_file.copyTo(file, true);
                
                var txt = '<span style="color:#009966;">文件已保存到 "';
                txt += path + ' " !<\/span>';
                print(txt);
            } 
            catch (error) {
                var txt = '<span style="color:#D94A0B;">文件保存失败!<\/span>';
                print(txt);
            }
        }
        else {
            try {
                var txt = '<span style="color:#009966;">文件已保存到';
                var path = "";
                if (_set.desktop_path) {
                    path = temp_name;
                    txt += '桌面"';
                }
                else {
                    path = save_path + temp_name;
                    txt += ' "';
                }
                var file = air.File.desktopDirectory.resolvePath(path);
                var stream = new air.FileStream();
                stream.open(file, air.FileMode.WRITE);
                stream.writeMultiByte(note, charset_out);
                stream.close();
                txt += path + ' " !<\/span>';
                print(txt);
            } 
            catch (error) {
                var txt = '<span style="color:#D94A0B;">文件保存失败!<\/span>';
                print(txt);
            }
        }
    }
    else {
        var txt = '<span style="color:#D94A0B;">当前没有文件!<\/span>';
        print(txt);
    }
}

function doSaveFile(event){
    var newFile = event.target;
    newFile.url = "" + event.target.url;
    $("#other_path").val(newFile.url);
    setPrefs();
}

function retset(){
    file_content = "";
    file_num = 0;
    file_content_num = 0;
    _files = [];
    _files_content = [];
    
    $("#file_content").text("");
    $("#div_list_file").html("");
    $("#input_save").attr("disabled", "true");
}

function getNum(set){
    if (_fileName.suffix == "" || set) {
        var today = new Date();
        var m, d;
        m = today.getMonth() + 1;
        if (m < 10) {
            m = "0" + m;
        }
        d = today.getDate();
        if (d < 10) {
            d = "0" + d;
        }
        return today.getFullYear() + "" + m + "" + d + "_" + today.toLocaleTimeString().replace(/:/g, "");
    }
    else {
        return _fileName.suffix;
    }
}

function preCSSname(fname){
    if (checkFileName(fname)) {
        var txt = '<span style="color:#D94A0B;">备份文件将以原文件名保存!<\/span>';
        print(txt);
        $("#new_css_name").hide();
        if (fname) {
            var temp_file = fname.split(".");
            var tmp = temp_file[0].substr(1);
            tmp = tmp.replace(/_\d{6,8}_\d{6}$/ig, "");
            $("#pre_new_css_name").attr("value", tmp + ".css");
        }
        else {
            fname = "";
            $("#pre_new_css_name").attr("value", "原文件名.css");
        }
    }
    else {
        if (!_fileName.enable) {
            $("#new_css_name").show();
            if (fname) {
                var temp_file = fname.split(".");
                var time = "_" + getNum();
                $("#pre_new_css_name").attr("value", temp_file[0] + time + ".css");
            }
            else {
                fname = "";
                $("#pre_new_css_name").attr("value", "原文件名+后缀.css");
            }
        }
        else {
            $("#new_css_name").hide();
            if (fname) {
                var temp_file = fname.split(".");
                $("#pre_new_css_name").attr("value", temp_file[0] + ".css");
            }
            else {
                fname = "";
                $("#pre_new_css_name").attr("value", "原文件名.css");
            }
        }
    }
}

function print(txt){
    var text = $("#print_info").html() + "<br \/>" + txt;
    $("#print_info").html(text);
}

function save_mode_1(){
    retset();
    save_mode(1);
}

function save_mode_2(){
    retset();
    save_mode(2);
}

function save_mode_3(){
    retset();
    save_mode(3);
}

function save_mode(nowMode){
    URL = 0;
    _set.mode_qfile = false;
    _set.mode_choose_file = false;
    _set.mode_batch = false;
    
    switch (nowMode) {
        case 1:
            _set.mode_qfile = true;
            _set.mode_batch = false;
            $("#mode_now").text("单文件（压缩单个文件，包含内链文件）");
            break;
        case 2:
            _set.mode_choose_file = true;
            _set.mode_qsave = false;
            _set.inc = false;
            _set.mode_batch = false;
            $("#mode_now").text("多文件（可将多个文件合并、压缩为一个文件，包含内链文件）");
            break;
        case 3:
            _set.mode_batch = true;
            _set.mode_qsave = true;
            $("#mode_now").text("文件列表处理（以单文件模式批量处理多个文件）");
            break;
        default:
            _set.mode_qfile = true;
            _set.mode_qsave = false;
            $("#mode_now").text("单文件处理");
    }
    
    $("#set_dir1").hide();
    $("#set_dir2").hide();
    if (_set.mode_batch) {
        $("#set_dir2").show();
        $("#input_save").attr("disabled", true);
    }
    else {
        $("#set_dir1").show();
    }
    
    
    preCSSname("");
    if (_set.mode_choose_file) {
        $("#mode_list_file").show();
        $("#set_import_path").hide();
        $("#mode_list_pro").show();
        $("#input_save").show();
        $("#input_reset").show();
        $("#input_save_list").show();
        $("#set_pic_op_div").show();
        $("#set_file_path_div").show();
        $("#input_batch_file").hide();
        $("#set_import_path_div").hide();
        $("#set_qsave_div").hide();
        $("#ckbox_set_qsave").attr("checked", false);
        $("#input_batch_file").hide();
        $("#ckbox_set_import_path").attr("checked", false);
        $("#input_set_import_path2").attr("value", "");
        $("#ckbox_set_cr").attr("disabled", "");
        $("#ckbox_set_se").attr("disabled", "");
        $("#ckbox_picpath_doit").attr("disabled", "");
        $("#ckbox_picpath_delver").attr("disabled", "");
        $("#radio_picpath_all").attr("disabled", "");
        $("#radio_picpath_list").attr("disabled", "");
        $("#textarea_picpath_list").attr("disabled", "");
        $("#save_set_pic_path").hide();
        $("#ckbox_set_import").attr("disabled", true);
        $("#pop_set input").attr("disabled", "");
    }
    else 
        if (_set.mode_batch) {
            $("#mode_list_file").hide();
            $("#mode_list_pro").hide();
            $("#set_import_path").hide();
            $("#input_save").hide();
            $("#input_reset").hide();
            $("#set_file_path_div").hide();
            $("#set_pic_op_div").hide();
            $("#input_batch_file").show();
            $("#set_qsave_div").hide();
            $("#ckbox_set_qsave").attr("checked", false);
            $("#set_import_path_div").hide();
            $("#input_save_list").hide();
            $("#ckbox_set_import").attr("disabled", true);
            $("#ckbox_set_cr").attr("disabled", true);
            $("#ckbox_set_se").attr("disabled", true);
            $("#ckbox_picpath_doit").attr("disabled", true);
            $("#ckbox_picpath_delver").attr("disabled", true);
            $("#radio_picpath_all").attr("disabled", true);
            $("#radio_picpath_list").attr("disabled", true);
            $("#textarea_picpath_list").attr("disabled", true);
            $("#save_set_pic_path").show();
            $("#pop_set input").attr("disabled", true);
            
            if ($("#ckbox_set_se").is(":checked")) {
                _set.mark = true;
            }
            else {
                _set.mark = false;
            }
            if ($("#ckbox_picpath_doit").is(":checked")) {
                _picVersion.enable = true;
            }
            else {
                _picVersion.enable = false;
            }
            if ($("#ckbox_set_cr").is(":checked")) {
                _set.cr = "";
            }
            else {
                _set.cr = air.File.lineEnding;
            }
        }
        else {
            $("#mode_list_file").show();
            $("#mode_list_pro").show();
            $("#input_save").show();
            $("#input_reset").show();
            $("#set_pic_op_div").show();
            $("#input_batch_file").hide();
            $("#set_file_path_div").show();
            $("#set_qsave_div").show();
            $("#input_save_list").show();
            $("#ckbox_set_import").attr("disabled", "");
            $("#ckbox_set_cr").attr("disabled", "");
            $("#ckbox_set_se").attr("disabled", "");
            $("#ckbox_picpath_doit").attr("disabled", "");
            $("#ckbox_picpath_delver").attr("disabled", "");
            $("#radio_picpath_all").attr("disabled", "");
            $("#radio_picpath_list").attr("disabled", "");
            $("#textarea_picpath_list").attr("disabled", "");
            $("#save_set_pic_path").show();
            $("#pop_set input").attr("disabled", "");
            
            if ($("#ckbox_set_se").is(":checked")) {
                _set.mark = true;
            }
            else {
                _set.mark = false;
            }
            if ($("#ckbox_set_import").is(":checked")) {
                _set.inc = true;
                $("#set_import_path").show();
                if ($("#ckbox_set_import_path").is(":checked")) {
                    _set.inc_path = true;
                    $("#set_import_path_div").show();
                }
                else {
                    _set.inc_path = false;
                    $("#set_import_path_div").hide();
                }
            }
            else {
                _set.inc = false;
                $("#set_import_path").hide();
            }
            if ($("#ckbox_picpath_doit").is(":checked")) {
                _picVersion.enable = true;
            }
            else {
                _picVersion.enable = false;
            }
            if ($("#ckbox_set_cr").is(":checked")) {
                _set.cr = "";
            }
            else {
                _set.cr = air.File.lineEnding;
            }
        }
    $("#print_info").html('');
}

//打开窗口
function doWindow(page, info){
    var login = window.open(page, null, info);
}

function menuOpenWin(){
    var op = arguments[0].target.data.item.name;
    
    switch (op) {
        case "about":
            doWindow('about.html', 'width=360,height=300,scrollbars=yes');
            break;
        default:
            break;
    }
}

function doSaveList(){
    var temp = $("#input_save").attr("disabled");
    if (!temp) {
        var docsDir = air.File.documentsDirectory;
        try {
            docsDir.browseForSave("Save Files List");
            docsDir.addEventListener(air.Event.SELECT, SaveList);
        } 
        catch (error) {
            air.trace("Failed:", error.message)
        }
    }
    else {
        var txt = '<span style="color:#D94A0B;">没有文件可保存!<\/span>';
        print(txt);
    }
}

function menuOpenList(){
    $("#floatBoxBg").show();
    $("#floatBoxBg").animate({
        opacity: "0.5"
    }, "normal");
    $("#pop_set").hide();
    $("#pop_save").show();
    $("#pop_save").css("margin-left", "-85px");
}

function menuSet(){
    $("#floatBoxBg").show();
    $("#floatBoxBg").animate({
        opacity: "0.5"
    }, "normal");
    $("#pop_save").hide();
    $("#pop_set").show();
    $("#pop_set").css("margin-left", "-175px");
    
    
    $("#set_cssStart").attr("value", _set.cssStart);
    $("#set_cssEnd").attr("value", _set.cssEnd);
    if (_fileName.enable) {
        $("#set_file_name").attr("checked", true);
        $("#set_time").attr("checked", false).attr("disabled", "true");
        $("#set_hzname").attr("value", "").attr("disabled", "true");
    }
    else {
        if (_fileName.suffix == "") {
            $("#set_time").attr("checked", true);
            $("#set_hzname").attr("value", "").attr("disabled", "true");
        }
        else {
            $("#set_time").attr("checked", false);
            $("#set_hzname").attr("value", getNum());
        }
    }
}

function setPicVet(){
    if (!_picVersion.all) {
        var temp = $("#textarea_picpath_list").val();
        if (temp != "") {
            temp = temp.replace(/[\f\n\r\t\v]* *; *[\f\n\r\t\v]*/ig, ";");
            temp = temp.replace(/;$/ig, "");
            _picVersion.list = temp.split(";");
        }
        else {
            _picVersion.list = [];
            _picVersion.all = true;
        }
    }
}

$(function(){
    $("#main_div").hide();
    $("#hint_div").hide();
    retset();
    save_mode(1);
    
    var menu = air.ui.Menu.createFromJSON("lib/menus/menu.js");
    air.ui.Menu.setAsMenu(menu);
    
    file_css = air.File.applicationDirectory;
    
    if (_set.mode_choose_file) {
        $("#mode_list_file").show();
    }
    else {
        $("#mode_list_file").hide();
    }
    
    $("#input_save").click(function(){
        doSave();
    })
    $("#ckbox_set_semicolon").click(function(){
        if ($(this).is(":checked")) {
            _set.semicolon = "";
        }
        else {
            _set.semicolon = ";";
        }
        mergeFile();
        setPrefs();
    })
    $("#ckbox_set_se").click(function(){
        if ($(this).is(":checked")) {
            _set.mark = true;
        }
        else {
            _set.mark = false;
        }
        mergeFile();
        setPrefs();
    })
    $("#ckbox_set_cr").click(function(){
        if ($(this).is(":checked")) {
            _set.cr = "";
        }
        else {
            _set.cr = air.File.lineEnding;
        }
        mergeFile();
        setPrefs();
    })
    $("#radio_other_path").click(function(){
        _set.other_path = true;
        _set.desktop_path = false;
        $("#set_other_path_div").show();
        if ($("#other_path").val() == "") {
            var docsDir = air.File.documentsDirectory;
            try {
                docsDir.browseForDirectory("Save As");
                docsDir.addEventListener(air.Event.SELECT, doSaveFile);
            } 
            catch (error) {
                air.trace("Failed:", error.message);
            }
        }
    })
    $("#radio_dir_path").click(function(){
        _set.other_path = false;
        _set.desktop_path = false;
        $("#set_other_path_div").hide();
        setPrefs();
    })
    $("#radio_desktop_path").click(function(){
        _set.other_path = false;
        _set.desktop_path = true;
        $("#set_other_path_div").hide();
        setPrefs();
    })
    $("#input_reset").click(function(){
        retset();
        $("#print_info").html('');
        preCSSname("");
    })
    $("#input_batch_file").click(function(){
        doBrowseXml();
    })
    $("#check_updates").click(function(){
        checkUpdates();
    })
    $("#set_other_path").click(function(){
        var docsDir = air.File.documentsDirectory;
        try {
            docsDir.browseForDirectory("Save As");
            docsDir.addEventListener(air.Event.SELECT, doSaveFile);
        } 
        catch (error) {
            air.trace("Failed:", error.message);
        }
    })
    $("#set_in_charset_utf8").click(function(){
        if ($(this).is(":checked")) {
            charset_in = "utf-8";
        }
    })
    $("#set_in_charset_gb2312").click(function(){
        if ($(this).is(":checked")) {
            charset_in = "gb2312";
        }
    })
    $("#set_out_charset_utf8").click(function(){
        if ($(this).is(":checked")) {
            charset_out = "utf-8";
        }
    })
    $("#set_out_charset_gb2312").click(function(){
        if ($(this).is(":checked")) {
            charset_out = "gb2312";
        }
    })
    $("#ckbox_set_import_path").click(function(){
        if ($(this).is(":checked")) {
            _set.inc_path = true;
            $("#set_import_path_div").show();
            _set.site_path = $("#input_set_import_path").val();
            _set.site_path2 = $("#input_set_import_path2").val();
        }
        else {
            _set.inc_path = false;
            $("#set_import_path_div").hide();
            _set.site_path = "";
        }
        mergeFile();
        setPrefs();
    })
    $("#save_set_import_path").click(function(){
        _set.site_path = $("#input_set_import_path").val();
        _set.site_path2 = $("#input_set_import_path2").val();
        if ($("#ckbox_set_import_path_sg").is(":checked")) {
            _set.site_path_sg = true;
        }
        else {
            _set.site_path_sg = false;
        }
        mergeFile();
        setPrefs();
    })
    $("#ckbox_picpath_doit").click(function(){
        _picVersion.delver = false;
        if ($(this).is(":checked")) {
            $("#set_pic_path_div").show();
            _picVersion.enable = true;
            setPicVet();
        }
        else {
            $("#set_pic_path_div").hide();
            _picVersion.enable = false;
            $("#ckbox_picpath_delver").attr("checked", false);
        }
        mergeFile();
        setPrefs();
    })
    $("#ckbox_picpath_delver").click(function(){
        if ($(this).is(":checked")) {
            _picVersion.delver = true;
        }
        else {
            _picVersion.delver = false;
        }
        setPicVet();
        mergeFile();
        setPrefs();
    })
    $("#save_set_pic_path").click(function(){
        setPicVet();
        mergeFile();
        setPrefs();
    })
    $("#new_pic_vet").click(function(){
        _picVersion.ver = getNum(1);
        mergeFile();
    })
    $("#radio_picpath_all").click(function(){
        if ($(this).is(":checked")) {
            _picVersion.all = true;
            $("#textarea_picpath_list").hide();
            $("#save_set_pic_path").hide();
        }
        else {
            _picVersion.all = false;
        }
        mergeFile();
    })
    $("#radio_picpath_list").click(function(){
        if ($(this).is(":checked")) {
            _picVersion.all = false;
            $("#textarea_picpath_list").show();
            $("#save_set_pic_path").show();
        }
        else {
            _picVersion.all = true;
        }
    })
    $("#ckbox_set_import").click(function(){
        if ($(this).is(":checked")) {
            _set.inc = true;
            $("#set_import_path").show();
            $("#div_list_file li input[level!=0]").attr("checked", false);
            for (var i = 0; i < _files.length; i++) {
                if (_files[i].level != 0) {
                    _files[i].IO = false;
                }
            }
        }
        else {
            _set.inc = false;
            $("#set_import_path").hide();
            $("#set_import_path_div").hide();
            $("#ckbox_set_import_path").attr("checked", false);
            $("#div_list_file li input").attr("checked", true);
            for (var i = 0; i < _files.length; i++) {
                if (_files[i].level != 0) {
                    _files[i].IO = true;
                }
            }
        }
        mergeFile();
        setPrefs();
    })
    $("#ckbox_set_qsave").click(function(){
        $("#set_dir1").show();
        $("#set_dir2").hide();
        if ($(this).is(":checked")) {
            _set.mode_qsave = true;
        }
        else {
            _set.mode_qsave = false;
        }
    })
    $("#new_css_name").click(function(){
        preCSSname(fname);
    })
    $("#pop_save_batch_no").click(function(){
        _set.batch = false;
        $("#floatBoxBg").hide();
        $("#pop_save").hide();
        doCompleteXml();
    })
    $("#pop_save_batch_yes").click(function(){
        _set.batch = true;
        $("#floatBoxBg").hide();
        $("#pop_save").hide();
        doCompleteXml();
    })
    $("#pop_set_ok").click(function(){
        _set.cssStart = $("#set_cssStart").val();
        _set.cssEnd = $("#set_cssEnd").val();
        if ($("#set_time").is(":checked")) {
            _fileName.suffix = "";
        }
        else {
            _fileName.suffix = $("#set_hzname").val();
        }
        if ($("#set_file_name").is(":checked")) {
            _fileName.suffix = "";
        }
        else {
            _fileName.suffix = $("#set_hzname").val();
        }
        mergeFile();
        preCSSname(fname);
        $("#floatBoxBg").hide();
        $("#pop_set").hide();
        setPrefs();
    })
    $("#set_time").click(function(){
        if ($(this).is(":checked")) {
            $("#set_hzname").attr("value", "").attr("disabled", "true");
        }
        else {
            $("#set_hzname").attr("disabled", "");
        }
    })
    $("#set_file_name").click(function(){
        if ($(this).is(":checked")) {
            _fileName.enable = true;
            $("#set_time").attr("checked", false).attr("disabled", "true");
        }
        else {
            _fileName.enable = false;
            $("#set_time").attr("checked", true).attr("disabled", "");
        }
        $("#set_hzname").attr("value", "").attr("disabled", "true");
    })
    $("#input_set").click(function(){
        menuSet();
    })
    getPrefs();
    appLoad();
})


function appLoad(){
    air.NativeApplication.nativeApplication.addEventListener(air.InvokeEvent.INVOKE, onInvoke);
}

function onInvoke(invokeEvent){
    retset();
    save_mode(1);
    getPrefs();
    if (invokeEvent.arguments.length > 0) {
        var openFile = [], temp_q = _set, invokeTemp = invokeEvent.arguments.toString(), invokeNum = [], ofn = 0;
        invokeNum = invokeTemp.split(",");
        if (invokeNum.length > 1) {
            for (var n = 0; n < invokeNum.length; n++) {
                if (invokeNum[n].substr(0, 1) == "-") {
                    switch (invokeNum[n]) {
                        case "-q":
                            _set.mode_qsave = true;
                            $("#ckbox_set_qsave").attr("checked", true);
                            break;
                        case "-nq":
                            _set.mode_qsave = false;
                            $("#ckbox_set_qsave").attr("checked", false);
                            break;
                        case "-n":
                            _fileName.enable = true;
                            $("#set_file_name").attr("checked", true);
                            $("#set_time").attr("checked", false).attr("disabled", "true");
                            break;
                        case "-nn":
                            _fileName.enable = false;
                            $("#set_file_name").attr("checked", false);
                            $("#set_time").attr("checked", true).attr("disabled", "");
                            break;
                        case "-i":
                            _set.inc = true;
                            $("#ckbox_set_import").attr("checked", true);
                            break;
                        case "-ni":
                            _set.inc = false;
                            $("#ckbox_set_import").attr("checked", false);
                            break;
                        default:
                            break;
                    }
                }
                else {
                    openFile[ofn++] = invokeNum[n];
                }
            }
            if (openFile.length > 0) {
                for (var t = 0; t < openFile.length; t++) {
                    if (checkFileType(openFile[t])) {
                        retset();
                        _files[file_num] = new file();
                        var txt = '读取" ' + openFile[t] + ' "...';
                        print(txt);
                        readFile(openFile[t]);
                        fname = _files[0].name;
                        preCSSname(fname);
                        mergeFile();
                        $("#input_save").attr("disabled", "");
                        if (_set.mode_qsave) {
                            doSave();
                        }
                    }
                }
            }
            ofn = 0;
        }
        else {
            openFile[0] = invokeTemp;
            if (checkFileType(openFile[0])) {
                _files[file_num] = new file();
                var txt = '读取" ' + openFile + ' "...';
                print(txt);
                readFile(openFile[0]);
                fname = _files[0].name;
                preCSSname(fname);
                mergeFile();
                $("#input_save").attr("disabled", "");
                if (_set.mode_qsave) {
                    doSave();
                }
            }
        }
        
        _set = temp_q;
    }
}

function addOSMenu(){
    if (os[0] == "Windows") {
        try {
            var appDir = air.File.applicationDirectory.nativePath;
            appDir = appDir.replace(/\\/g, "\\\\");
            var note = 'Windows Registry Editor Version 5.00\n\n';
            note += '[HKEY_CLASSES_ROOT\\css_auto_file\\shell\\用 mergeCSS 压缩]\n\n';
            note += '[HKEY_CLASSES_ROOT\\css_auto_file\\shell\\用 mergeCSS 压缩\\Command]\n';
            note += '@="' + appDir + '\\\\mergeCSS.exe %1"\n\n';
            note += '[HKEY_CLASSES_ROOT\\CSSFile\\shell\\用 mergeCSS 压缩]\n\n';
            note += '[HKEY_CLASSES_ROOT\\CSSFile\\shell\\用 mergeCSS 压缩\\Command]\n';
            note += '@="' + appDir + '\\\\mergeCSS.exe %1"';
            
            var file = air.File.desktopDirectory.resolvePath("添加mergeCSS到系统右键菜单.reg");
            var stream = new air.FileStream();
            stream.open(file, air.FileMode.WRITE);
            stream.writeMultiByte(note, air.File.systemCharset);
            stream.close();
            alert("“添加mergeCSS到右键菜单.reg”已保存到桌面，请运行该文件完成操作。");
        } 
        catch (error) {
            alert("操作失败。");
        }
    }
    else {
        alert("本操作只适用于Windows系统。")
    }
}

function delOSMenu(){
    if (os[0] == "Windows") {
        try {
            var appDir = air.File.applicationDirectory.nativePath;
            appDir = appDir.replace(/\\/g, "\\\\");
            var note = 'Windows Registry Editor Version 5.00\n\n';
            note += '[-HKEY_CLASSES_ROOT\\' + file_type() + '\\shell\\用 mergeCSS 压缩]\n\n';
            note += '[-HKEY_CLASSES_ROOT\\' + file_type() + '\\shell\\用 mergeCSS 压缩\\Command]\n';
            note += '@="' + appDir + '\\\\mergeCSS.exe %1"\n\n';
            note += '[-HKEY_CLASSES_ROOT\\' + file_type() + '\\shell\\用 mergeCSS 压缩]\n\n';
            note += '[-HKEY_CLASSES_ROOT\\' + file_type() + '\\shell\\用 mergeCSS 压缩\\Command]\n';
            note += '@="' + appDir + '\\\\mergeCSS.exe %1"';
            
            var file = air.File.desktopDirectory.resolvePath("卸载mergeCSS系统右键菜单.reg");
            var stream = new air.FileStream();
            stream.open(file, air.FileMode.WRITE);
            stream.writeMultiByte(note, air.File.systemCharset);
            stream.close();
            alert("“卸载mergeCSS系统右键菜单.reg”已保存到桌面，请运行该文件完成操作。");
        } 
        catch (error) {
            alert("操作失败。");
        }
    }
    else {
        alert("本操作只适用于Windows系统。")
    }
}
