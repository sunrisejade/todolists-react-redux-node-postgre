const express = require('express');
const app = express();
const { Client } = require("pg");
const bodyParser= require('body-parser');
const cors = require('cors');


// DB connect
const client = new Client({
    user: "sunrisejade",
    host: "localhost",
    database: "todolists",
    password: "12345678",
    port: 5432
  });
  
    client.connect();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:3000/'
//   }))
app.options('/api/deleteData:item', cors())
app.options('/api/addData', cors())
app.options('/api/getData', cors())
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Credentials","true")
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "x-requested-with");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");
    res.header("Access-Control-Max-Age", "86400");
    next();  
});


// listen server
app.listen(5000,function(){
  console.log("Server is running on Port");
});



// file controllers
    // 1. client向（http://localhost:5000/api/getData）地址发送get请求
    // 2. server收到请求后，在PostgreSQL数据库中选取需要的数据，通过 res.json 方法返回给 client
    // 3. client收到res对象后，将其中的数据res.data 通过action(getData)传递给reducer
    // 4. reducer收到action(getData)后便会更新store的state

    app.get('/api/getData', (req, res) => {

        client
            .query("select * from todos")
            .then(result => res.json(result.rows))
            .catch(err => console.error(err));
    });

    // 1. client向（http://localhost:5000/api/addData）地址发送post请求
    // 2  server收到请求后，将数据增加到PostgreSQL数据库，重定向到getdata,因为只有getdata是select数据返回的，而post的数据库语句只负责插入数据
    // 

    app.post("/api/addData", (req,res) => {
        console.log('Server side Add data success:', req.body)
        client
            .query(
                "insert into todos (item) values ($1)",
                [req.body.item]
            )
            .then(res.redirect("/api/getData"))
            .catch(err => console.error(err));    
        });

    //  1. client 向（http://localhost:5000//api/deleteData）地址发送delete请求
    //  2. server收到请求后，通过node-pg操作PostgreSQL数据库进行删除，删除成功后返回删除的那一条数据给client
    //  3. client收到后通过action(deleteData)传递给reducer
    //  4. reducer收到deleteData后便会更新store的state
    
    app.delete("/api/deleteData", (req,res) => {
        console.log('Server side Delete data success :',req.query.data)

        client
            .query(
                "delete from todos where item = $1", 
                [req.query.data]
            ).then(res.json(req.query.data))
            .catch(err => console.error(err));      
    });
