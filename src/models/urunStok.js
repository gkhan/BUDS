const mongoose =require('mongoose')

const urunStokSchema = mongoose.Schema({
    urunID:{
        type:String
    },
    urunAdi:{
        type:String
    },
    stok:{
        type:Number
    },
    stokBolge:{
        type:String
    },
    olusturulmaTarihi:{
        type:Date,
        default:Date.now
    },
    kimTarafindanOlusturuldu:{
        type:String,
    },
    kimTarafindanGuncellendi:{
        type:String,
        default:"Orjinal"
    },
    guncellenmeTarihi:{
        type:Date,
        default:Date.now
    },
    aktifMi:{
        type:Boolean,
        default:true
    }


})

const urunStok = (module.exports= mongoose.model('urunStok',urunStokSchema))

// ÜrünStokları getir
module.exports.getUrunStoks = (callback,limit)=>{
    try {
        urunStok.find(callback).limit(limit);
    } catch (error) {
        console.log(error)   
    }
};

//id'si verilen ürünStock getir
module.exports.getUrunStokById = (id, callback) => {
    try {
        urunStok.findById(id, callback);


    } catch (error) {
        console.log("urunStok getirilirken hata oluştu "+error)
    }
};

//Adı '_urunadi' ile başlayan verilen ürün stoğunu getir
module.exports.getUrunStokByUrunAdiAndBolge = (_urunstk, callback) => {

    var query = {
        urunAdi: _urunstk.urunAdi,
        stokBolge:_urunstk.stokBolge
    };
    try {
        urunStok.findOne(query, callback);

    } catch (error) {
        console.log("ÜrünStok 'ADI'  ile aranırken hata oluştu");
    }

};

//Adı ile başlayan ürünstokları getir
module.exports.getUrunStoksByAdiylaBaslayan =(search,callback)=>{
    var query = {
        urunAdi:new RegExp(search,'i')
    };
    try {
        urunStok.find(query,callback).limit(5);

    } catch (error) {
        console.log(search+ " ile aranırken UrunStok sorgusunda hata oluştu")
    }
};

//Urunstok Ekle
module.exports.addUrunStok =(urunstok_,callback)=>{
    try {
        urunStok.create(urunstok_,callback)
    } catch (error) {
        console.log(urunstok_+" eklenirken Hata Meydana geldi");
    }
};

//Urunstok Güncelle
module.exports.updateUrunstok =(id, urunStokp, options, callback)=>{
    var query = {
        _id: id
    };
    var update = {
        urunID: urunStokp.urunID,
        urunAdi: urunStokp.urunAdi,
        stok:urunStokp.stok,
        kimTarafindanGuncellendi:urunStokp.kimTarafindanGuncellendi,
        guncellenmeTarihi:urunStokp.guncellenmeTarihi
    };
    try {
    urunStok.findByIdAndUpdate(query, update, options, callback);
        
    } catch (error) {
        console.log("ÜrünStok güncellenirken hata oluştu. "+error);        
    }
}