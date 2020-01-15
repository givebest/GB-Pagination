# GB-Pagination
----

## 简介

Node.js 服务端渲染（SSR）分页。

## 使用

### 普通分页

```js
// 引入
const gbPagination = require('gb-pagination.js')

// 配置
gbPagination.init({
    total: 101, // 总记录数
    curPage: 1,  // 当前页
    size: 5  // 每页显示数量
})

// 分页渲染
console.log(gbPagination.build())
```

### Express.js + EJS 模板 中使用

#### JS

```js
var express = require('express');
var router = express.Router();

const gbPagination = require('gb-pagination.js')


router.get('/:p', function(req, res, next) {

  const curPage = req.params.p || 1

  gbPagination.init({
    total: 101,
    curPage: 1,
    size: 5,
  })

  res.render('index', { title: 'Express',  pagination: gbPagination.build()});
});
```

#### EJS 

```html
<link rel='stylesheet' href='gb-pagination.css' />
<div class="gb-pagination">
	<%- pagination %>
</div>
```

## 选项

- `total`: 总记录数      
- `curPage`: 当前页码
- `size`:  每页记录数 || 10
- `prevText`:  上一页文案 || '上一页'，值为 false 不显示
- `nextText`: '下一页文案 || '下一页' 值为 false 不显示
- `pageInfo`: 分页信息，{{currentPage}}当前页码，{{totalPages}}总页数 || 当前第<b>{{currentPage}}</b>页/共<b>{{totalPages}}</b>页，值为 false 不显示



## 感谢

> 本项目代码由 `GB-paging` 改进而来。

### GB-paging
> 兼容IE6+及现代浏览器的简单分页，支持同一页面多个分页。 

[https://github.com/givebest/GB-paging](https://github.com/givebest/GB-paging)    



## License

[MIT](./LICENSE) © 2020 [givebest](https://github.com/givebest)
