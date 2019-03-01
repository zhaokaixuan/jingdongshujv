var mysql=require("mysql")
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '168168',
    database: test
});

function insert(sql) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err,conn){
            if(err){
                reject(err);
            }else{
                conn.query(sql,function(err,rows,fields){
                    //释放连接
                    conn.release();
                    //传递Promise回调对象
                    resolve({"err":err,
                            "rows":rows,
                            "fields":fields});
                });
            }
        });
    });
};
module.exports = insert;