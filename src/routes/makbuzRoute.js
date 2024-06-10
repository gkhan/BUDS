const express = require("express");
const Makbuz = require("../models/makbuz")

const auth = require("../helpers/auth");

const router = express.Router();


//MAKBUZ ---------------
router.get('/hepsi', auth, (req, res) => {
  Makbuz.getMakbuzs((err, makbuzs) => {
    if (err) {
      throw err;
    }
    res.json(makbuzs);
  });
});

//BelgeOluşituranın Belgelerini Getir
router.post('/belgeolusturan-belgeler',auth,(req,res)=>{
  const makbuzp = req.body
  Makbuz.getMakbuzsByMakbuzKaydeden(makbuzp,(err,makbuzs_)=>{
    if(err){
      throw err;
    }
    res.json(makbuzs_);
  })
})


//Makbuz Ekleme İşlemine Kısıtlar Gelecek **
router.post('/ekle', auth, (req, res) => {
  const makbuz = req.body;
  Makbuz.addMakbuz(makbuz, (err, makbuz_) => {
    if (err) {
      throw err;
    }
    res.json(makbuz_);
  })
});


//Makbuz Değişiklik İşleminde "Kaydeden Değiştirebilsin" Kısıtı konulacak**
router.put("/degistir/:_id", auth, (req, res) => {
  const id = req.params._id;
  const _makbuz = req.body;


  Makbuz.updateMakbuz(id, _makbuz, (err, makbuz_) => {
    if (err) {
      throw err;
    }
    res.json(makbuz_);
  })

})

//Makbuz ID ile makbuz Getirme
router.get("/makbuzid/:_id", (req, res) => {
  const id = req.params._id;
  Makbuz.getMakbuzById(id, (err, makbuz_) => {
    if (err) {
      throw err;
    }
    res.json(makbuz_);
  })
});

//MakbuzNo'su ile aranırken makbuzSeriNo'su eklenecek**
router.get("/makbuzno/:makbuzNo", (req, res) => {
  const m = req.params.makbuzNo;

  Makbuz.getMakbuzByMakbuzNo(m, (err, makbuz_) => {
    if (err) {
      throw err;
    }
    res.json(makbuz_);
  })
});

//Ödenmemiş Kontrolünde- KullanıcıRol de dikkat edilecek.**
router.put("/odenmemis", auth, (req, res) => {
  const kullanici = req.body;

  Makbuz.getMakbuzsBolgeVeOdenmemis(kullanici.kullaniciBolge,(err,_makbuzs)=>{
    if(err){
      throw err;
    }
    res.json(_makbuzs);
  })

});

router.delete("/sil/:_id", auth, (req, res) => {
  const id = req.params._id;
  Makbuz.deleteMakbuz(id, (err, _makbuz) => {
    if (err) {
      throw err;
    }
    res.status(200).json(_makbuz);
  });

});

module.exports = router;