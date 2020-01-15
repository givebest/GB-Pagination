let defaultConfig,
    args;

/**
 * 默认配置
 */
defaultConfig = {
    curPage: 1, //当前页           
    size: 10, //每页n条
    prevText: '上一页',
    nextText: '下一页',
    pageInfo: '当前第<b>{{currentPage}}</b>页/共<b>{{totalPages}}</b>页',
    goUrl: '{{n}}'
}

function GbPagination() {
    if (!(this instanceof GbPagination)) return new GbPagination();
}

/**
 * 初始化
 */
GbPagination.prototype.init = function(opts) {
    this.getParams(opts);
}

/**
 * 获取分页参数
 */
GbPagination.prototype.getParams = function(opts) {
    args = this.opts = opts || {};

    args.total = args.total || 0;
    args.curPage = args.curPage || defaultConfig.curPage;
    args.size = args.size || defaultConfig.size;
    args.goUrl = args.goUrl || defaultConfig.goUrl;
    args.pages = Math.ceil(args.total / args.size || 0);
    args.isPrev = (args.prevText !== false) ? true : false;
    args.prevText = args.prevText || defaultConfig.prevText;
    args.isNext = (args.nextText !== false) ? true : false;
    args.nextText = args.nextText || defaultConfig.nextText;
    args.isPageInfo = (args.pageInfo !== false) ? true : false;
    args.pageInfo = args.pageInfo || defaultConfig.pageInfo;
}

/**
 * 分页html渲染
 */
GbPagination.prototype.build = function() {
    var html = [];
    // console.log('build', args)

    // 没有数据
    if (args.pages <= 1) {
        addClass(args.container, 'gb-hide');
        return;
    }

    if (args.curPage >>> 0 <= 0) return;
    args.curPage = args.curPage >>> 0

    var ii = (args.curPage == 1 || args.curPage == args.pages) ? 3 : 2;
    var urlParam = parseUrl(args.goUrl);

    html.push('<a href="' + urlParam + args.curPage + '" class="gb-pagination-current">' + args.curPage + '</a>');

    for (var i = 1; i < ii; i++) {
        if (args.curPage - i > 1) {
            html.unshift('<a href="' + urlParam + (args.curPage - i) + '">' + (args.curPage - i) + '</a>');
        }

        if (args.curPage + i < args.pages) {
            html.push('<a href="' + urlParam + (args.curPage + i) + '">' + (args.curPage + i) + '</a>');
        }
    }

    if (args.curPage - 2 > 1) {
        html.unshift('<span class="gb-pagination-ellipsis">...</span>');
    }

    if (args.curPage > 1) {
        html.unshift('<a href="' + urlParam + '1">1</a>');
        args.isPrev && html.unshift('<a href="' + urlParam + (args.curPage - 1) + '">' + args.prevText + '</a>');
    } else {
        args.isPrev && html.unshift('<a class="disabled">' + args.prevText + '</a>');
    }

    if (args.curPage + 2 < args.pages) {
        html.push('<span class="gb-pagination-ellipsis">...</span>');
    }

    if (args.curPage < args.pages) {
        html.push('<a href="' + urlParam + args.pages + '">' + args.pages + '</a>');
        args.isNext && html.push('<a href="' + urlParam + (args.curPage + 1) + '">' + args.nextText + '</a>');
    } else {
        args.isNext && html.push('<a class="disabled">' + args.nextText + '</a>');
    }

    // 是否显示右侧分页信息
    if (args.isPageInfo) html.push('<div class="gb-pagination-info">' + args.pageInfo.replace('{{currentPage}}', args.curPage).replace('{{totalPages}}', args.pages) + '</div>');

    // args.container.innerHTML = html.join('');
    return html.join('')
}

/**
 * 解析URL
 */
function parseUrl(url) {
    return url ? url.replace('{{n}}', '') : ''
}

module.exports = GbPagination()
