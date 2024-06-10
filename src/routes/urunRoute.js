const express = require("express");
const Urun = require("../models/urun")

const auth = require("../helpers/auth");

const router = express.Router();


//Ürünlerin Hepsini Getir -------------------
router.get("/hepsi", auth, (req, res) => {
  try {
    Urun.getUruns((err, uruns) => {
      if (err) {
        throw err;
      }
      res.json(uruns);
    });

  } catch (error) {
    console.log(error)
  }

});

//Ürün Ekleme Yolu
//Toplu Şekilde Ürün Ekleme Yolu Yapılacak CSV veya Excel Yüklemesi için**
router.post("/ekle", auth, (req, res) => {
  const urun = req.body;
  try {
    //Aynı ürün isminden varsa ekleme yapmaz.
    Urun.getUrunByUrunAdi(urun.urunAdi, (err, _urun) => {
      if (err) {
        throw err;
      }

      if (_urun === null) {
        Urun.addUrun(urun, (err, _urun) => {
          if (err) {
            throw err;
          }
          console.log(_urun.urunAdi + " adlı ürün eklendi.")
          res.json(_urun);
        })
      } else if (_urun.urunAdi === urun.urunAdi) {

        res.status(402).send("Ürün adı zaten kayıtlı. Lütfen başka bir ürün adı kullanınız.")

      }

    });

  } catch (error) {

  }

});

//Ürün Değiştirme Yolu
//Stok Kontrolü Yapılacak* ürün varsa Değiştirilmez kontrolü olacak**
router.put("/degistir/:_id", auth, (req, res) => {
  const id = req.params._id;
  const urun = req.body;
  try {
    Urun.updateUrun(id, urun, {}, (err, urun_) => {
      if (err) {
        throw err;
      }
      res.json(urun_);
    });
    
  } catch (error) {
    console.log(error)
  }

});


//ID ile verilen Ürünü getir 
router.get("/bulid/:_id", auth, (req, res) => {
  const id = req.params._id

  Urun.getUrunById(id, (err, urun_) => {
    if (err) {
      throw err;
    }
    res.json(urun_);
  })

})

//Ürün Silme Yolu
//Ürün Stok var ise silinmez Kontrolü Yapılacak**
router.delete("/sil/:_id", auth, (req, res) => {
  const id = req.params._id;
  Urun.deleteUrun(id, (err, _urun) => {
    if (err) {
      throw err;
    }
    res.status(200).json(_urun);
  });

});

//Sadece ÜrünAdı İle başlayan Ürünleri bulur.
router.post("/bul", auth, (req, res) => {
  const arama = req.body;

  Urun.getUrunsByUrunAdiBaslayan(arama.search, (err, _uruns) => {
    if (err) {
      console.log(err);
    }
    res.json(_uruns);
  })

});

//Sadece ÜrünAdı İle başlayan Ürünleri bulur.
router.post("/bul-kod", auth, (req, res) => {
  const arama = req.body;

  Urun.getUrunsByUrunKoduBaslayan(arama.search, (err, _uruns) => {
    if (err) {
      console.log(err);
    }
    res.json(_uruns);
  })

});




module.exports = router;