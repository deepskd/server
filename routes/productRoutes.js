const mongoose = require("mongoose");
const yaml = require("js-yaml");
const fs = require("fs");
const _ = require("lodash");
require("../models/Team");

const Team = mongoose.model("teams");

const url = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&src=ir\
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
$stroke_color=sld_pn_collegiate_gold_ht}&\
obj=a/o/sln&decal&show&res=35.78947368421053&pos=0,0&\
src=fxg{APP18_pn1_jht_playernumber?&\
$application=heat_transfer&\
$text=PLAYERNUMBER&
$font=NUMBERFONT&
$text_color=NUMBERTEXTCOLOR&\
$stroke_color=NUMBERSTROKECOLOR}&\
obj=a&req=object}\
&resMode=sharp2\
&op_usm=1.2,1,4,0`;

const FONTS = [
  "red_zone_2015",
  "invader",
  "full_block",
  "western",
  "roadrunner",
  "louisville",
  "half_block_2015"
];

const colorMapHT = color => {
  let colorHT = "";
  switch (color) {
    case "black":
      colorHT = "sld_pn_obsidian_shine_ht";
      break;
    case "orange":
      colorHT = "sld_pn_collegiate_orange_ht";
      break;
    case "purple":
      colorHT = "sld_pn_collegiate_purple_ht";
      break;
    case "maroon":
      colorHT = "sld_pn_maroon_ht";
      break;
    case "navy":
      colorHT = "sld_pn_collegiate_navy_ht";
      break;
    case "navy blue":
      colorHT = "sld_pn_collegiate_navy_ht";
      break;
    case "dark green":
      colorHT = "sld_pn_dark_green_ht";
      break;
    case "forest green":
      colorHT = "sld_pn_dark_green_ht";
      break;
    case "green":
      colorHT = "sld_pn_chameleon_ht";
      break;
    case "kelly green":
      colorHT = "sld_pn_chameleon_ht";
      break;
    case "burgandy":
      colorHT = "sld_pn_collegiate_burgundy_ht";
      break;
    case "red":
      colorHT = "sld_pn_power_red_ht";
      break;
    case "white":
      colorHT = "sld_pn_white_ht";
      break;
    case "gold":
      colorHT = "sld_pn_collegiate_gold_ht";
      break;
    case "vegas gold":
      colorHT = "sld_pn_24_karat_ht";
      break;
    case "blue":
      colorHT = "sld_pn_onix_ht"; //no match available
      break;
    case "royal blue":
      colorHT = "sld_pn_collegiate_royal_ht";
      break;
    case "silver":
      colorHT = "sld_pn_sterling_silver_ht";
      break;
    case "cardinal":
      colorHT = "sld_pn_matte_power_red_ht"; //approx match
      break;
    case "scarlet":
      colorHT = "sld_pn_matte_power_red_ht"; //approx match
      break;
    default:
      colorHT = "sld_pn_obsidian_shine_ht";
  }
  return colorHT;
};

const colorMapBase = color => {
  let colorBase = "";
  switch (color) {
    case "black":
      colorBase = "sld_pn_black";
      break;
    case "orange":
      colorBase = "sld_pn_collegiate_orange";
      break;
    case "purple":
      colorBase = "sld_pn_collegiate_purple";
      break;
    case "maroon":
      colorBase = "sld_pn_maroon";
      break;
    case "navy":
      colorBase = "sld_pn_collegiate_navy";
      break;
    case "navy blue":
      colorBase = "sld_pn_collegiate_navy";
      break;
    case "dark green":
      colorBase = "sld_pn_dark_green";
      break;
    case "forest green":
      colorBase = "sld_pn_dark_green";
      break;
    case "green":
      colorBase = "sld_pn_green";
      break;
    case "kelly green":
      colorBase = "sld_pn_green";
      break;
    case "burgandy":
      colorBase = "sld_pn_collegiate_burgundy";
      break;
    case "red":
      colorBase = "sld_pn_power_red";
      break;
    case "white":
      colorBase = "sld_pn_white";
      break;
    case "gold":
      colorBase = "sld_pn_collegiate_gold";
      break;
    case "blue":
      colorBase = "sld_pn_light_blue";
      break;
    case "carolina blue":
      colorBase = "sld_pn_light_blue";
      break;
    case "loght blue":
      colorBase = "sld_pn_light_blue";
      break;
    default:
      colorBase = "sld_pn_black";
  }
  return colorBase;
};

const homeDecorations = (home, colors) => {
  const color = {};
  if (colors && colors.length === 2) {
    color.text = colorMapHT(colors[0]);
    color.stroke = colorMapHT(colors[1]);
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 3) {
    color.text = colorMapHT(colors[0]);
    color.stroke = colorMapHT(colors[1]);
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else {
    home = _.replace(
      home,
      /(TEAM|NUMBER)TEXTCOLOR/g,
      "sld_pn_obsidian_shine_ht"
    );
    home = _.replace(
      home,
      /(TEAM|NUMBER)STROKECOLOR/g,
      "sld_pn_matte_power_red_ht"
    );
  }
  return home;
};

const awayDecorations = (away, colors) => {
  const color = {};
  if (colors && colors.length === 2) {
    color.text = colorMapHT(colors[1]);
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away = _.replace(away, /(TEAM|NUMBER)STROKECOLOR/g, color.text);
  } else if (colors && colors.length === 3) {
    color.text = colorMapHT(colors[1]);
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    color.stroke = colorMapHT(colors[2]);
    away = _.replace(away, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else {
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, "sld_pn_white_ht");
    away = _.replace(
      away,
      /(TEAM|NUMBER)STROKECOLOR/g,
      "sld_pn_matte_power_red_ht"
    );
  }
  return away;
};

const teamProducts = team => {
  const playerNumber = _.random(0, 99);
  const font = _.sample(FONTS);
  const mascot = team.mascot || team.name;

  let home = _.replace(url, /TEAMNAME/, _.toUpper(mascot));
  home = _.replace(home, /BASECOLOR/, colorMapBase("white"));
  home = _.replace(home, /LOGOCOLOR/, colorMapBase("black"));
  home = _.replace(home, /PLAYERNUMBER/g, playerNumber);
  home = _.replace(home, /(TEAM|NUMBER)FONT/g, font);
  home = homeDecorations(home, team.colors);

  let away = _.replace(url, /TEAMNAME/, _.toUpper(team.name));
  let awayBaseColor = team.colors ? team.colors[0] : "black";
  if (awayBaseColor === "black") {
    away = _.replace(away, "cuf&src=sld_pn_white", "cuf&src=sld_pn_black");
    away = _.replace(away, "pip&src=sld_pn_white", "pip&src=sld_pn_black");
  }
  away = _.replace(away, /BASECOLOR/, colorMapBase(awayBaseColor));
  away = _.replace(away, /LOGOCOLOR/, colorMapBase("white"));
  away = _.replace(away, /PLAYERNUMBER/g, playerNumber);
  away = _.replace(away, /(TEAM|NUMBER)FONT/g, font);
  away = awayDecorations(away, team.colors);
  return { home, away };
};

module.exports = app => {
  app.get("/api/products", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const team = await Team.getTeam(req.query.id);
    res.status(200).json(teamProducts(team));
  });
};
