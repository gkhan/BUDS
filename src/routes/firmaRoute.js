const express=require('express');
const auth = require("../helpers/auth");
const Firma = require("../models/firma")


const router = express.Router();


//Firma Ekleme İşlemi
//Özel Olarak Makbuz oluşturulurken eklenecek**
router.post("/ekle",auth,(req,res)=>{
    const _firma= req.body;


    try {
        Firma.getFirmaBytcVergiNo(_firma.tcNoVergiNo,(err,res_)=>{
            if(err){
                console.log(err)
            }

            if(res_===null){
                console.log(_firma.adSoyadFirmaAd+" adlı firma kayıt edildi")
                Firma.addFirma(_firma,(err,f)=>{
                  if(err){
                    throw err;
                  }
                  res.json(f)
                })
            }
            else{
                res.send("Aynı TCkimlikNo/VergiNo ile kayıtlı firma var.")
            }

        })
    } catch (error) {
        
    }

})

//firma değiştir
//Eğer Aynı TC-vergiNo ile değişik adres girilirse-Güncellenecek**
router.put("/degistir/:_id", auth, (req, res) => {
    const id = req.params._id;
    const firma_ = req.body;
    Firma.updateFirma(id, firma_, {}, (err, res_) => {
      if (err) {
        throw err;
      }
      res.json(res_);
    });
  });

//firma Sil
router.delete("/sil/:_id",auth,(req,res)=>{
    
    const id = req.params._id;    
    Firma.deleteFirma(id, (err, _firma) => {
    if (err) {
      throw err;
    }
    res.status(200).json(_firma);
  });
  })

  //TC veya vergi no ile firma bulma
  //Önce arama burda yapacak**
  router.post("/bul-tcvergi",auth,(req,res)=>{
    const arama = req.body;
    Firma.getFirmasByTcVergiNoBaslayan(arama,(err,res_)=>{
      if(err){
        console.log("Firma ararken hata meydana geldi. Hata kodu: "+err)
      }
      res.json(res_);
    })

  })

  //Adı ile başlayan firma bulma
  //Ad İle arama yapılacak-Önerilerde Çıkacak Yol**
  router.post("/bul-ad",auth,(req,res)=>{
    const arama = req.body;
    Firma.getFirmasByFirmaAdiBaslayan(arama,(err,res_)=>{
      if(err){
        console.log("Firma ararken hata meydana geldi. Hata kodu: "+err)
      }
      res.json(res_);
    })
  })

//Bütün firmaları getir
router.get("/hepsi",auth,(req,res)=>{
    Firma.getFirmas((err,firmas_)=>{
        if(err){
            throw err
        }
        res.json(firmas_)
    })
})

module.exports = router;