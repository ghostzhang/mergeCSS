/**
 * @author ghostzhang
 */
var file_xml = null;

function doBrowseXml(){
    var filters = new runtime.Array(new air.FileFilter('XML(*.xml)', '*.xml'));
    file_xml.browseForOpen('Select an XML', filters);
}

function doSelectXml(e){
    $("#print_info").html('');
    if (_set.mode_batch) {
        _set.batch = true;
        doCompleteXml();
    }
    else {
        menuOpenList();
    }
}

function checkType(path){
    path = path + "";
    var temp_type = "xml,XML";
    if (path.substr(0, 4) != "http") {
        var temp_file = temp.split(".");
        temp_file = temp_file.pop();
        if (temp_type.search(temp_file) >= 0) {
            return path;
        }
        else {
            return path + ".xml";
        }
    }
}

function SaveList(event){
    var newFile = event.target;
    var cr = "";
    if ($("#ckbox_set_cr").attr("checked")) {
        cr = true;
    }
    else {
        cr = false;
    }
    newFile.url = "" + checkType(event.target.url) + "";
    
    var stream = new air.FileStream();
    stream.open(newFile, air.FileMode.WRITE);
    
    var note = '<?xml version="1.0" encoding="utf-8"\?>' +
    _set.cr +
    '<mergeCSS>' +
    '<version>1.9</version>' +
    _set.cr +
    '<set>' +
    _set.cr +
    '<mark>' +
    _set.mark +
    '</mark>' +
    '<charset_in>' +
    charset_in +
    '</charset_in>' +
    '<charset_out>' +
    charset_out +
    '</charset_out>' +
    _set.cr +
    '<incImport>' +
    _set.inc +
    '</incImport>' +
    _set.cr +
    '<mergeLines>' +
    cr +
    '</mergeLines>' +
    _set.cr +
    '<cssStart>' +
    _set.cssStart +
    '</cssStart>' +
    _set.cr +
    '<cssEnd>' +
    _set.cssEnd +
    '</cssEnd>' +
    _set.cr +
    '<picVersion>' +
    _set.cr +
    '<enable>' +
    _picVersion.enable +
    '</enable>' +
    _set.cr +
    '<all>' +
    _picVersion.all +
    '</all>' +
    _set.cr +
    '<del>' +
    _picVersion.delver +
    '</del>' +
    _set.cr +
    '<list>' +
    _picVersion.list.join(";") +
    '</list>' +
    _set.cr +
    '</picVersion>' +
    _set.cr +
    '<fileName>' +
    _set.cr +
    '<enable>' +
    _fileName.enable +
    '</enable>' +
    _set.cr +
    '<suffix>' +
    _fileName.suffix +
    '</suffix>' +
    _set.cr +
    '</fileName>' +
    _set.cr +
    '</set>' +
    _set.cr +
    '<pathList>' +
    _set.cr;
    
    for (var n = 0; n < _files.length; n++) {
        if (_files[n].level == 0) {
            note += '<path charset_in="' + charset_in + '" charset_out="' + charset_out + '">' + _files[n].path + '</path>' + _set.cr;
        }
    }
    
    note += '</pathList></mergeCSS>';
    
    stream.writeUTFBytes(note);
    stream.close();
    var txt = '<span style="color:#009966;">文件已保存到" ' + newFile.url + ' "!<\/span>';
    print(txt);
}

