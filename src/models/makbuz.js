
const mongoose = require('mongoose');


const makbuzSchema = mongoose.Schema({
    makbuzSeriNo:{
        type:String,
        default:""
    },
    makbuzNo: {
        type: Number,
        default:0
    },
    urunler: {
        type: Array,
        default: []
    },
    makbuzMutemetBolgesi: {
        type: String,
        required:true
    },
    makbuzTarihi: {
        type: Date,
        default: Date.now
    },
    makbuzKaydeden: {
        type: String,
        required: true
    },
    makbuzDegistiren: {
        type: String,
        default: "orjinal"
    },
    makbuzDegistirmeTarihi: {
        type: Date,
        default: Date.now
    },
    makbuzTutari: {
        type: Number,
        default: 0
    },
    tcnoVergiNo: {
        type: Number
    },
    isletmeAdiAdSoyad: {
        type: String
    },
    isletmeAdres: {
        type: String
    },
    makbuzOdemeAlan: {
        type: String,
        default: "Odenmedi"
    },
    makbuzAsamasi:{
        type: String,
        default:"Makbuz Oluşturuldu"
    },
    evrakKayitNumarasi:{
        type: Number
    },
    odemeSekli:{
        type:String
    }

})

const makbuz = (module.exports = mongoose.model("makbuz", makbuzSchema))

//makbuzları getir
module.exports.getMakbuzs = (callback, limit) => {
    makbuz.find(callback).limit(limit);
};

//makbuz no su verilen makbuzu getir
module.exports.getMakbuzByMakbuzNo = (makbuzNo_, callback) => {
    var query = {
        makbuzNo: makbuzNo_
    };
    try {
    makbuz.find(query, callback);
        
    } catch (error) {
        console.log(error);
    }
};

//BelgeOluşturanın makbuzlarını getir
module.exports.getMakbuzsByMakbuzKaydeden =(makbz_,callback)=>{
    var query ={
        makbuzKaydeden:makbz_.makbuzKaydeden
    };

    try {
        makbuz.find(query,callback);        
    } 
    catch (error) {
        console.log(error)
    }
}

//makbuz ekle
module.exports.addMakbuz = (makbuzp, callback) => {
    try {
    makbuz.create(makbuzp, callback);
        
    } catch (error) {
        console.log(error);
    }
};

//id'si verilen makbuzu getir
module.exports.getMakbuzById = (id, callback) => {
    try {
    makbuz.findById(id, callback);
    
    } catch (error) {
        console.log(error);
    
}

};

//id'si verilen makbuzu sil
module.exports.deleteMakbuz = (id, callback) => {
    var query = {
        _id: id
    };
    try {
        makbuz.deleteOne(query, callback);
        
    } catch (error) {
        console.log(error)
    }
};

//makbuzu güncelleme işlemi
module.exports.updateMakbuz = (id, makbuzp, options, callback) => {
    var query = {
        _id: id
    };
    var update = {
        urunler: makbuzp.urunler,
        makbuzDegistiren: makbuzp.makbuzDegistiren,
        makbuzDegistirmeTarihi: Date.now(),
        makbuzTutari: makbuzp.makbuzTutari,
        makbuzOdemeAlan: makbuzp.makbuzOdemeAlan,
        makbuzAsamasi:makbuzp.makbuzAsamasi,
        odemeSekli:makbuzp.odemeSekli
    };
    try {
        makbuz.findByIdAndUpdate(query, update, options, callback);

    } catch (error) {
        
    }
};

//Bölgedeki Ödenmemiş Makbuzları getirir
module.exports.getMakbuzsBolgeVeOdenmemis = (_makbuzMutemetBolgesi, callback) => {
    var query = {
        makbuzMutemetBolgesi: _makbuzMutemetBolgesi,
        makbuzOdemeAlan: "Odenmedi"
    };
    try {
        makbuz.find(query, callback);

    } catch (error) {
        
    }
};