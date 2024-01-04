const express = require('express')
const app = express()
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

app.use(passport.initialize())
app.use(session({
  secret: '암호화에 쓸 비번',
  resave: false,
  saveUninitialized: false,
  cookie : {maxAge: 60 * 60 * 1000}
}))
app.use(passport.session())

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
    
     try{
      let answer = await db.collection('post').findOne({ _id : new ObjectId(요청.params.id)})
      응답.render('detail.ejs',{ 게시글 : answer})
     }catch(e){
      console.log(e)
      응답.status(500).send('서버에러')
     }
  })
  
  app.get('/edit/:id', async(요청, 응답) => {
    let answer = await db.collection('post').findOne({ _id : new ObjectId(요청.params.id)})
    응답.render('edit.ejs',{ 게시글 : answer})
  }) 

  app.put('/edit', async(요청, 응답) => {

   await db.collection('post').updateOne({ _id : new ObjectId(요청.body.id) },
   {$set:{ title:요청.body.title, content:요청.body.content}}
   )
   console.log(요청.body.title)
    응답.redirect('/list')
  }) 
  
  app.delete('/delete', async(요청, 응답) => {

   await db.collection('post').deleteOne({_id: new ObjectId(요청.query.docid)})
   응답.send('삭제완료')

  }) 

  app.get('/list/:id', async(요청, 응답) => {
    // 1번~ 5번글을 찾아서 result변수에 저장
    let result = await db.collection('post').find().skip((요청.params.id - 1) * 5).limit(5).toArray()
    // console.log(result[0].title)

    응답.render('list.ejs',{ 글목록 : result})
  }) 

  app.get('/list/next/:id', async(요청, 응답) => {
    // 1번~ 5번글을 찾아서 result변수에 저장
    let result = await db.collection('post').find({_id : {$gt : new ObjectId (요청.params.id)}}).limit(5).toArray()
    // console.log(result[0].title)
    응답.render('list.ejs',{ 글목록 : result})
  }) 

  passport.use(new LocalStrategy(async (입력한아이디, 입력한비번, cb) => {
    let result = await db.collection('user').findOne({ username : 입력한아이디})
    if (!result) {
      return cb(null, false, { message: '아이디 DB에 없음' })
    }
    if (result.password == 입력한비번) {
      return cb(null, result)
    } else {
      return cb(null, false, { message: '비번불일치' });
    }
  }))
  


  passport.serializeUser((user, done) => {
    process.nextTick(() => {
      done(null, { id: user._id, username: user.username })
    })
  })

  passport.deserializeUser(async(user, done) => {
    let result = await db.collection('user').findOne({_id: new ObjectId(user.id)})
    delete result.password
    process.nextTick(() => {
      done(null, user )
    })
  })

  app.get('/login', async(요청, 응답) => {
    console.log(요청.user)
    응답.render('login.ejs')
  }) 

  app.post('/login', async(요청, 응답) => {

    passport.authenticate('local',(error, user, info) =>{
      if(error) return 응답.status(500).json(error)
      if(!user) return 응답.status(401).json(info.message)
      요청.logIn(user, ()=>{
        if(err) return next (err)
        응답.redirect('/')
      })
    })(요청,응답,next)

    응답.render('login.ejs')
  }) 