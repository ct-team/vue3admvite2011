# 说明

## 多页面

通过pages 子文件夹的方式确定其他页面

```
//主页面
pages/index.html
pages/main.ts

//其他页面 two.html

pages/two/index.html
pages/two/main.ts

```

## 公共文件

页面直接根目录调用

```
//直接使用
<head>
 <script src="/a.js"></script>
</head>
```

获取 publicpath

```
//html 使用 %BASE_URL%
<link rel="icon" href="%BASE_URL%favicon.ico" />

//js
import.meta.env.BASE_URL


```
