const express = require('express');

const path=require('path');
const hbs=require('hbs');
const bodyParser = require('body-parser');
const app = express();

const http = require('http').createServer(app);
const port = 3000;
const static_path=path.join(__dirname,"/public");
const template_path=path.join(__dirname,"/templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
const io=require('socket.io')(http);
app.set('view engine','hbs');
app.set('views',template_path);
hbs.registerPartials(partials_path);
app.use(express.static(static_path));

// Parse incoming request bodies with JSON payloads
app.use(bodyParser.json());

// Parse incoming request bodies with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
//   res.send('Hello World!');
    res.render('index');
});



// socket setup
io.on('connection',(socket) => {
  console.log('connected...')
  socket.on('message',(msg) =>{
      socket.broadcast.emit('message',msg);
  })
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});