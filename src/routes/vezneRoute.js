const express = require("express");
const Vezne = require("../models/vezne")

const auth = require("../helpers/auth");

const router = express.Router();

//Vezneleri getir
router.get("/hepsi",auth,(req,res)=>{
    try {
        Vezne.getVeznes((err,_veznes)=>{
            if(err){
                throw err
            }
            res.json(_veznes)
        })
        
    } catch (error) {
        console.log(error)
        
    }
})

//ID ile vezne getir
router.get("/bulid/:_id",auth,(req,res)=>{
    const id =req.params._id

    try {
        Vezne.getVezneById(id,(err,_v)=>{
            if(err){
                throw err
            }
            res.json(_v)
        })
        
    } catch (error) {
        console.log(error)
    }

})

//yeni vezne oluştur
router.post("/ekle",auth,(req,res)=>{
    const veznep = req.body


    try {
        Vezne.addVezne(veznep,(err,v)=>{
            if(err){
                throw err
            }
            res.json(v)
        })
    } catch (error) {
        console.log(error)
    }
})

//silme işlemi vezne
router.delete("/sil/:_id",auth,(req,res)=>{
    const id = req.params._id

    try {
        Vezne.deleteVezneById(id,(err,_v)=>{
            if(err){
                throw err
            }
            res.json(_v)
        })
    } catch (error) {
        console.log(error)
    }
})

//Vezne Güncelleme
router.put("/degistir/:_id",auth,(req,res)=>{
    const id = req.params._id
    const deVezne= req.body

    var update = {
        vezneNo:deVezne.vezneNo,
        vezneAdi: deVezne.vezneAdi,
        vezneBolgesi:deVezne.vezneBolgesi,
        vezneAktifMutemetID:deVezne.vezneAktifMutemetID,
        vezneMutemetleriID:deVezne.vezneMutemetleriID,
        vezneAktifSayacID:deVezne.vezneAktifSayacID,
        vezneAktifKasaID:deVezne.vezneAktifKasaID,
        vezneKasalarID:deVezne.vezneKasalarID,
        guncellemeTarihi:deVezne.guncellemeTarihi
    };

    try {
        Vezne.updateVezne(id,update,(err,_v)=>{
            if(err){
                throw err
            }
            res.json(_v)
        })
    } catch (error) {
        console.log(error)
    }
})



module.exports = router