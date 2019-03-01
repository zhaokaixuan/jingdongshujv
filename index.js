const puppeteer = require('puppeteer');
const first = require('./puppeteer/first');
const second = require('./puppeteer/second');
const format = require('./db/format');
const insert = require('./db/insert');
const fs = require('fs');
let cur = Number(process.argv[2])
let urlPage = 2* Number(cur) -1;
let s =(Number(cur)-1)*60 +1;
if(cur == 1){
    var url = `https://search.jd.com/Search?keyword=u%E7%9B%98&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.his.0.0&psort=3&click=0`
}else{
    var url = `https://search.jd.com/Search?keyword=u%E7%9B%98&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.his.0.0&psort=3&page=${urlPage}&s=${s}&click=0`
}console.log(url)
let listIndex = Number(process.argv[3]);
let pageIndex = (cur-1)*60;
async function getMsg(browser,page,len){
    let skuNum = await page.evaluate((listIndex) => {
        let $ = window.$;
        let skuSelect = '#J_goodsList > ul > li:nth-child('+listIndex+')'
        let sku = $(skuSelect).attr('data-sku');
        return sku;
    },listIndex)
    let clickSelect = '#J_goodsList > ul > li:nth-child('+listIndex+') > div > div.p-img > a'
    console.log(skuNum)
    await page.click(clickSelect);
    await page.waitFor(3000);
    let page2 = await browser.pages();
    await page.waitFor(2000);
    await page2[2].setViewport({
        width: 1360,
        height: 850
    })
    await page2[2].waitFor(1000)
    let result = await second(page2[2],skuNum);
    let values = format(cur,pageIndex+listIndex,skuNum,result)
    await insert(values);
    console.log({'page':cur,'listIndex':listIndex,index:pageIndex+listIndex,'len':len})
    listIndex ++;
    await page2[2].close();
    if(listIndex<=len){
        await getMsg(browser,page,len);
    }else{
        
        await browser.close();
        await page.waitFor(10000);
        await process.exit()
    }
}

(async () => {
    try {
        console.log(`start visit the target page`);
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            headless: true //是否运行在浏览器headless模式，true为不打开浏览器执行，默认为true
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1360,
            height: 850
        })
        await page.goto(url, {
            waitUntil: 'networkidle2' //等待页面不动了，说明加载完毕了
        });
        await page.click('.p-num .curr');
        await page.waitFor('#J_goodsList > ul > li:nth-child(36)');
        let len = await page.evaluate(() => {
            let $ = window.$;
            let $items = $('.gl-item');
            return $items.length;
        })
        await getMsg(browser,page,len);
    } catch (err) {
        console.log(err)
    }

})()