[{
    label: "文件",
    items: [{
        label: "打开样式文件",
        keyEquivalent: "O",
        onSelect: doBrowseFile
    }, {
        label: "保存样式文件",
        keyEquivalent: "S",
        onSelect: doSave
    }]
}, {
    label: "处理模式",
    items: [{
        label: "单文件",
        keyEquivalent: "1",
        onSelect: save_mode_1
    }, {
        label: "多文件",
        keyEquivalent: "2",
        onSelect: save_mode_2
    }, {
        label: "文件列表处理",
        keyEquivalent: "3",
        onSelect: save_mode_3
    }]
}, {
    label: "操作",
    items: [{
        label: "清空当前文件",
        keyEquivalent: "R",
        onSelect: retset
    }, {
        type: "separator"
    }, {
        label: "自定义设置",
        keyEquivalent: "C",
        shiftKey: true,
        onSelect: menuSet
    }]
}, {
    label: "文件列表",
    items: [{
        label: "读取文件列表",
        keyEquivalent: "O",
        shiftKey: true,
        onSelect: doBrowseXml
    }, {
        label: "保存当前文件为列表",
        keyEquivalent: "S",
        shiftKey: true,
        onSelect: doSaveList
    }]
}, {
    label: "其它",
    items: [{
        label: "添加到系统右键菜单",
        onSelect: addOSMenu
    },{
        label: "卸载系统右键菜单",
        onSelect: delOSMenu
    },{
        type: "separator"
    }, {
        label: "文件列表编辑器",
        name: "filelist",
        onSelect: menuOpenWin
    },{
        type: "separator"
    },{
        label: "检查更新...",
        onSelect: checkUpdates
    }, {
        label: "关于...",
        name: "about",
        onSelect: menuOpenWin
    }]
}]