//读取设置
function doCompleteXml(){
    var txt = '<span>读取" ' + file_xml.nativePath + ' " !<\/span>';
    print(txt);
    var xml = new XMLHttpRequest();
    
    xml.onreadystatechange = function(){
        if (xml.readyState == 4) {
            try {
                var xml_set = null, pathlist = null, version = 0, batch = null, oneline = null, mark = null, inc = null, file_set = null, file_suffix = null, file_enable = null, pic_set = null, pic_enable = null, pic_all = null, pic_del = null, pic_list = null, charset_in_temp = "utf-8", charset_out_temp = "utf-8";
                
                xml_set = xml.responseXML.documentElement.getElementsByTagName('set');
                pic_set = xml.responseXML.documentElement.getElementsByTagName('set')[0].getElementsByTagName('picVersion');
                file_set = xml.responseXML.documentElement.getElementsByTagName('set')[0].getElementsByTagName('fileName');
                pathlist = xml.responseXML.documentElement.getElementsByTagName('pathList')[0].getElementsByTagName('path');
                version = xml.responseXML.documentElement.getElementsByTagName('version')[0].textContent;
                
                if (_set.batch) {
                    save_mode(3);
                    _set.mode_qsave = true;
                }
                else {
                    save_mode(2);
                }
                
                mark = xml_set[0].getElementsByTagName('mark')[0].textContent;
                inc = xml_set[0].getElementsByTagName('incImport')[0].textContent;
                oneline = xml_set[0].getElementsByTagName('mergeLines')[0].textContent;
                if (version > 1.7) {
                    charset_in_temp = xml_set[0].getElementsByTagName('charset_in')[0].textContent;
                    if (charset_in_temp == "") {
                        charset_in_temp = "utf-8";
                    }
                    charset_out_temp = xml_set[0].getElementsByTagName('charset_out')[0].textContent;
                    if (charset_out_temp == "") {
                        charset_out_temp = "utf-8";
                    }
                }
                
                file_enable = file_set[0].getElementsByTagName('enable')[0].textContent;
                if (file_enable == "true") {
                    _fileName.enable = true;
                    $("#set_file_name").attr("checked", true);
                    $("#set_time").attr("checked", false).attr("disabled", "true");
                    $("#set_hzname").attr("value", "").attr("disabled", "true");
                }
                else {
                    _fileName.enable = false;
                    file_suffix = file_set[0].getElementsByTagName('suffix')[0].textContent;
                    if (file_suffix == "") {
                        _fileName.suffix = "";
                        $("#set_time").attr("checked", true);
                        $("#set_hzname").attr("value", "").attr("disabled", "true");
                    }
                    else {
                        _fileName.suffix = file_suffix;
                        $("#set_time").attr("checked", false);
                        $("#set_hzname").attr("value", file_suffix);
                    }
                }
                
                pic_enable = pic_set[0].getElementsByTagName('enable')[0].textContent;
                if (pic_enable == "true") {
                    _picVersion.enable = true;
                    $("#ckbox_picpath_doit").attr("checked", true);
                    $("#set_pic_path_div").show();
                    pic_all = pic_set[0].getElementsByTagName('all')[0].textContent;
                    pic_del = pic_set[0].getElementsByTagName('del')[0].textContent;
                    if (pic_all == "false") {
                        $("#radio_picpath_list").attr("checked", true);
                        $("#textarea_picpath_list").show();
                        pic_list = pic_set[0].getElementsByTagName('list')[0].textContent;
                        $("#textarea_picpath_list").text(pic_list);
                    }
                    else {
                        $("#radio_picpath_all").attr("checked", true);
                        $("#textarea_picpath_list").hide();
                    }
                    if (pic_del == "true") {
                        _picVersion.delver = true;
                        $("#ckbox_picpath_delver").attr("checked", true);
                    }
                    else {
                        _picVersion.delver = false;
                        $("#ckbox_picpath_delver").attr("checked", false);
                    }
                    setPicVet();
                }
                else {
                    _picVersion.delver = false;
                    _picVersion.enable = false;
                    $("#ckbox_picpath_doit").attr("checked", false);
                    $("#ckbox_picpath_delver").attr("checked", false);
                    $("#set_pic_path_div").hide();
                }
                
                if (mark == "true") {
                    _set.mark = true;
                    $("#ckbox_set_se").attr("checked", true);
                    _set.cssStart = xml_set[0].getElementsByTagName('cssStart')[0].textContent;
                    _set.cssEnd = xml_set[0].getElementsByTagName('cssEnd')[0].textContent;
                }
                else {
                    _set.mark = false;
                    $("#ckbox_set_se").attr("checked", false);
                }
                if (_set.batch && inc == "true") {
                    _set.inc = true;
                    $("#ckbox_set_import").attr("checked", true);
                }
                else {
                    _set.inc = false;
                    $("#ckbox_set_import").attr("checked", false);
                }
                if (oneline == "true") {
                    _set.cr = "";
                    $("#ckbox_set_cr").attr("checked", true);
                }
                else {
                    _set.cr = air.File.lineEnding;
                    $("#ckbox_set_cr").attr("checked", false);
                }
                if (version > 1.7) {
                    var temp_charset_in = charset_in;
                    var temp_charset_out = charset_out;
                    for (var c = 0; c < pathlist.length; c++) {
                        URL = 0;
                        var temp_file = pathlist[c].textContent;
                        charset_in = pathlist[c].getAttribute("charset_in");
                        charset_out = pathlist[c].getAttribute("charset_out");
                        if (!charset_in) {
                            charset_in = charset_in_temp;
                        }
                        if (!charset_out) {
                            charset_out = charset_out_temp;
                        }
                        if (checkFileType(temp_file)) {
                            if (_set.batch) {
                                retset();
                            }
                            _files[file_num] = new file();
                            readFile(temp_file);
                            fname = _files[0].name;
                            preCSSname(fname);
                            file_list();
                            mergeFile();
                            $("#input_save").attr("disabled", "");
                            if (URL == 0 && _set.mode_qsave) {
                                doSave();
                            }
                        }
                    }
                    charset_in = temp_charset_in;
                    charset_out = temp_charset_out;
                }
                else 
                    if (version > 0) {
                        var temp_charset = charset_out;
                        for (var c = 0; c < pathlist.length; c++) {
                            URL = 0;
                            var temp_file = pathlist[c].textContent;
                            charset = pathlist[c].getAttribute("charset");
                            if (!charset) {
                                charset_out = "utf-8";
                            }
                            if (checkFileType(temp_file)) {
                                if (_set.batch) {
                                    retset();
                                }
                                if (checkFileType(temp_file)) {
                                    _files[file_num] = new file();
                                    readFile(temp_file);
                                    fname = _files[0].name;
                                    preCSSname(fname);
                                    file_list();
                                    mergeFile();
                                    $("#input_save").attr("disabled", "");
                                    if (URL == 0 && _set.mode_qsave) {
                                        doSave();
                                    }
                                }
                            }
                        }
                        charset_out = temp_charset;
                    }
            } 
            catch (error) {
                var txt = '<span style="color:#D94A0B;">文件格式错误!<\/span>';
                print(txt);
            }
        }
    }
    xml.open('GET', file_xml.url, true);
    xml.send(null);
}


$(function(){
    file_xml = air.File.applicationDirectory;
    file_xml.addEventListener(air.Event.SELECT, doSelectXml);
})
