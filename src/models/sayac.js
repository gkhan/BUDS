const mongoose = require('mongoose');

const sayacSchema = mongoose.Schema({
    sayacAdi:{
        type:String
    },
    sayacOlusturan:{
        type:String
    },
    sayacDegistiren:{
        type:String,
        default:"orjinal"
    },
    sayacOlusturulmaTarihi:{
        type:Date,
        default:Date.now
    },
    sayacGuncellemeTarihi:{
        type:Date,
        default:Date.now
    },
    sayacAraligiSeriNo:{
        type:String
    },
    sayacAraligiBaslangic:{
        type:Number
    },
    sayacAraligiBitis:{
        type:Number
    },
    sayacDegeri:{
        type:Number
    },
    sayacAktifMi:{
        type:Boolean,
        default:false
    },
    sayacArsivMi:{
        type:Boolean,
        default:false
    }

})

const sayac = (module.exports = mongoose.model("sayac",sayacSchema))

module.exports.getSayacs= (callback,limit)=>{
    sayac.find(callback).limit(limit);
}


//sayaçadı ile sayaç getirme - saya
module.exports.getSayacsBySayacAdi = (_sayacAdi,callback) => {
    var query = {
        //sayacAdi:new RegExp(_sayacAdi,'i')
        sayacAdi:_sayacAdi
    };
    try {

        sayac.find(query,callback);
    }     
    catch (error) {
        console.log("Sayaçadı ile aranırken hata oluştu. "+error)
    }

}

//AktifMi ile sayaç getirme
module.exports.getAktifSayac = (_sayac,callback) => {
    var query = {
        sayacAdi:_sayac.sayacAdi,
        sayacAktifMi: true,

    };
    try {

        sayac.findOne(query,callback);
    }     
    catch (error) {
        console.log("AktifMi ile aranırken hata oluştu. "+error)
    }

}

//id ile sayaç getir
module.exports.getSayacById =(_id,callback) => {
    try {   
        sayac.findById(_id,callback);
        
    } catch (error) {
        console.log("sayac getirilirken hata oluştu. "+error);
    }
}

module.exports.addSayac = (sayac_,callback) => {
    try {
        sayac.create(sayac_,callback)
        
    } catch (error) {
        console.log("Sayac Eklerken Hata oluştu "+error)
    }
}

module.exports.updateSayac = (id,sayacp,options,callback) =>{

    var query = {
        _id: id
    };
    var update = {
        sayacAdi: sayacp.sayacAdi,
        sayacDegistiren: sayacp.sayacDegistiren,
        sayacGuncellemeTarihi: Date.now(),
        sayacAraligiSeriNo:sayacp.sayacAraligiSeriNo,
        sayacAraligiBaslangic: sayacp.sayacAraligiBaslangic,
        sayacAraligiBitis: sayacp.sayacAraligiBitis,
        sayacDegeri:sayacp.sayacDegeri,
        sayacAktifMi:sayacp.sayacAktifMi,
        sayacArsivMi:sayacp.sayacArsivMi
    };
    

    try {
        sayac.findByIdAndUpdate(query,update,options,callback)
        
    } catch (error) {
        console.log("Sayac Güncellenirken Hata Oluştu "+error)
    }

}

module.exports.deleteSayac = (id,callback) =>{
    var query ={
        _id:id
    }

    try {
        sayac.deleteOne(query,callback)
        
    } catch (error) {
        console.log("Sayaç silinirken hata meydana geldi Hata Mesajı:"+error)
    }

}