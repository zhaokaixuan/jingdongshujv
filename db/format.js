function format(cur,listIndex,skuNum,obj2){
    let page = cur,//页数
        sku = skuNum,//sku
        index = listIndex;//排序
    let jd = obj2.jd,//是否是自营
        shop = obj2.shop,//商店名称
        name = obj2.name,//商品名称
        price = obj2.price,//价格
        originPrice = obj2.originPrice,//原价
        pingjia = obj2.pingjia,//上方评价数
        cuxiao = obj2.cuxiao,//促销
        cuxiaoContent = obj2.cuxiaoContent,//促销内容
        shangpinpingjia = JSON.stringify(obj2.shangpinpingjia),//商店评价
        shangpinjieshaoTap = obj2.shangpinjieshaoTap,//品牌
        shangpinxinxiTap = JSON.stringify(obj2.shangpinxinxiTap),//商品信息
        jiekou = JSON.stringify(obj2.jiekou),//接口
        guigebaozhaungTap = JSON.stringify(obj2.guigebaozhaungTap),//规格包装
        goodRate = JSON.stringify(obj2.goodRate),//好评度
        commentCount = JSON.stringify(obj2.commentCount),//全部评价
        imageListCount = JSON.stringify(obj2.imageListCount),//晒图
        videoCount = JSON.stringify(obj2.videoCount),//视频晒单
        afterCount = JSON.stringify(obj2.afterCount),//追评
        goodCount = JSON.stringify(obj2.goodCount),//好评
        generalCount = JSON.stringify(obj2.generalCount),//中评
        poorCount = JSON.stringify(obj2.poorCount),//差评
        hotCommentTagStatistics = JSON.stringify(obj2.hotCommentTagStatistics);//热评
    return [sku,jd,shop,name,price,originPrice,pingjia,cuxiao,cuxiaoContent,shangpinpingjia,shangpinjieshaoTap,shangpinxinxiTap,jiekou,goodRate,commentCount,imageListCount,videoCount,afterCount,goodCount,generalCount,poorCount,hotCommentTagStatistics,page,index]
}
module.exports = format;