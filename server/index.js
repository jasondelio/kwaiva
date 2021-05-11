const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
let mysql = require('mysql');
let config = require('../src/config');
var multer = require('multer');
var upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 }
})

const connection = mysql.createConnection(config);

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.query('use Users;', (err) => {
  if (err === null) {
    console.log("no error")
  }
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array());

app.get('/songs/get', (req, res) => {
  connection.query('select * from Songs;', (err, result) => {
    res.send(result)
  })
})

app.get('/songs/getid', (req, res) => {

  const selectIdxOne = 'select * from Songs where song_id=?;'
  console.log(req)
  console.log(req.query)
  var idx = req.query.songID;
  console.log(idx)

  connection.query(selectIdxOne, [idx], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

app.get('/testdata/insert', (req, res) => {
  const selectOne = "select * from TestData; "
  var updateTitle = req.body.changedtitled;
  console.log(updateTitle)

  connection.query(selectOne, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

app.post('/getform', (req, res) => {
  const selectOne = "select * from TestData where title = ?; "
  const insertOne = "INSERT INTO Songs (title, musician, photo, music, price, quantity, sold_number)  VALUES(?, ?, ?, ?, ?, ?, ?);"

  const title = req.body.title;
  const musician = req.body.musician;
  const photo = req.body.imagefile;
  const music = req.body.musicfile;
  const price = req.body.price;
  const quantity = req.body.quantity;
  // console.log(music)
  // connection.query(selectOne, ['testets'], (err, result) => {
  //   console.log(err);
  //   console.log(result);
  //   res.send("yes")
  // })
  connection.query(insertOne, [title, musician, photo, music, price, quantity, quantity], (err, result) => {
    console.log(err);
    console.log(result);
    res.send("yes")
  })
})
app.post('/deletesong', (req, res) => {
  const selectOne = "select * from Songs where song_id = ?; "
  const deleteOne = "DELETE from Songs where song_id = ?; "
  const song_id = req.body.song_id;
  console.log(req)
  console.log("deleete")
  console.log(song_id)
  // connection.query(selectOne, ['testets'], (err, result) => {
  //   console.log(err);
  //   console.log(result);
  //   res.send("yes")
  // })
  connection.query(deleteOne, [song_id], (err, result) => {
    console.log(err);
    console.log(result);
    res.send("yes")
  })
})

app.listen(3001, () => {
  console.log("running server")
})
