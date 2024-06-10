const mongoose = require('mongoose');

const vezneSchema = mongoose.Schema({
    vezneNo:{
        type:Number,
        default:0
    },
    vezneAdi:{
        type:String,
        default:"Atanmadi"
    },
    vezneBolgesi:{
        type:String,
        default:"Atanmadi"
    },
    vezneAktifMutemetID:{
        type:String,
        default:"Atanmadi"
    },
    vezneMutemetleriID:{
        type:Array,
        default:[]
    },
    vezneAktifSayacID:{
        type:String,
        default:"Atanmadi"
    },
    vezneAktifKasaID:{
        type:String,
        default:"Atanmadi"
    },
    vezneKasalarID:{
        type:Array,
        default:[]
    },
    olusturmaTarihi:{
        type:Date,
        default:Date.now
    },
    guncellemeTarihi:{
        type:Date,
        default:Date.now
    }
    
})

const vezne = (module.exports = mongoose.model("vezne",vezneSchema));

//VezneleriGetir
module.exports.getVeznes = (callback,limit)=>{
    vezne.find(callback).limit(limit)
}

//Yeni vezne oluştur
module.exports.addVezne = (_vezne,callback)=>{
    vezne.create(_vezne,callback)
}

//ID ile vezne getir
module.exports.getVezneById = (_id,callback)=>{
    vezne.findById(_id,callback)
}

//vezne Sil
module.exports.deleteVezneById = (id,callback)=>{
    var query ={_id:id};
    vezne.delete(query,callback)
}

//vezne Güncelleme
module.exports.updateVezne = (id,_vezne,options,callback)=>{
    var query = {_id:id};
    var update = {
        vezneNo:_vezne.vezneNo,
        vezneAdi: _vezne.vezneAdi,
        vezneBolgesi:_vezne.vezneBolgesi,
        vezneAktifMutemetID:_vezne.vezneAktifMutemetID,
        vezneMutemetleriID:_vezne.vezneMutemetleriID,
        vezneAktifSayacID:_vezne.vezneAktifSayacID,
        vezneAktifKasaID:_vezne.vezneAktifKasaID,
        vezneKasalarID:_vezne.vezneKasalarID,
        guncellemeTarihi:_vezne.guncellemeTarihi
    };

    vezne.findByIdAndUpdate(query,update,options,callback)
}