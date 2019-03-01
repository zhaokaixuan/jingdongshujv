/**
 * 获取第一个页面的列表信息
 *  @param {Promise} page 
 * @param {String} url 
 * @returns {Array} -所有的信息
 */
async function first(page,url){
    await page.goto(url, {
        waitUntil: 'networkidle2' //等待页面不动了，说明加载完毕了
    });
    await page.click('.p-num .curr');
    await page.waitFor('#J_goodsList > ul > li:nth-child(60)');
    let len = await page.evaluate(() => {
        let $ = window.$;
        let $items = $('.gl-item');
        return $items.length;
    })
    return len;
}
module.exports = first;