const express = require("express");
const StokKabul = require("../models/stokKabul")
const Kullanici = require("../models/kullanici")

const auth = require("../helpers/auth");

const router = express.Router();

//Returns all StokKabuls
router.get("/hepsi", auth, (req, res) => {
    try {
      StokKabul.getStokKabuls((err, stokKabls) => {
        if (err) {
          throw err;
        }
        res.json(stokKabls);
      });
  
    } catch (error) {
      console.log("Stok Kabul Belgeleri getirilirken hata meydana geldi");
    }
  
  });

router.post("/ekle",auth,(req,res)=>{
    const stokKabulBelgesi = req.body
    try {
        Kullanici.getKullanicibyKullaniciAdi(stokKabulBelgesi.kimTarafindanOlusturuldu,(err,usr)=>{
            if(err){
                throw err;
            }
            if(usr.kullaniciRol===("admin"||"Yönetici"||"Veznedar")){
                StokKabul.addStokKabul(stokKabulBelgesi,(err,rs)=>{
                    if(err){
                        throw err;
                    }                    
                    console.log("Stok Kabul Belgesi "+ usr.kullaniciAdi+" tarafından Eklendi");
                    res.json(rs);
                })

            }
            else{
                console.log("Sayın"+usr.kullaniciAdi+" stokKabul belgesi oluşturmaya yetkili değilsiniz.")
                res.status(401).send("StokKabul belgesi eklemeye yetkili değilsiniz.")
            }
        })

        
    } catch (error) {
        console.log(error)
    }
})





module.exports = router;