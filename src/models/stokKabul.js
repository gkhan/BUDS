const mongoose =require("mongoose");

const StokKabulSchema = mongoose.Schema({
    urunID:{
        type:String
    },
    urunAdi:{
        type:String
    },
    belgeGirisMi:{
        type:Boolean
    },
    stokBolge:{
        type:String
    },
    adet:{
        type:Number
    },
    olusturulmaTarihi:{
        type:Date,
        default:Date.now
    },
    kimTarafindanOlusturuldu:{
        type:String
    },
    kimTarafindanGuncellendi:{
        type:String,
        default:"Orjinal"
    },
    guncellenmeTarihi:{
        type:Date,
        default:Date.now
    },
    seriNo:{
        type:Number
    },
    aktifMi:{
        type:Boolean,
        default:true
    },
    cikisMakbuzID:{
        type:String,
        default:"-"
    }
})

const stokKabul = (module.exports= mongoose.model('stokKabul',StokKabulSchema))

// ÜrünStokları getir
module.exports.getStokKabuls = (callback,limit)=>{
    try {
        stokKabul.find(callback).limit(limit);
    } catch (error) {
        console.log(error)   
    }
};

//IDsi verileni getir
module.exports.getStokKabulByID = (id,callback)=>{
    try {
        stokKabul.findById(id,callback);
    } catch (error) {
        console.log(error+"IDsi verilen stok-kabul belgesi getirilirken hata oluştu")
    }
};

//Kabul Belgesi Ekleme
module.exports.addStokKabul = (stkkbl,callback)=>{
    try {
        stokKabul.create(stkkbl,callback);
    } catch (error) {
        console.log(error)
    }
};

//urunAdi ile stok Kabul belgesi getir
module.exports.getStokKabulByUrunAdi =(urunadi,callback)=>{
    var query={
        urunAdi:urunadi
    }

    try {
        stokKabul.find(query,callback)

    } catch (error) {
        console.log(error)
    }
};

//stok kabul belgesi güncelle
module.exports.updateStokKabul =(id, stokkbl, options, callback)=>{
    var query={
        _id:id
    }
    var update = {
        urunID: stokkbl.urunID,
        urunAdi: stokkbl.urunAdi,
        adet:stokkbl.adet,
        kimTarafindanGuncellendi:stokkbl.kimTarafindanGuncellendi,
        guncellenmeTarihi:Date.now,
        belgeGirisMi:stokkbl.belgeGirisMi,
        seriNo:stokkbl.seriNo
    };

    try {
        stokKabul.findByIdAndUpdate(query,update,options,callback);
    } catch (error) {
        console.log(error)
    }


}
