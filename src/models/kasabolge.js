const mongoose = require("mongoose")

const kasabolgeSchema = mongoose.Schema({
    kasaBolgeAdi:{
        type:String
    },
    kasaBolgeOlusturmaTarihi:{
        type:Date,
        default:Date.now
    },
    kasaBolgeOlusturan:{
        type:String
    },
    kasaBolgeDegistiren:{
        type:String,
        default:"Orjinal"
    },
    kasaBolgeDegistirmeTarihi:{
        type:Date,
        default:Date.now
    }
})

const kasabolge =(module.exports = mongoose.model("kasabolge",kasabolgeSchema))


//kasabolgeleri Getirme
module.exports.getkasaBolges =(callback,limit) =>{
    try {
        kasabolge.find(callback).limit(limit);
    } catch (error) {
        console.log("kasaBölgeleri getirilirken hata oluştu "+error)
    }
}

//kasabölge güncelleme
module.exports.updateKasabolge = (id,_kasabolge,options,callback)=>{
    var query = {
        _id: id
    };
    var update = {
        kasaBolgeAdi: _kasabolge.kasaBolgeAdi,
        kasaBolgeDegistiren:_kasabolge.kasaBolgeDegistiren,
        kasaBolgeDegistirmeTarihi:Date.now
    };

    try {
        kasabolge.findByIdAndUpdate(query,update,options,callback)
        
    } catch (error) {
        console.log(_kasabolge.kasaBolgeAdi+" adlı kasabölgesi değiştirilemedi.")
    }
}


//Kasabölge ekleme
module.exports.addKasaBolge =(_kasabolge,callback) =>{
    try {
        kasabolge.create(_kasabolge,callback)
    } catch (error) {
        console.log("Kasabolge eklenirken hata oluştu. "+error)
    }
}

//ID ile kasabölgesi getir
module.exports.getKasabolgeById =(_id,callback) =>{
    try {
        kasabolge.findById(_id,callback)
    } catch (error) {
        console.log("ID ile kasabolgesi getirilemedi "+error)
    }
}

//ID ile kasabölgesi sil
module.exports.deleteKasabolgeById =(id,callback)=>{
    var query = {_id:id}
    try {
        kasabolge.deleteOne(query,callback)
    } catch (error) {
        console.log("kasabölge silinirken hata ile karşılaşıldı "+error)
    }
}

//kasabolge Adı ile kasabölge bul
module.exports.getkasabolgeByAd = (_kasabolgeAdi,callback)=>{
    var query ={kasaBolgeAdi:_kasabolgeAdi}

    try {
        kasabolge.findOne(query,callback)
    } catch (error) {
        console.log("kasabolge Adı ile aranırken hata oluştu "+error)
    }
}