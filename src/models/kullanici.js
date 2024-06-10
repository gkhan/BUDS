const mongoose = require("mongoose");

const kullaniciSchema = new mongoose.Schema({
    kullaniciAdi:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    kullaniciBolge:{
        type:String
    },
    kullaniciRol:{
        type:String
    },
    KullaniciKayitTarihi:{
        type:Date,
        default:Date.now
    },
    token:{
        type:String
    },
    kullaniciAktifMi:{
        type:Boolean,
        default:true
    }
});

const kullanici =(module.exports = mongoose.model("kullanici",kullaniciSchema));

//yeni kullanıcı ekle
module.exports.addKullanici =(kullanici_,callback)=>{
    try {
        kullanici.create(kullanici_,);

    } catch (error) {
        console.log(error);
    }
};

//kullanıcıları getir
module.exports.getKullanicis = (callback,limit)=>{
    try {
        kullanici.find(callback).limit(limit);
    
} catch (error) {
    console.log(error)
    
}};

//bölgesi verilen kullaniciları getir
module.exports.getKullaniciByKullaniciBolge = (kullaniciBolge_,callback)=>{
    var query = {kullaniciBolge:kullaniciBolge_};
    try {
    kullanici.find(query,callback);
        
    } catch (error) {
        console.log(error);
        
    }
};

//Adı '_kullaniciAdi' ile başlayan verilen kullanıcıyı getir
module.exports.getKullanicibyKullaniciAdi = (_kullaniciAdi,callback)=>{
    var query ={ kullaniciAdi:_kullaniciAdi};
    try {
    kullanici.findOne(query,callback);
    
    } catch (error) {
    console.log(error)
    }
};

//kullanici sil
module.exports.deleteKullanici = (kullaniciId,callback)=>{
    var query = {_id:kullaniciId};
    try {
    kullanici.deleteOne(query,callback);
        
    } catch (error) {
        console.log(error);
    }
};

//kullanıcı güncelle
module.exports.updateKullanici = (id,kullanici_,options,callback) => {
    var query = {_id:id};
    var update = {
        kullaniciAdi:kullanici_.kullaniciAdi,
        email: kullanici_.email,
        kullaniciBolge:kullanici_.kullaniciBolge,
        kullaniciRol:kullanici_.kullaniciRol,
        token:kullanici_.token,
        kullaniciAktifMi:kullanici_.kullaniciAktifMi
    };
    try {
    kullanici.findByIdAndUpdate(query,update,options,callback);        
    } catch (error) {
        console.log(error);
    }
}