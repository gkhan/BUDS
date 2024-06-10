const mongoose = require('mongoose');

const kasaSchema = mongoose.Schema({
    kasaNo:{
        type:Number,
        default:0
    },
    makbuzlar:{
        type:Array,
        default:[]
    },
    kasaDefteriArsivMi:{
        type:Boolean,
        default:false
    },
    bankayaGonderimTarihi:{
        type: Date,
        default:Date.now
    },
    bankayaGonderenKisi:{
        type:String,
        default:"Atanmadi"
    },
    kasaTutari:{
        type:Number,
        default:0
    },
    kasaAcilisTarihi:{
        type:Date,
        default:Date.now
    },
    kasaBolgesi:{
        type:String,
        default:"Atanmadi"
    },
    dekontNo:{
        type:Number,
        default:0
    }
})

const kasa = (module.exports = mongoose.model("kasa",kasaSchema));

//kasaları getir
module.exports.getKasas = (callback,limit)=>{
    kasa.find(callback).limit(limit);
};

//yeni kasa oluştur
module.exports.addKasa = (_kasa,callback)=>{
    kasa.create(_kasa,callback);
};

//ID si verilen kasayı getir
module.exports.getKasaById= (_id,callback)=>{
    kasa.findById(_id,callback);
};

//ID si verilen kasayı sil
module.exports.deleteKasa =(id,callback)=>{
    var query ={_id:id};
    kasa.delete(query,callback);
};

//aktif kasa her zaman arşive aktarılmamış kasa olduğundan
module.exports.getKasaByArsivMi =(_bool,bolge,callback)=>{
    var query={
        kasaDefteriArsivMi:_bool,
        kasaBolgesi:bolge
                };
    kasa.findOne(query,callback);
};

module.exports.updateKasa = (id,_kasa,options,callback) => {
    var query = {_id:id};
    var update = {
        makbuzlar:_kasa.makbuzlar,
        kasaTutari: _kasa.kasaTutari,
        kasaDefteriArsivMi:_kasa.kasaDefteriArsivMi,
        bankayaGonderimTarihi:_kasa.bankayaGonderimTarihi,
        bankayaGonderenKisi:_kasa.bankayaGonderenKisi,
        kasaBolgesi:_kasa.kasaBolgesi,
        dekontNo:_kasa.dekontNo

    };
    kasa.findByIdAndUpdate(query,update,options,callback);
}