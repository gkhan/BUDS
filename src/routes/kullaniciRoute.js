const express = require("express");
const bcrypt = require("bcrypt");
const Kullanici = require("../models/kullanici")
const jwt = require("jsonwebtoken");
const ActiveDirectory = require("activedirectory")

const auth =require("../helpers/auth");


const router = express.Router();

//Kullanıcıların hepsini getir ------------
router.get("/hepsi",auth,(req,res) =>{
    Kullanici.getKullanicis((err,kullanicis)=>{
        if(err){
            throw err;
        }
        res.json(kullanicis);
    });
});

//Kullanıcı Ekleme İşlemi
//Kullanıcı Eklenirken Rol Ayarı ve Bölge kontrolü yapılacak**
router.post("/ekle",(req,res)=>{
    var kullanici = req.body;
  
    //Aynı kullanıcı isminden varsa ekleme yapmaz.
    Kullanici.getKullanicibyKullaniciAdi(kullanici.kullaniciAdi,(err, _kullanici) => {
      if (err) {
        throw err;
      }
  
      if(_kullanici===null){
        //şifreyi hash haline getir
        kullanici.password =  bcrypt.hashSync(kullanici.password,10);
         //token oluştur 2 saatlik
         token = jwt.sign(
          {kullanici_id:kullanici._id},
          process.env.TOKEN_KEY,
          {
            expiresIn:"3h"
          }
          );

          kullanici.token = token;       
          
          Kullanici.addKullanici(kullanici);
          console.log(kullanici.kullaniciAdi+" adlı kullanici kayıt edildi. ");
          res.json(kullanici);
          // console.log(_kullanici.kullaniciAdi+" adlı kullanıcı eklendi.");
          // res.json(_kullanici);
        
      }    
      else if(_kullanici.kullaniciAdi ===kullanici.kullaniciAdi){
        res.send("Kullanıcı adı zaten kayıtlı. Lütfen başka bir kullanıcı adı kullanınız.");  
      }
      
    });
    
});

//Kullanıcı Silme İşlemi
//Kullanıcı Silme Yapılmadan, Oluşturduğu Makbuz Varmı kontrolü yapılacak**
//Kullanıcı Silme Yapılmadan, Rol Kontrolü Yapılacak**
router.delete("/sil/:_id",auth,(req,res) =>{
    const id = req.params._id;
    Kullanici.deleteKullanici(id,(err,kullanici_)=>{
        if(err){
            throw err;
        }
        res.json(kullanici_);
    });
});

//Domain Login

router.post("/login-domain",(req,res)=>{
  var usr = req.body;
  Kullanici.getKullanicibyKullaniciAdi(usr.kullaniciAdi,(err,_kkullanici)=>{
    if(err){
      throw err;
    }
    if(_kkullanici===null){
      res.status(404).send("Kayıtlı kullanıcı sistemde yoktur. Lütfen kayıt ettirin")
    }
    else if(usr.kullaniciAdi ===_kkullanici.kullaniciAdi){
      //kullanıcı kayıtlı şimdi domain işleri gelecek buraya.
      var config = {
        url: 'ldap://tarim.gov.tr',
        baseDN: 'dc=tarim,dc=gov,dc=tr',
        username: 'gokhan.sargin@tarim.gov.tr',
        password: 'Gkhnsrgn1*'
    };
    var ad = new ActiveDirectory(config);

    // Authenticate
    ad.authenticate(usr.kullaniciAdi+"@tarim.gov.tr", usr.password, function(err, auth_) {
    if (err) {
      console.log('ERROR: '+JSON.stringify(err));
      return;
    }
    if (auth_) {
      console.log('Authenticated!');
      token = jwt.sign(
        {kullanici_id:usr._id},
        process.env.TOKEN_KEY,
        {
          expiresIn:"3h"
        }
        );

        _kkullanici.token = token;

        Kullanici.updateKullanici(_kkullanici._id,_kkullanici);
        console.log("Kullanıcı Login Oldu.", _kkullanici.kullaniciAdi);
        res.status(200).json(_kkullanici);
    }
    else {
      console.log('Authentication failed!');
      console.log("İŞLEM BAŞARISIZ")
  }});

    }


  })
})

//Giriş Arayüzü DB kontrolü ve token verilmesi
//Domain Girişi İçin Oauth2 ayrı Bir Yol Oluşturulacak**
router.post("/login",(req,res)=>{
  var kullanici = req.body;
  Kullanici.getKullanicibyKullaniciAdi(kullanici.kullaniciAdi,(err,kayitliKullanici)=>{
    if(err){
      throw err;
    }
    
  if(kayitliKullanici === null){
    res.status(404).send("Kayıtlı kullanıcı yok");
  }
  else if (kullanici.kullaniciAdi ===kayitliKullanici.kullaniciAdi)
  {
    //şifreyi hashle karşılaştır.
    if(bcrypt.compareSync(kullanici.password,kayitliKullanici.password)){
      
      token = jwt.sign(
        {kullanici_id:kullanici._id},
        process.env.TOKEN_KEY,
        {
          expiresIn:"3h"
        }
        );

        kayitliKullanici.token = token;

        Kullanici.updateKullanici(kayitliKullanici._id,kayitliKullanici);
        console.log("Kullanıcı Login Oldu.", kayitliKullanici.kullaniciAdi);
        res.status(200).json(kayitliKullanici);

    }
    else
      res.status(500).send("Hatalı şifre veya hatalı kullanıcı Adı");
  }

  });
    
});

//Kullanıcı Özelliklerinin Değiştirilmesi
//Kullanıcı Bölgeleri Ayrı Yolda getirilecek**
router.put("/degistir/:_id",auth,(req,res)=>{
  const id =req.params._id;
  var kullanici = req.body;
try {
  Kullanici.updateKullanici(id,kullanici,{},(err,_kullanici)=>{
    if(err){
      throw err;
    }
    res.status(200).json(_kullanici);
  })
} catch (error) {
  console.log(error);
}
  
})


module.exports = router;