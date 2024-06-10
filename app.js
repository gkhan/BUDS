console.log("Bursa Döner Sermaye Programı")

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRouter = require('./src/routes/api');
const bcrypt = require("bcrypt");
var cors = require('cors')
require("dotenv").config()

apiResponse = require('./src/helpers/apiResponse');

Urun = require('./src/models/urun');
Makbuz = require('./src/models/makbuz');
Kullanici = require('./src/models/kullanici')

app.use(bodyParser.json());
app.use(cors());
app.use("/api/", apiRouter);


// Connect to Mongoose
mongoose.connect('mongodb://localhost/BUDS');
const db = mongoose.connection;

//URUN----------
app.get('/', (req, res) => {
  res.send('Bursa Döner Sermaye Web Service');
    

});



//admin ekleme mongodb'ye
Kullanici.getKullanicibyKullaniciAdi("admin",(err, _kullanici) => {
      if (err) {
        throw err;
      }

      if(_kullanici==null){
      

      var user = {
        kullaniciAdi:"admin",
        email: "admin",
        kullaniciBolge:"admin",
        kullaniciRol:"admin",
        password:"123456"
    };
    user.password = bcrypt.hashSync(user.password,10);

    Kullanici.addKullanici(user);
    console.log(user.kullaniciAdi+" Adli kullanici eklendi.");

  }
    
    });



app.listen(3000);
console.log('Running on port 3000');
