const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
let mysql = require('mysql');
let config = require('../src/config');

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

app.get('/songs/get', (req, res) => {
  connection.query('select * from Songs;', (err, result) => {
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
  const selectOne = "select * from TestData; "
  var updateTitle = req.body;
  console.log(updateTitle)
  res.send("yes")
  // connection.query(updateSql, [updateTitle], (err, result) => {
  //   console.log(err);
  //   console.log(result);
  //   res.send("yes")
  // })
})


app.listen(3001, () => {
  console.log("running server")
})
