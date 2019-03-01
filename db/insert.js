const mysql = require('mysql');
const database = require('./database');
console.log(database)
const pool = mysql.createPool(database);
function insert(values){
    return new Promise((resolve,reject)=>{
        let sql = 'INSERT INTO `quanbushangpin3`(`sku`,`jd`,`shop`,`name`,`price`,`originPrice`,`pingjia`,`cuxiao`,`cuxiaoContent`,`shangpinpingjia`,`shangpinjieshaoTap`,`shangpinxinxiTap`,`jiekou`,`goodRate`,`commentCount`,`imageListCount`,`videoCount`,`afterCount`,`goodCount`,`generalCount`,`poorCount`,`hotCommentTagStatistics`,`page`,`index`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        pool.getConnection(function(err,connection){
            if(err){throw err;return;}
            connection.query(sql,values,function(error,results,fields){
                //将链接返回到连接池中，准备由其他人重复使用
                connection.release();
                if(error) throw error;
                //执行回调函数，将数据返回
               resolve(true);
            });
        });
    })
   
}
module.exports =insert;

