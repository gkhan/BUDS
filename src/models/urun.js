const mongoose = require('mongoose');


const urunSchema = mongoose.Schema({
    urunKodu: {
        type: String
    },
    urunAdi: {
        type: String,
        required: true
    },
    stokGerekliMi: {
        type: Boolean,
        required: true
    },
    urunFiyat: {
        type: Number,
        required: true
    },
    olusturulmaTarihi: {
        type: Date,
        default: Date.now
    },
    kaldirilmaTarihi: {
        type: Date
    },
    kimTarafindanOlusturuldu: {
        type: String,
        required: true
    },
    urunAktifMi: {
        type: Boolean,
        default: true,
    },
    kdvOrani: {
        type: Number,
        default: 10
    }

})

const urun = (module.exports = mongoose.model('urun', urunSchema))

//Ürünleri getir
module.exports.getUruns = (callback, limit) => {
    try {
        urun.find(callback).limit(limit);
    } catch (error) {
        console.log(error);
    }

};

//id'si verilen ürünü getir
module.exports.getUrunById = (id, callback) => {
    try {
        urun.findById(id, callback);


    } catch (error) {
        console.log("urun getirilirken hata oluştu " + error)
    }
};

//Adı '_urunadi' ile başlayan verilen ürünleri getir
module.exports.getUrunByUrunAdi = (_urunadi, callback) => {
    var query = {
        urunAdi: _urunadi
    };

    try {
        urun.findOne(query, callback);

    } catch (error) {

    }

};

//Adı 'search' ile başlayan verilen ürünleri getir
module.exports.getUrunsByUrunAdiBaslayan = (search, callback) => {
    var query = {
        urunAdi: new RegExp(search, 'i')
    };
    try {
        urun.find(query, callback).limit(5);

    } catch (error) {

    }
};

//Adı 'search' ile başlayan verilen ürünleri getir
module.exports.getUrunsByUrunKoduBaslayan = (search, callback) => {
    var query = {
        urunKodu: new RegExp(search, 'i')
    };
    try {
        urun.find(query, callback).limit(5);

    } catch (error) {

    }
};

//urun ekle
module.exports.addUrun = (urunp, callback) => {
    try {
        urun.create(urunp, callback);

    } catch (error) {

    }

};

//urun sil
module.exports.deleteUrun = (id, callback) => {
    var query = {
        _id: id
    };
    urun.deleteOne(query, callback);
};

//urun güncelle
module.exports.updateUrun = (id, urunp, options, callback) => {
    var query = {
        _id: id
    };
    var update = {
        urunKodu: urunp.urunKodu,
        urunAdi: urunp.urunAdi,
        stokGerekliMi: urunp.stokGerekliMi,
        urunFiyat: urunp.urunFiyat,
        kimTarafindanOlusturuldu: urunp.kimTarafindanOlusturuldu,
        kdvOrani: urunp.kdvOrani
    };
    try {
        urun.findByIdAndUpdate(query, update, options, callback);

    } catch (error) {
        console.log("Ürün güncellenirken hata oluştu. " + error);

    }
};
