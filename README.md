# 样式文件合并工具 mergeCSS

## 简介

合并、压缩样式文件

© 2009 by GhostZhang

## 版本信息

mergeCSS v1.9.20130116

* (add)图片版本控制支持IE滤镜AlphaImageLoader

mergeCSS v1.9.20121023

* (fix)content:""}时引号处理的问题

mergeCSS v1.9.20110301

* (fix)background:#000 url();时图片版本添加不了图片版本

mergeCSS v1.9.20101222

* (fix)图片版本undefined

mergeCSS v1.9.20100904

* (fix)“Ctrl+S”失效

mergeCSS v1.9.20100902

* (fix)文件名中有“.”时文件类型判断出错
* (add)自动保存设置
* (add)快速保存支持其它目录

mergeCSS v1.9.20100831

* (add)“去除最后一个分号”选项
* (add)保存到“其它目录”支持直接输入路径

mergeCSS v1.9.20100719

* (add)保存文件名可修改
* (add)时间后缀中的日期输出为8位

mergeCSS v1.9.20100601

* (fix)多文件模式第一个文件无法保存
* (add)支持@import "xxx.css"格式
* (add)命令行参数 “mergeCSS 样式路径 -i -n -q”，-i:保留外链；-n:原文件名保存；-q:快速保存。

mergeCSS v1.9.20100507

* (fix)保存方式调整

mergeCSS v1.9.20100423

* (fix)文件列表保存、读取失败
* (add)修改了“原文件名保存”的实现方式
* (add)支持命令行操作带参数执行
* (add)文件列表中可设定个文件的输入输出编码

mergeCSS v1.8.20100414

* (fix)windows下加入右键菜单失效

mergeCSS v1.8.20100408

* (add)针对无签名UTF8和GB2312提供输入编码的选择

mergeCSS v1.8.201003246

* (fix)保存到桌面选项无效
* (fix)备份文件的文件名不能还原

mergeCSS v1.8.20100324

(fix0px替换问题

mergeCSS v1.8.20100321

* (fix)mac下备份文件的文件名不能还原
* (add)支持background定义中的url('...')
* (add)去除值为0的单位

mergeCSS v1.8.20100205

* (fix)content不为空时压缩结果错误

mergeCSS v1.8.20100204

* (fix)content为空时被误认为错误

mergeCSS v1.8.20100128

* (add)简单的纠错

mergeCSS v1.8.20091226

* (fix)更新指定图片版本时未去掉原版本
* (add)自动识别文件编码
* (add)输出编码选择
* (add)生成添加、卸载系统右键菜单注册文件
* (add)批处理模式添加输出编码支持

mergeCSS v1.8.20091225

* (fix)import文件未预加载
* (add)优化路径检查算法
* (add)程序图标
* (add)关于

mergeCSS v1.8.20091220

* (fix)文件列表设置缺失

mergeCSS v1.8.20091219

* (fix)单文件模式下不可选保存目录
* (add)以原文件名保存时备份文件增加版本
* (add)压缩备份文件时以原文件名保存

mergeCSS v1.8.20091209

* (fix)各模式切换时保存方式出现混乱
* (fix)保存样式文件出错
* (add)添加到windows系统右键菜单

mergeCSS v1.8.20091208

* (fix)无法以多文件模式处理文件
* (add)单文件模式，使用“快速保存”时支持多个文件批量处理
* (add)关联到样式文件类型

mergeCSS v1.8.20091207

* (fix)快速保存失效
* (add)将“单文件快速保存”模式并入“单文件”模式中
* (add)单文件模式默认选中“保留import”

mergeCSS v1.8.20091204

* (add)修改处理模式的切换方式，添加快捷键
* (add)修改另存到其它目录时的选择对话框

mergeCSS v1.8.20091203

* (fix)压缩为一行时图片版本控制引起文件内容被截断
* (add)批量处理时支持原文件名保存

mergeCSS v1.8.20091202

* (add)以同文件名生成文件，备份原文件

mergeCSS v1.8.20091130

* (add)批量处理时加入图片版本处理
* (add)批处理模式下设置改为只读

mergeCSS v1.8.20091127

* (add)图片版本号更新
* (add)只更新部分图片的版本号
* (add)去除已有版本号

mergeCSS v1.8.20091126

* (add)图片路径加版本号

mergeCSS v1.8.20091120

* (add)批处理时使用文件列表中的设置
* (add)保存包含非本地文件优化

mergeCSS v1.8.20091118

* (fix)类名中换行压缩为空格
* (fix)读取非本地文件时预览需刷新
* (fix)保存时文件名重复
* (add)非本地文件的操作提示

mergeCSS v1.7.20091107

* (fix)模式切换时部分选项未初始化
* (add)批量处理模式
* (add)自定义后缀名
* (add)自定义验证标记
* (add)打开文件列表时确认处理方式

mergeCSS v1.6.20091104

* (fix)多文件模式下文件类型无判断
* (add)读取文件列表
* (add)保存文件列表
* (add)界面调整
* (add)快捷键

mergeCSS v1.5.20091103

* (add)import样式路径替换
* (add)样式自动预览

mergeCSS v1.5.1 2009-10-25

* (fix)文件名预览显示不同步
* (add)界面调整

mergeCSS v1.5 2009-10-24

* (fix)不同平台间的路径兼容问题
* (add)文件名预览
* (add)在线更新

mergeCSS v1.4 2009-9-29

* (fix)多文件选择取消合并时文件不对
* (fix)import不能为“http://”开头
* (add)多文件模式下禁用“保留内链文件”功能
* (add)读取网络上的文件
* (add)文件内链路径替换

mergeCSS v1.3 2009-9-27

* (add)单文件与多文件处理开关

mergeCSS v1.2 2009-9-24

* (add)压缩成一行的选项
* (add)增加“单文件、多文件、单文件快速保存”三种处理模式

mergeCSS v1.1 2009-9-13

* (add)选择需要合并的文件
* (add)选择是否保留import文件
* (add)选择是否转换import路径
* (add)保存到桌面、文件目录或自选目录

mergeCSS v1.0 2009-8-25

* (add)拖动添加文件
* (add)文件类型检查
* (add)合并样式文件(无外链)
* (add)压缩样式文件
* (add)保存结果文件
