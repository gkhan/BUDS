const mongoose = require('mongoose')

const firmaSchema = mongoose.Schema({   
    tcNoVergiNo:{
        type:Number
    },
    adSoyadFirmaAd:{
        type:String
    },
    adres:{
        type:String
    },
    firmaKayitTarihi:{
        type:Date,
        default:Date.now
    },
    firmaDegistirilmeTarihi:{
        type:Date,
        default:Date.now
    },
    firmaKaydeden:{
        type:String
    },
    firmaDegistiren:{
        type:String,
        default:"orijinal"
    },
    firmaAktifMi:{
        type: Boolean,
        default:true
    }


})

const firma =(module.exports= mongoose.model("firma",firmaSchema));

//Firmaları/kişi şirketlerini getir
module.exports.getFirmas = (callback, limit) => {
    try {
        firma.find(callback).limit(limit);
    } catch (error) {
        console.log(error);
    }
};

//ID si verilen firma getir
module.exports.getFirmaById= (_id,callback)=>{
    try {
    firma.findById(_id,callback);
        
    } catch (error) {
        console.log(error);
    }
};

//yeni firma oluştur
module.exports.addFirma = (_firma,callback)=>{
    try {
    firma.create(_firma,callback);
        
    } catch (error) {
        console.log(error);
    }
};

//ID si verilen firma sil
//Silinirken Rol kontrolü yapılacak
module.exports.deleteFirma =(id,callback)=>{
    try {        
    var query ={_id:id};
    firma.delete(query,callback);

    } catch (error) {
        console.log(error)
    }
};

//Adı '_tcVergino' ile başlayan verilen firmayı getir
module.exports.getFirmaBytcVergiNo = (_tcVergino, callback) => {
    var query = {
        tcNoVergiNo: _tcVergino
    };

    try {
        firma.findOne(query, callback);

    } catch (error) {
        console.log(error)
    }

};


//Adı 'search' ile başlayan verilen firmaları getir
module.exports.getFirmasByFirmaAdiBaslayan = (search,callback) => {   
    var query = {
        adSoyadFirmaAd:new RegExp(search,'i')
    };
    try {
        firma.find(query,callback).limit(5);

    } catch (error) {

    }
};

//tc veya vergino 'search' ile başlayan verilen firmaları getir
module.exports.getFirmasByTcVergiNoBaslayan = (search,callback) => {   
    var query = {
        tcNoVergiNo:new RegExp(search,'i')
    };
    try {
        firma.find(query,callback).limit(5);

    } catch (error) {

    }
};


//firma güncelle
module.exports.updateFirma = (id, firmap, options, callback) => {
    var query = {
        _id: id
    };
    var update = {
        tcNoVergiNo: firmap.tcNoVergiNo,
        adSoyadFirmaAd: firmap.adSoyadFirmaAd,
        adres: firmap.adres,
        firmaDegistirilmeTarihi: firmap.firmaDegistirilmeTarihi,
        firmaAktifMi:firmap.firmaAktifMi
    };
    try {
    firma.findByIdAndUpdate(query, update, options, callback);
        
    } catch (error) {
        console.log(error);
        
    }
};