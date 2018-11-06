/**
 *  是否登录
 */
export const isLogin = () => {
    let auth = JSON.parse(localStorage.getItem('auth'))
    if (auth && auth.token && auth.uid) {
        return auth
    }
    return false
}
/**
 * 文章详情
 */
let GetUrlRelativePath = (url) => {
    var arrUrl = url.split('//');
    var start = arrUrl[1].indexOf('/') + 1;
    var relUrl = arrUrl[1].substring(start);
    if (relUrl.indexOf('?') != -1) {
        relUrl = relUrl.split('?')[0];
    }
    return relUrl;
}
let getPostIdByOriginalUrl = (url) => {
    return GetUrlRelativePath(url).split('/').slice(-1)[0]
}
export const toPostDetail = (item) => {
    let postId = getPostIdByOriginalUrl(item.originalUrl)
    let entryId = item.objectId
    let t = item.type
    let id = t === 'post' ? postId : entryId
    let url = `/post/detail/${id}`
    return url
}

/** 图片转换 */
let picSize ={lg:'750',md:'380',sm:'260',xs:'200'}
export let PicFilter = (src,size) => {
    return /(\/\/user-gold-cdn.xitu.io)/ig.test(src) ? (/(\?)|(\@)|(\.gif)/ig.test(src) ? src : [src.replace(/(\/\/user-gold-cdn.xitu.io)/ig,'//user-gold-cdn.xitu.io'),'?imageMogr2/thumbnail/',picSize[size || 'lg'],'x'].join("")) : src;
}