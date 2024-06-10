const express=require('express');

const auth = require("../helpers/auth");
const Kasabolge = require("../models/kasabolge")

const router =express.Router()


//kasaBölge ekleme yolu--KasaAdı Aynı ise ekleme Yapmaz
//KullanıcıRol Kontrolü de eklenecek**
router.post("/ekle",auth,(req,res)=>{
    const kasabolge =req.body

    try {
        Kasabolge.getkasabolgeByAd(kasabolge.kasaBolgeAdi,(err,res_)=>{
            if(err){
                throw err
            }
            if(res_===null){
                res.json(Kasabolge.addKasaBolge(kasabolge))
                console.log(kasabolge.kasaBolgeAdi+" Adı kasaBölgesi eklenmiştir")
            }
            else{
                console.log(kasabolge.kasaBolgeAdi+" adlı kasa zaten ekli lütfen başka bölge adı giriniz.")
            }

        })
        
    } catch (error) {
        console.log("kasabolge ekleme rotasında hata oluştu. hata:"+error)
    }
})

//kasaBölge değiştirme yolu
router.put("/degistir/:_id",auth,(req,res)=>{
    const id = req.params._id
    const uptKasabolge = req.body

    Kasabolge.updateKasabolge(id,uptKasabolge,{},(err,res_)=>{
        if(err){
            throw err
        }

        res.json(res_)
    })

})

//Kasabölgelerinin hepsini getirme yolu
//Kasaların Hepsini Getirmek Sadece Yönetici Arayüzünde İşe Yarayacak**
router.get("/hepsi",auth,(req,res)=>{
    Kasabolge.getkasaBolges((err,kasabolges)=>{
        if(err){
            throw err
        }
        res.json(kasabolges)
    })
})

//Kasabölge silme yolu
//KullanıcıRol kontrolü de yapılacak**
router.delete("/sil/:_id",auth,(req,res)=>{
    const id = req.params._id

    Kasabolge.deleteKasabolgeById((err,kasabolge_)=>{
        if(err){
            throw err
        }
        res.json(kasabolge_)
    })
})

module.exports = router