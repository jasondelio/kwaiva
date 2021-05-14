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

app.set('port', process.env.PORT || 3001);

app.use(expressCspHeader({
  directives: {
      'script-src': [SELF, INLINE],
  }
}));

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

app.post('/song/update', (req, res) => {
  const selectOne = "select * from TestData where title = ?; "
  const updateSql = "UPDATE Songs SET title=?, musician=?, photo=?, music=?, price=?, quantity=?, sold_number=? WHERE song_id=?; "

  const title = req.body.title;
  const musician = req.body.musician;
  const photo = req.body.imagefile;
  const music = req.body.musicfile;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const songid = req.body.id;
  console.log("concosossfaa server")
  console.log(title)
  console.log(musician)
  // console.log(photo)
  // console.log(music)
  console.log(price)
  console.log(quantity)
  console.log(songid)
  // connection.query(selectOne, ['testets'], (err, result) => {
  //   console.log(err);
  //   console.log(result);
  //   res.send("yes")
  // })
  connection.query(updateSql, [title, musician, photo, music, price, quantity, quantity, songid], (err, result) => {
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

/*User*/
/*const [userInfo, setuserInfo] = React.useState({
        fstName: '',
        lstName: '',
        userName: '',
        email: '',
        passwords: '',
        role: ''
    });*/

    app.get('/users/get', (req, res) => {
      connection.query('select * from Users;', (err, result) => {
        res.send(result)
      })
    })
  
    // Get data of selected user
    app.get('/users/getUser', (req, res) => {
      const GET = 'select * from Users where keyId=?;';
      var id = req.query.keyid;
      console.log('Post a Customer: ' + JSON.stringify(req.query));
      connection.query(GET,[id], (err, result) => {
        console.log('result: ' + JSON.stringify(result));
        res.send(result)
      })
    })
  
    // Get data of selected user
    app.get('/users/getUserEmail', (req, res) => {
      const GET = 'select * from Users where email=?;';
      var id = req.query.email;
      console.log('Post a Customer: ' + JSON.stringify(req.query));
      connection.query(GET,[id], (err, result) => {
        res.send(result)
      })
    })
  
  // INSERT statment, data = [(username, email, lastname, firstname, role)]
  app.post('/users/insert', (req, res) => {
    // update statment, data = [tableName, "conlumnName2 = 'NewData'", "conlumnName2 = 'OldData'"]
    const INSERT = 'INSERT INTO Users (firstname, lastname, username, password, email, role) VALUES (?,?,?,?,?,?)';
    var fstName = req.body.firstName;
    var lstName = req.body.lastName;
    var userName = req.body.userName;
    var email = req.body.email;
    var passwords = req.body.password;
    var role = req.body.role;
    console.log("%s",connection.state)
  
    console.log('Post a Customer: ' + JSON.stringify(req.body));
  
    connection.query(INSERT, [fstName,lstName,userName, passwords, email, role] , (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result)
    })
  })
  
  
  app.post('/users/update', (req, res) => {
    // update statment, data = [tableName, "conlumnName2 = 'NewData'", "targetconlumnName = 'targetValue'"]
    const UPDATE = "UPDATE Users SET firstName = ?, lastName = ?, userName = ?,password = ?,email =?,role =? WHERE keyId = ?;"
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = req.body.userName;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    var keyId = req.body.keyId;
  
    console.log(req.body)
  
    connection.query(UPDATE, [firstName,lastName,userName, password, email, role, keyId], (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result)
    })
  })
  
  app.post('/users/delete', (req, res) => {
    // update statment, data = [tableName, "conlumnName2 = 'NewData'", "targetconlumnName = 'targetValue'"]
    const DELETE = "DELETE from Users where keyId = ?;"
  
    console.log(req.body)
  
    connection.query(DELETE, [keyId], (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result)
    })
  })
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  
  var server = app.listen(process.env.PORT, () => {
    console.log("running server")
    var host = server.address().address
    var port = server.address().port
   
    console.log("App listening at http://%s:%s and %s", host, port, connection.state)
  })
