const express = require('express')
const mariadb = require('mariadb')
const lodash = require('lodash')

//maria db config
var host = 'localhost';
var user = 'root';
var password = 'qwer1234'
var database = 'nodejs_test'
var db =  mariadb.createConnection({
    host:host,
    database:database,
    user:user,
    password:password
})

const app = express();
app.listen(3000);
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())


app.get('/',(req,res)=> {
    var notification = (req.query.notification)?req.query.notification:null;
   db.then((connection) =>{
        var result = connection.query('SELECT * FROM customers');
        lodash.difference(result['meta'])
        return result;
    }).then((result)=> {
       
        res.render('pages/index.ejs',{
            'data':result,
            'notification':notification
        });

    }).catch(error =>{
        console.log(error.message)
    })

})
app.get('/api',(req,res)=>{
    res.render('/pages/500.ejs')
})
app.post('/',(req,res)=> {
    switch(req.body.mode){
        case 'create': createRecord(db,req,res); break;
        case 'read': readRecord(db,lodash,res);break;
        case 'update': updateRecord(req,res);break;
        case 'delete': deleteRecord(req,res);break;
    }
});

function createRecord(db,req,res){
    db.then(connection =>{
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
function readRecord(db,lodash,res){
    db.then((connection) =>{
        var result = connection.query('SELECT * FROM customers');
        lodash.difference(result['meta'])
        return result;
    }).then((result)=> {
        response.status(200).json({ status:true,'data':result})
    }).catch(error =>{
        console.log(error.message)
    })
}
function updateRecord(db,req,res){
    db.then(connection =>{
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
function deleteRecord(db,req,res){
   db.then(connection =>{
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