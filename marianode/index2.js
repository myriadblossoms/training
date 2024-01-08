const express = require('express')
const mariadb = require('mariadb')
const lodash = require('lodash')

const app = express();

app.listen(3000);

var host = 'localhost';
var user = 'root';
var password = 'qwer1234'
var database = 'nodejs_test'

app.use(express.urlencoded({extended:true}))

app.post('/',(req,res)=> {
    switch(req.body.mode){
        case 'create': createRecord(req,res); break;
        case 'read': readRecord(req,res);break;
        case 'update': updateRecord(req,res);break;
        case 'delete': deleteRecord(req,res);break;
    }
});
function createRecord(req,res){
    mariadb/mariadb.createConnection({
        host:host,
        database:database,
        user:user,
        password:password
    }).then(connection =>{
        connection.beginTransaction()
            .then(()=>{
                return connection.query('INSERT INTO customers (name,age) VALUES(?,?);',[req.body.name, req.body.age])
            }).then((result)=>{
                connection.commit();
                res.status(200).json({
                    'status':true,
                    'message':'record inserted',
                    'lastInsertId':result.insertId
                })
            }).catch((error)=>{
                console.log(error.message)
            });
    }).catch((error)=>{
        console.log(error.message)
    })
}
function readRecord(req,res){
    mariadb.createConnection({
        host:host,
        database:database,
        user:user,
        password:password
    }).then((connection) =>{
        var result = connection.query('SELECT * FROM customers');
        lodash.difference(result['meta'])
        return result;
    }).then((result)=> {
        response.status(200).json({ status:true,'data':result})
    }).catch(error =>{
        console.log(error.message)
    })
}
function updateRecord(req,res){
    mariadb/mariadb.createConnection({
        host:host,
        database:database,
        user:user,
        password:password
    }).then(connection =>{
        connection.beginTransaction()
            .then(()=>{
                return connection.query('update customers set name = ?, age=? WHERE id = ?;',[req.body.name, req.body.age, request.body.id])
            }).then((result)=>{
                connection.commit();
                res.status(200).json({
                    'status':true,
                    'message':'record inserted',
                    'lastInsertId':result.insertId
                })
            }).catch((error)=>{
                console.log(error.message)
            });
    }).catch((error)=>{
        console.log(error.message)
    })
}
function deleteRecord(req,res){
    mariadb/mariadb.createConnection({
        host:host,
        database:database,
        user:user,
        password:password
    }).then(connection =>{
        connection.beginTransaction()
            .then(()=>{
                return connection.query('DELETE FROM customers WHERE customers Id = ?',[req.body.id])
            }).then((result)=>{
                connection.commit();
                res.status(200).json({
                    'status':true,
                    'message':'Record delete',
                    'lastInsertId':result.insertId
                })
            }).catch((error)=>{
                console.log(error.message)
            });
    }).catch((error)=>{
        console.log(error.message)
    })
}