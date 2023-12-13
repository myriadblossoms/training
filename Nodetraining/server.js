const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const { MongoClient, ObjectId } = require('mongodb')

let db
const url = 'mongodb+srv://admin:qwer1234@cluster0.sbjd9rw.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum');
  app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})
}).catch((err)=>{
  console.log(err)
})


app.get('/', (요청, 응답) => {
  응답.sendFile(__dirname + '/index.html')
}) 

app.get('/about', (요청, 응답) => {
    응답.sendFile(__dirname + '/about.html')
  }) 

  app.get('/shop', (요청, 응답) => {
    응답.send('쇼핑페이지입니다')
  }) 

  
  app.get('/news', (요청, 응답) => {
   
    응답.send('쇼핑페이지입니다')
  }) 
    
  app.get('/list', async(요청, 응답) => {
    let result = await db.collection('post').find().toArray()
    // console.log(result[0].title)

    응답.render('list.ejs',{ 글목록 : result})
  }) 

  app.get('/time', (요청, 응답) => {

    응답.render('time.ejs', {시간:new Date()})
  }) 

  app.get('/write', (요청, 응답) => {

    응답.render('write.ejs')
  }) 

  app.post('/add', async(요청, 응답) => {
    console.log(요청.body)
    try{
      if(요청.body.title == ''){
        응답.send('제목입력해주세요')
      }else{
        await db.collection('post').insertOne({title: 요청.body.title, content : 요청.body.content})
        응답.redirect('/list')
      }
    }catch(e){
      console.log(e)
      응답.status(500).send('서버에러')
    }
  }) 


  app.get('/detail/:id', async(요청,응답) => {
    let answer = await db.collection('post').findOne({ _id : new ObjectId(요청.params.id)})
    응답.render('detail.ejs',{ 게시글 : answer})
  })
  
