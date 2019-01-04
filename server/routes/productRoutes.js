const mongoose = require("mongoose");
const yaml = require("js-yaml");
const fs = require("fs");
require("../models/Team");

const Team = mongoose.model("teams");
const url = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&src=ir\
{adidasAGRender/APP18_pn1_com_1?&obj=a/f/nvr&show&\
obj=a/m/bas&src=sld_pn_white&show&\
obj=a/s/shg&show&\
obj=a/o/st1_s0&show&\
obj=a/o/st2_t0&show&\
obj=a/o/log&src=sld_pn_black&show&\
obj=a/o/cuf&src=sld_pn_white&show&\
obj=a/o/pip&src=sld_pn_white&show&\
obj=a/o/ufr&decal&show&res=10.053222945002956&pos=0,0&\
src=fxg{APP18_pn1_jht_teamname?&\
$text=EAGLES&\
$font=red_zone_2015&\
$text_color=sld_pn_collegiate_burgundy_ht&\
$stroke_color=sld_pn_collegiate_gold_ht&\
$application=heat_transfer}&
obj=a/o/cfr&decal&show&res=10.567757977621218&pos=0,0&\
src=fxg{APP18_pn1_jht_playernumber?&\
$application=heat_transfer&\
$text=99&\
$font=red_zone_2015&\
$text_color=sld_pn_collegiate_burgundy_ht&\
$stroke_color=sld_pn_collegiate_gold_ht}&\
obj=a/o/cba&decal&show&res=8.800690250215704&pos=0,0&\
src=fxg{APP18_pn1_jht_playernumber?&\
$application=heat_transfer&\
$text=99&\
$font=red_zone_2015&\
$text_color=sld_pn_collegiate_burgundy_ht&\
$stroke_color=sld_pn_collegiate_gold_ht}&\
obj=a/o/sln&decal&show&res=35.78947368421053&pos=0,0&\
src=fxg{APP18_pn1_jht_playernumber?&\
$application=heat_transfer&\
$text=99&
$font=red_zone_2015&
$text_color=sld_pn_collegiate_burgundy_ht&\
$stroke_color=sld_pn_collegiate_gold_ht}&\
obj=a&req=object}\
&resMode=sharp2\
&op_usm=1.2,1,4,0`;

var products = { home: url, away: url };
// try {
//   products = yaml.safeLoad(fs.readFileSync("product.yml", "utf8"));
// } catch (e) {
//   console.log(e);
// }

module.exports = app => {
  app.get("/api/products", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(products);
  });
};
