const express = require("express");
const UrunStok = require("../models/urunStok")

const auth = require("../helpers/auth");

const router = express.Router();


//ürünStokların Hepsini Getir -------------------
router.get("/hepsi", auth, (req, res) => {
  try {
    UrunStok.getUrunStoks((err, urunStoks) => {
      if (err) {
        throw err;
      }
      res.json(urunStoks);
    });

  } catch (error) {
    console.log("ÜrünStokları getirilirken hata meydana geldi");
  }

});

//ÜrünStok Ekleme İşlemi
router.post("/ekle",auth,(req,res)=>{
    const urunStokp = req.body
    //önce kayıtlı mı diye kontrol edip ekleniyor
    try {
        UrunStok.getUrunStokByUrunAdiAndBolge(urunStokp,(err,urunStok_)=>{
            if(err){
                throw err;
            }
            //ürün stoklarda kayıtlı değil demek-Eklenebilir
            if(urunStok_===null){
                UrunStok.addUrunStok(urunStokp,(err,urunStokp_)=>{
                    if(err){
                        throw err;
                    }
                    console.log(urunStokp_.urunAdi +"adlı ürün stoğu "+urunStokp_.stokBolge+" adlı bölgeye eklendi")
                    res.json(urunStokp_)
                })
            }
            //Ekeleme stok mevcutsa mevcut stoğa ekleyerek güncelle
            else if(urunStok_.urunAdi===urunStokp.urunAdi){
                urunStok_.stok+=urunStokp.stok;
                urunStok_.kimTarafindanGuncellendi = urunStokp.kimTarafindanGuncellendi;
                urunStok_.guncellenmeTarihi=Date.now;
              
                UrunStok.updateUrunstok(urunStok_._id,urunStok_,{},(err,p_)=>{
                    if(err){
                        throw err;
                    }
                    console.log(urunStok_.stokBolge+" Bölgesinde "+urunStok_.urunAdi+" adlı stok :"+urunStok_.stok+" Olarak güncellendi")
                    res.json(p_);
                })
            }
        })

        
    } catch (error) {
        console.log(error+"ÜrünStok ekleme işleminde Hata Oluştu");
    }
});

//ürünStok Güncelleme İşlemi
router.put("/degistir/:_id", auth, (req, res) => {
    const id = req.params._id;
    const urunStokp = req.body;
    try {
        Urun.updateUrun(id, urunStokp, {}, (err, urunStok_) => {
            if (err) {
              throw err;
            }
            res.json(urunStok_);
          });
    } catch (error) {
        console.log("ÜrünStok Güncelleme İşleminde Hata Oluştu ",urunStokp)
    }
       
  });


module.exports = router;