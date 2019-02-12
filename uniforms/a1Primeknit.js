const _ = require("lodash");

const JERSEY_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&src=ir\
{adidasAGRender/APP18_pn1_com_1?&obj=a/f/nvr&show&\
obj=a/m/bas&src=BASECOLOR&show&\
obj=a/s/shg&show&\
obj=a/o/st1_s0&show&\
obj=a/o/st2_t0&show&\
obj=a/o/log&src=LOGOCOLOR&show&\
obj=a/o/cuf&src=sld_pn_white&show&\
obj=a/o/pip&src=sld_pn_white&show&\
obj=a/o/ufr&decal&show&res=10.053222945002956&pos=0,0&\
src=fxg{APP18_pn1_jht_teamname?&\
$text=TEAMNAME&\
$font=TEAMFONT&\
$text_color=TEAMTEXTCOLOR&\
$stroke_color=TEAMSTROKECOLOR&\
$application=heat_transfer}&
obj=a/o/cfr&decal&show&res=10.567757977621218&pos=0,0&\
src=fxg{APP18_pn1_jht_playernumber?&\
$application=heat_transfer&\
$text=PLAYERNUMBER&\
$font=NUMBERFONT&\
$text_color=NUMBERTEXTCOLOR&\
$stroke_color=NUMBERSTROKECOLOR}&\
obj=a/o/cba&decal&show&res=8.800690250215704&pos=0,0&\
src=fxg{APP18_pn1_jht_playernumber?&\
$application=heat_transfer&\
$text=PLAYERNUMBER&\
$font=NUMBERFONT&\
$text_color=NUMBERTEXTCOLOR&\
$stroke_color=TEAMSTROKECOLOR}&\
obj=a/o/sln&decal&show&res=35.78947368421053&pos=0,0&\
src=fxg{APP18_pn1_jht_playernumber?&\
$application=heat_transfer&\
$text=PLAYERNUMBER&
$font=NUMBERFONT&
$text_color=NUMBERTEXTCOLOR&\
$stroke_color=NUMBERSTROKECOLOR}&\
obj=a&req=object}\
&resMode=sharp2\
&wid=250\
&op_usm=1.2,1,4,0`;

const PANTS_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&src=ir\
{adidasAGRender/APP18_pn1_pco_1?&obj=a/f/nvr&show\
&obj=a/m/bas&src=BASECOLOR&show&\
obj=a/s/shg&show&\
obj=a/o/log&src=LOGOCOLOR&show&\
obj=a&req=object}\
&resMode=sharp2&wid=250&op_usm=1.2,1,4,0`;

const FONTS = {
  red_zone_2015: "Red Zone",
  invader: "Invader",
  full_block: "Full Block",
  western: "Western",
  roadrunner: "Road Runner",
  louisville: "Louisville",
  half_block_2015: "Half Block"
};

const COLORMAP_HT = {
  sld_pn_obsidian_shine_ht: ["black"],
  sld_pn_collegiate_orange_ht: ["orange", "texas orange"],
  sld_pn_collegiate_purple_ht: ["purple"],
  sld_pn_maroon_ht: ["maroon"],
  sld_pn_collegiate_navy_ht: ["navy", "navy blue"],
  sld_pn_dark_green_ht: ["dark green", "forest green"],
  sld_pn_chameleon_ht: ["green", "kelly green"],
  sld_pn_collegiate_burgundy_ht: ["burgandy"],
  sld_pn_power_red_ht: ["power red", "red", "cardinal", "scarlet"],
  sld_pn_onix_shine: ["grey", "gray"],
  sld_pn_24_karat_ht: ["vegas gold", "old gold"],
  sld_pn_white_ht: ["white"],
  sld_pn_collegiate_gold_ht: ["gold", "yellow"],
  sld_pn_collegiate_royal_ht: ["royal blue", "royal"],
  sld_pn_sterling_silver_ht: ["silver"],
  sld_pn_carbon_silver_ht: ["light"]
};

const colorMapHT = color => {
  let colorHT = "";
  colorHT = Object.entries(COLORMAP_HT).filter(clrMap =>
    clrMap[1].includes(color)
  )[0];
  if (!colorHT) {
    colorHT = ["sld_pn_obsidian_shine_ht"];
  }
  return colorHT[0];
};

const COLORMAP_BASE = {
  sld_pn_black: ["black"],
  sld_pn_collegiate_orange: ["orange", "texas orange"],
  sld_pn_collegiate_purple: ["purple"],
  sld_pn_maroon: ["maroon"],
  sld_pn_collegiate_navy: ["navy", "navy blue"],
  sld_pn_dark_green: ["dark green", "forest green"],
  sld_pn_green: ["green", "kelly green"],
  sld_pn_collegiate_burgundy: ["burgandy"],
  sld_pn_power_red: ["power red", "red", "cardinal", "scarlet"],
  sld_pn_light_blue: ["carolina blue"],
  sld_pn_grey: ["grey", "gray"],
  sld_pn_sand: ["vegas gold", "old gold"],
  sld_pn_white: ["white"],
  sld_pn_collegiate_gold: ["gold", "yellow"],
  sld_pn_collegiate_royal: ["royal blue", "royal"],
  sld_pn_light_blue: ["blue", "aqua", "carolina blue"],
  sld_pn_onix: ["silver"]
};

const colorMapBase = color => {
  let colorBase = "";
  colorBase = Object.entries(COLORMAP_BASE).filter(clrMap =>
    clrMap[1].includes(color)
  )[0];
  if (!colorBase) {
    colorBase = ["sld_pn_black"];
  }
  return colorBase[0];
};

const awayDecorations = (away, colors) => {
  const color = {};
  if (colors && colors.length === 2) {
    color.text = colorMapHT(colors[0]);
    color.stroke = colorMapHT(colors[1]);
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away = _.replace(away, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 3) {
    color.text = colorMapHT(colors[0]);
    color.stroke = colorMapHT(colors[1] === "white" ? colors[2] : colors[1]);
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away = _.replace(away, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 1) {
    color.text = colorMapHT(colors[0]);
    color.stroke = colorMapHT("black");
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away = _.replace(away, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else {
    away = _.replace(
      away,
      /(TEAM|NUMBER)TEXTCOLOR/g,
      "sld_pn_obsidian_shine_ht"
    );
    away = _.replace(
      away,
      /(TEAM|NUMBER)STROKECOLOR/g,
      "sld_pn_matte_power_red_ht"
    );
  }
  return away;
};

const homeDecorations = (home, colors) => {
  const color = {};
  if (colors && colors.length === 2) {
    color.text = colorMapHT(colors[1]);
    if (colors[1].match(/gold/)) {
      color.stroke = colorMapHT("white");
    } else {
      color.stroke = colorMapHT(_.sample[("gold", "black")]);
    }
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 3) {
    color.text = colorMapHT(colors[1]);
    color.stroke = colorMapHT(colors[2]);
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 1) {
    color.text = colorMapHT("white");
    color.stroke = colorMapHT("black");
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else {
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, "sld_pn_white_ht");
    home = _.replace(
      home,
      /(TEAM|NUMBER)STROKECOLOR/g,
      "sld_pn_matte_power_red_ht"
    );
  }
  return home;
};

module.exports = {
  JERSEY_URL,
  PANTS_URL,
  FONTS,
  colorMapHT,
  colorMapBase,
  homeDecorations,
  awayDecorations
};
