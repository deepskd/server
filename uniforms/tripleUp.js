const _ = require("lodash");

const JERSEY_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&src=ir\
{adidasAGRender/APP16_bbm_jer_1?&obj=a/f/nvr&show\
&obj=a/m/bod&src=BASECOLOR&show\
&obj=a/m/sou&src=TEAMTEXTCOLOR&show\
&obj=a/s/shg&show&obj=a/o/lab&src=TEAMSTROKECOLOR&show\
&obj=a/o/log&src=LOGOCOLOR&show\
&obj=a/o/tfr&decal&show\
&res=41.29554655870446&pos=0,0&\
src=fxg{adidasAG/APP16_bbm_jer_teamname_straight?\
&$text=TEAMNAME\
&$font=TEAMFONT\
&$text_color=TEAMTEXTCOLOR\
&$stroke_color=TEAMSTROKECOLOR\
&$application=sublimation}\
&obj=a/o/cfr&decal&show&res=17.894736842105264&pos=0,0\
&src=fxg{adidasAG/APP16_bbm_jer_playernumber?\
&$application=sublimation\
&$text=PLAYERNUMBER\
&$font=NUMBERFONT\
&$text_color=NUMBERTEXTCOLOR\
&$stroke_color=TEAMSTROKECOLOR}\
&obj=a/o/cba&decal&show&res=13.421052631578947&pos=0,0\
&src=fxg{adidasAG/APP16_bbm_jer_playernumber?\
&$application=sublimation\
&$text=PLAYERNUMBER\
&$font=NUMBERFONT\
&$text_color=NUMBERTEXTCOLOR\
&$stroke_color=TEAMSTROKECOLOR}\
&obj=a&req=object}&resMode=sharp2&wid=250&op_usm=1.2,1,4,0`;

const PANTS_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?\
&src=ir{adidasAGRender/APP16_bbm_sho_15?\
&obj=a/m/bod&src=BASECOLOR\
&show&obj=a/m/wba&src=TEAMTEXTCOLOR\
&show&obj=a/m/bac&src=TEAMSTROKECOLOR\
&show&obj=a/s/shg\
&show&obj=a/o/ar1_a7&src=TEAMTEXTCOLOR&show\
&obj=a/o/ar2_b0&show&\
obj=a/o/log&src=LOGOCOLOR\
&show&obj=a&req=object}\
&resMode=sharp2&wid=250&op_usm=1.2,1,4,0`;

const FONTS = {
  brush_script: "Brush Script",
  dribbler: "Dribbler",
  event_2012: "Event 2012",
  full_block: "Full Block",
  half_block: "Half Block",
  invader: "Invader",
  plain_block: "Plain Block",
  redzone: "Redzone",
  roadrunner: "Roadrunner",
  times_bold: "Times Bold",
  western: "Western"
};

const COLORMAP = {
  tru_black: ["black"],
  tru_white: ["white"],
  tru_collegiate_navy: ["navy", "navy blue"],
  tru_collegiate_royal: ["royal", "royal blue"],
  tru_light_blue: ["blue", "columbia blue"],
  tru_maroon: ["maroon"],
  tru_collegiate_burgundy: ["burgundy", "burgandy"],
  tru_power_red: ["red", "cardinal", "scarlet"],
  tru_collegiate_orange: ["orange", "texas orange"],
  tru_collegiate_gold: ["gold"],
  tru_yellow: ["yellow"],
  tru_sand: ["old gold"],
  tru_coffee: ["coffee"],
  tru_collegiate_aqua: ["aqua"],
  tru_green: ["green", "kelly green"],
  tru_dark_green: ["forest green", "dark green"],
  tru_collegiate_purple: ["purple"],
  tru_intense_pink: ["pink"],
  tru_onix: ["gray"],
  tru_clear_onix: ["silver"]
};

const colorMap = color => {
  let colorCode = "";
  colorCode = Object.entries(COLORMAP).filter(clrMap =>
    clrMap[1].includes(color)
  )[0];
  console.log(colorCode);
  if (!colorCode) {
    colorCode = ["tru_black"];
  }

  return colorCode[0];
};

const homeDecorations = (home, colors) => {
  const color = {};
  if (colors && colors.length === 2) {
    color.text = colorMap(colors[0]);
    color.stroke = colorMap(colors[1]);
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 3) {
    color.text = colorMap(colors[0]);
    color.stroke = colorMap(colors[1] === "white" ? colors[2] : colors[1]);
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 1) {
    color.text = colorMap(colors[0]);
    color.stroke = colorMap("black");
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else {
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, "tru_black");
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, "tru_power_red");
  }
  return home;
};

const awayDecorations = (away, colors) => {
  const color = {};
  if (colors && colors.length === 2) {
    color.text = colorMap(colors[1]);
    if (colors[1].match(/gold/)) {
      color.stroke = colorMap("white");
    } else {
      color.stroke = colorMap(_.sample[("gold", "black")]);
    }
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away = _.replace(away, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 3) {
    color.text = colorMap(colors[1]);
    color.stroke = colorMap(colors[2]);
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away = _.replace(away, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 1) {
    color.text = colorMap("white");
    color.stroke = colorMap("black");
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
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

module.exports = {
  JERSEY_URL,
  PANTS_URL,
  FONTS,
  colorMap,
  homeDecorations,
  awayDecorations
};
