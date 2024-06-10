const express = require("express");
const Kasa = require("../models/kasa")
const auth = require("../helpers/auth");


const router = express.Router();

//Aktif Kasa Tamamen Değişecek, Kasaya Makbuz Sadece SAYAÇ var ise eklenecek**
router.post("/aktif", auth, (req, res) => {
    const kullanici = req.body;

    try {
        Kasa.getKasaByArsivMi(false, kullanici.kullaniciBolge, (err, res_) => {
            if (err) {
                throw err;
            }
            // console.log("çalıştı");
            // console.log(res_);
            //aktif olan yoksaburaya yeni kasa oluştur ve onu response olarak döndür gelecek
            if (res_ === null) {
                
                //addkasa işlemi gelicek
                const yeniKasa = {
                    bankayaGonderimTarihi: null,
                    bankayaGonderenKisi: null,
                    kasaBolgesi: kullanici.kullaniciBolge
                }
                console.log(yeniKasa.kasaBolgesi+" eklendi");
                res.json(Kasa.addKasa(yeniKasa));
            } else{
                res.json(res_);
            }
        });


    } catch (error) {
        console.log("kasa getirilirken hata ile karşılaşıldı.");
    }

});

//Makbuz Eklemelerinde kullanılıyor, başka ekleme yolu yapılacak**
router.put("/degistir/:_id", auth, (req, res) => {
    const id = req.params._id;
    const _kasa = req.body;

    try {
        Kasa.updateKasa(id, _kasa, {}, (err, kasa) => {
            if (err) {
                throw err;
            }
            res.status(200).json(kasa);

        })

    } catch (error) {

    }

})

//Kasa kapatma ve gönderim işlemi
router.post("/kasa-arsivle",auth,(req,res)=>{
    const _kasa = req.body;
    try {
        _kasa.bankayaGonderimTarihi=Date.now;
        _kasa.kasaDefteriArsivMi=true;

        Kasa.updateKasa(_kasa._id,_kasa,{},(err,kasa)=>{
            if(err){
                throw err;
            }
            res.status(200).json(kasa);
        })

    } catch (error) {
        console.log(error);
    }
})


module.exports = router;