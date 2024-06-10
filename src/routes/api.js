const express = require("express");

//Haritalar
const urunRouter = require("./urunRoute");
const makbuzRouter = require("./makbuzRoute");
const kasaRouter = require("./kasaRoute");
const kullaniciRouter = require("./kullaniciRoute");
const firmaRouter = require("./firmaRoute")
const sayacRouter = require("./sayacRoute");
const kasabolgeRouter = require("./kasabolgeRoute");
const urunStokRouter = require("./urunStokRoute");
const stokKabulRouter = require("./stokKabulRoute");
const vezneRouter = require("./vezneRoute")


var app = express();

app.use("/urun/",urunRouter);
app.use("/makbuz/",makbuzRouter);
app.use("/kasa/",kasaRouter);
app.use("/kullanici/",kullaniciRouter);
app.use("/firma/",firmaRouter);
app.use("/sayac/",sayacRouter);
app.use("/kasabolge/",kasabolgeRouter);
app.use("/urunStok/",urunStokRouter);
app.use("/stokKabul/",stokKabulRouter);
app.use("/vezne",vezneRouter)

module.exports = app;