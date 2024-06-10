const express = require("express");
const Sayac = require("../models/sayac")

const auth = require("../helpers/auth");

const router = express.Router();

//Sayaç Arttır--Sayaç arttırılır , eğer sınıra ulaşmışsa, arşivlenir, arşivlenen sayaçlar editlenmez.
router.put("/sayac-arttir",auth,(req,res)=>{
    const s_ = req.body;
    s_.sayacDegeri +=1;
    try {

        //Eğer Sayaç başlangıç değerinden azsa veya bitiş değerinden fazla ise sayaç hatalıdır. işlem yapmaz.
        if(s_.sayacDegeri<s_.sayacAraligiBaslangic||s_.sayacDegeri>s_.sayacAraligiBitis){
            console.log("Sayaç Değeri hatalı. Lütfen sayaç değerini değiştiriniz.");
            res.status(404).send("Hatalı Sayaç Değeri Lütfen Sayaç Değerini Kontrol Edin")
        }

        //Eğer Sayaç Değeri Bitiş değerine ulaşırsa sayacı arşivlenir.
        else if((s_.sayacDegeri-1)===s_.sayacAraligiBitis){
            s_.sayacArsivMi=true;
            s_.sayacAktifMi=false;
            s_.sayacDegeri-=1;

            console.log(s_.sayacAdi+" Seri:"+s_.sayacAraligiSeriNo+" Sayaç sonu");

            Sayac.updateSayac(s_._id,s_,{},(err,sayac_)=>{
                if(err){
                    throw err;
                }
                console.log(s_.sayacAdi+" Sayaç sonuna gelindi,Sayaç Arşivlendi");
                res.json(sayac_)
            }) 
        }
        //Sayaç Değeri Normal ise, sayacı arttır
        else if(s_.sayacDegeri>=s_.sayacAraligiBaslangic&&s_.sayacDegeri<s_.sayacAraligiBitis){
            Sayac.updateSayac(s_._id,s_,{},(err,sayac_)=>{
                if(err){
                    throw err;
                }
                console.log(s_.sayacAdi+ " Sayaç Değeri Arttırıldı. Yeni Değer: "+s_.sayacDegeri);
                res.json(sayac_)
            })
        }

    } catch (error) {
        console.log(s_.sayacAdi+" SeriNo: "+s_.sayacAraligiSeriNo+" Sayacı arttırılırken hata oluştu."+error)
    }
})

//Sayacı Aktif Sayaç Haline Getir
router.post("/aktiflestir",auth,(req,res)=>{
    const say_ = req.body;

    try {
    //Pasif Sayaç Var Mı? Kontrol et ,yoksa Aktifleştir.
    Sayac.getAktifSayac(say_,(err,res_sayac)=>{
        if(err){
            throw err
        }
        //
        if(res_sayac===null){
            say_.sayacAktifMi=true;
            Sayac.updateSayac(say_._id,say_,{},(err,s_)=>{
                if(err){
                    throw err
                }
                res.json(s_);
            })
        }
        else{
            res_sayac.sayacAktifMi=false;
            Sayac.updateSayac(res_sayac._id,res_sayac,{},(err,sp)=>{
                if(err){
                    throw err;
                }
                say_.sayacAktifMi=true;
                Sayac.updateSayac(say_._id,say_,{},(err,s_)=>{
                if(err){
                    throw err
                }
                res.json(s_);
            })

            })
        }
    })


    } catch (error) {
        
    }
   
})

//Sayacı Pasif Sayaç Haline Getir
router.post("/pasiflestir",auth,(req,res)=>{
    const say_ = req.body;

    try {
    
            say_.sayacAktifMi=false;
            Sayac.updateSayac(say_._id,say_,{},(err,s_)=>{
                if(err){
                    throw err
                }
                res.json(s_);
            })
    
        


        } catch (error) {
        
    }
   
})

//Sayaç Adı İle Bul- Tamad İle Çalışır.
router.post("/bul-ad",auth,(req,res)=>{
    const arama = req.body

    Sayac.getSayacsBySayacAdi(arama.search,(err,res_)=>{
        if(err){
            console.log("Sayac arama başarısız isimli sayac bulunamadı, hata kodu: "+err)
        }
        res.json(res_)
    })
})

//Adı Verilen Bölgenin Aktif Sayacını getir
router.post("/bolge-aktif",auth,(req,res)=>{
    const sy = req.body

    Sayac.getAktifSayac(sy,(err,res_)=>{
        if(err){
            console.log(err)
        }
        res.json(res_)
        
    })
})

//SayacID ile Bul-- Bu sadece sayaç IDsi için çalışır, tekli çalışması hızlansın diye
router.get("/bul-id/:_id",auth,(req,res)=>{
    const id = req.params._id;
    try {
        Sayac.getSayacById(id,(err,_sayac)=>{
            if(err){
            console.log("ID ile sayaç arama başarısız hata kodu: "+err)
            }

            res.json(_sayac)
        })

    } 
    catch (error) {
        console.log(id+" id numaraları sayac getirilemedi hatalı id " +error)
    }

})

//Sayaç Oluşturma
router.post("/ekle",auth,(req,res)=>{
    const sayac = req.body

    //ilk Sayaç Değeri Sayaç aralığı başlangıç değeri olarak- arşiv:false, aktif:false olarak ekleniyor
    const eklenecekSayac ={
        sayacAdi:sayac.sayacAdi,
        sayacOlusturan:sayac.sayacOlusturan,
        sayacAraligiSeriNo:sayac.sayacAraligiSeriNo,
        sayacAraligiBaslangic:sayac.sayacAraligiBaslangic,
        sayacAraligiBitis:sayac.sayacAraligiBitis,
        sayacDegeri:sayac.sayacAraligiBaslangic,
        sayacAktifMi:false,
        sayacArsivMi:false

    }



    try {
        Sayac.addSayac(eklenecekSayac,(err,pSayac)=>{
            if(err){
                throw err
            }
            console.log(pSayac.sayacAdi+" adlı sayaç eklendi.")
            res.json(pSayac)
        })
    }     
    catch (error) {
        console.log(sayac.sayacAdi+" ile başlayan sayac eklenirken hata oluştu. "+error)
    }

})

//sayaç silme
router.delete("/sil/:_id",auth,(req,res)=>{
    const id = req.params._id
    try {
        Sayac.deleteSayac(id,(err,_sayac)=>{
            if(err){
                throw err;
            }
            console.log(_sayac.sayacAdi+" isimli sayaç silindi.")
            res.status(200).json(_sayac)
        })
        
    } catch (error) {
        console.log("sayac silinirken hata oluştu")
    }
})

//sayaçları getir
router.get("/hepsi",auth,(req,res)=>{
    try {
        Sayac.getSayacs((err,sayacs_)=>{
            if(err){
                throw err
            }
            
            res.status(200).json(sayacs_)
        })
        
        
    } catch (error) {
        console.log("Sayaçlar Getirilirken Hata Meydana geldi, Hata: "+error)
    }
})

//Sayaç güncelle
router.put("/degistir/:_id",auth,(req,res)=>{
    const id =req.params._id
    const sayacp =req.body
    try {
        
        Sayac.updateSayac(id,sayacp,{},(err,sayac_)=>{
            if(err){
                throw err
            }
            console.log("Sayaç güncelleme başarılı")
            res.status(200).json(sayac_)
        })

        
    } catch (error) {
        
    }
})

module.exports = router;