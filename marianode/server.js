const mdbConn = require('./mariadbConn.js')
const express = require('express');
const app = express();



mdbConn.getUserList()
  .then((rows) => {
    console.log(rows);
  })
  .catch((errMsg) => {
    console.log(errMsg);
  });
 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:3000 에서 서버 실행중`);
});

app.get('/',(req,res)=>{
    res.send('hello')
})