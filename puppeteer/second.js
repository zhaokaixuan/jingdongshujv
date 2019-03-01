const request = require('request');
let iconv = require('iconv-lite');

function sleep(second){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(true);
        },second)
    })
}

function getPingjia(url){
    return new Promise((resolve,reject)=>{
        request({
            url: url,   // 请求的URL
            method: 'GET',
            encoding:null
        }, function (error, res,body) {
            if (!error && res.statusCode == 200) {
                var strings = iconv.decode(body, 'gb2312').toString();
                var obj = JSON.parse(strings);
                resolve(obj);
            }
        });
    })
}
async function second(page,skuNum){
    // var num = await page.evaluate(()=>{
    //     let $ = window.$;
    //     let $li = $('#detail > div.tab-main.large > ul > li');
    //     let val = 0;
    //     $li.each(function(index){
    //         if($(this).text().indexOf('评价')>-1){
    //             val = index;
    //         }
    //     })
    //     return val;
    // })
    // console.log(`评价selector:${num}`)
    // let pingjiaSelector = `#detail > div.tab-main.large > ul > li:nth-child(${num})`
    // await page.tap(pingjiaSelector);

    // await page.waitForSelector('#comm-curr-sku');
    // await page.waitFor(5000)
    // await page.tap('#comm-curr-sku')
    await sleep(5000)
    var result = await page.evaluate(() => {
        let $ = window.$;
        let jd = $('#crumb-wrap').find('.contact .u-jd').text().replace(/[\n\r\s\\]/g,'');//自营
        let shop = $('#crumb-wrap .J-hove-wrap .name').text().replace(/[\n\r\s\\]/g,'');//商店
        let name = $('.product-intro').find('.itemInfo-wrap .sku-name').text().replace(/[\n\r\s\\]/g,'');//名字
        let originPrice = $('#page_origin_price').text();//原价
        let price = $('.product-intro').find('.summary-first .summary-price .p-price .price').text().replace(/[\n\r\s\\]/g,'');//价格
        let pingjia = $('.product-intro').find('.summary-first .summary-info .count').text().replace(/[\n\r\s\\]/g,'');//上方评价数
        let cuxiao = $('.product-intro').find('.summary-first #J-summary-top .dt').text().replace(/[\n\r\s\\]/g,'');//促销
        let cuxiaoContent = $('.product-intro').find('.summary-first #J-summary-top .dd').text().replace(/[\n\r\s\\]/g,'');//促销内容
        let shangpinpingjia = Array.from($('.score-parts .score-part')).map((item)=>{return {[$(item).find('.score-desc').text()]:$(item).find('.score-detail em').text()}});//商品评价，物流履行，售后服务
        let shangpinjieshaoTap = $('#parameter-brand > li').text().replace(/[\n\r\s\\]/g,'');//品牌
        let shangpinxinxiTap = "";
        let jiekou = "";
        Array.from($('.parameter2 li')).forEach((item)=>{
            let val = $(item).text().replace(/[ \n\r\s\\]/g,'')
            console.log(val)
            if(val.indexOf("容量：")!=-1){
                shangpinxinxiTap = val.replace('容量：','');
            }
            if(val.indexOf("接口：")!=-1){
                jiekou = val.replace('接口：','');
            }

        });//商品信息
        // let pingjia1 = g;//商品评价小细节
        // let pingjia2 = Array.from($('.J-comments-list').find('.filter-list li a')).map((item)=>{
        //     return $(item).text().replace(/[ \n\r\s\\]/g,'');
        // });//评价数量信息
        let result = {
            jd,
            shop,
            name,
            price,
            originPrice,
            pingjia,
            cuxiao,
            cuxiaoContent,
            shangpinpingjia,
            shangpinjieshaoTap,
            shangpinxinxiTap,
            jiekou
            // pingjia1,
            // pingjia2
        }

        return result;

    })
    //let pingjiaUrl = `https://sclub.jd.com/comment/skuProductPageComments.action?productId=${skuNum}&score=0&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1`
    let pingjiaUrl = `https://sclub.jd.com/comment/productPageComments.action?productId=${skuNum}&score=0&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1`
    let pingjiaObj = await getPingjia(pingjiaUrl);
    console.log(pingjiaObj);
    result.goodRate = pingjiaObj.productCommentSummary.goodRate;//好评度
    result.commentCount = pingjiaObj.productCommentSummary.commentCount;//全部评价
    result.imageListCount = pingjiaObj.imageListCount;//晒图
    result.videoCount = pingjiaObj.productCommentSummary.videoCount;//视频晒单
    result.afterCount = pingjiaObj.productCommentSummary.afterCount;//追评
    result.goodCount = pingjiaObj.productCommentSummary.goodCount;//好评
    result.generalCount = pingjiaObj.productCommentSummary.generalCount;//中评
    result.poorCount = pingjiaObj.productCommentSummary.poorCount;//差评
    var hotCount = 0;
    pingjiaObj.hotCommentTagStatistics.map((item)=>{
        hotCount +=Number(item.count)
    })
    result.hotCommentTagStatistics =hotCount ;//热评
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
    console.log(result.length)
    return result;
}





module.exports = second;