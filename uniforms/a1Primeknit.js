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
$application=APPLICATION_TYPE}&
obj=a/o/cfr&decal&show&res=10.567757977621218&pos=0,0&\
src=fxg{APP18_pn1_jht_playernumber?&\
$application=APPLICATION_TYPE&\
$text=PLAYERNUMBER&\
$font=NUMBERFONT&\
$text_color=NUMBERTEXTCOLOR&\
$stroke_color=NUMBERSTROKECOLOR}&\
obj=a/o/cba&decal&show&res=8.800690250215704&pos=0,0&\
src=fxg{APP18_pn1_jht_playernumber?&\
$application=APPLICATION_TYPE&\
$text=PLAYERNUMBER&\
$font=NUMBERFONT&\
$text_color=NUMBERTEXTCOLOR&\
$stroke_color=NUMBERSTROKECOLOR}&\
obj=a/o/sln&decal&show&res=35.78947368421053&pos=0,0&\
src=fxg{APP18_pn1_jht_playernumber?&\
$application=APPLICATION_TYPE&\
$text=PLAYERNUMBER&\
$font=NUMBERFONT&\
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
&PANTS_STRIPES&\
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

const COLORS = {
  sld_pn_obsidian_shine_ht: "#000000",
  sld_pn_collegiate_orange_ht: "#b74024",
  sld_pn_collegiate_purple_ht: "#38305a",
  sld_pn_maroon_ht: "#4a2d35",
  sld_pn_collegiate_navy_ht: "#000F44",
  sld_pn_dark_green_ht: "#324c44",
  sld_pn_chameleon_ht: "#32b75b",
  sld_pn_collegiate_burgundy_ht: "#602732",
  sld_pn_power_red_ht: "#891e2e",
  sld_pn_onix_shine: "#555f66",
  sld_pn_24_karat_ht: "#a67c00",
  sld_pn_white_ht: "#ffffff",
  sld_pn_collegiate_gold_ht: "#eca800",
  sld_pn_collegiate_royal_ht: "#2b3c74",
  sld_pn_sterling_silver_ht: "#a9a9aa",
  sld_pn_carbon_silver_ht: "#e6e6e6",
  sld_pn_black_sp: "#000000",
  sld_pn_onix_sp: "#555f66",
  sld_pn_collegiate_navy_sp: "#000F44",
  sld_pn_collegiate_royal_sp: "#2b3c74",
  sld_pn_light_blue_sp: "#7092bc",
  sld_pn_collegiate_purple_sp: "#38305a",
  sld_pn_coffee_sp: "#6f4e37 ",
  sld_pn_maroon_sp: "#4a2d35",
  sld_pn_collegiate_burgundy_sp: "#602732",
  sld_pn_power_red_sp: "#891e2e",
  sld_pn_collegiate_orange_sp: "#b74024",
  sld_pn_collegiate_gold_sp: "#eca800",
  sld_pn_dark_green_sp: "#324c44",
  sld_pn_kelly_green_sp: "#4cbb17",
  sld_pn_aqua_sp: "#00ffff",
  sld_pn_green_sp: "#15bc00",
  sld_pn_bombay_brown_sp: "#8B4513",
  sld_pn_vegas_gold_sp: "#c5b358",
  sld_pn_sand_sp: "#c2b280",
  sld_pn_stone_sp: "#abaeaf",
  sld_pn_teal_sp: "#008080",
  sld_pn_solar_red_sp: "#FE2E4B",
  sld_pn_neon_green_sp: "#39ff14"
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
  sld_pn_power_red_ht: ["power red", "red", "cardinal", "scarlet", "cherry"],
  sld_pn_onix_shine: ["grey", "gray"],
  sld_pn_24_karat_ht: ["vegas gold", "old gold"],
  sld_pn_white_ht: ["white"],
  sld_pn_collegiate_gold_ht: ["gold", "yellow"],
  sld_pn_collegiate_royal_ht: ["royal blue", "royal"],
  sld_pn_sterling_silver_ht: ["silver"],
  sld_pn_carbon_silver_ht: ["light"]
};

const COLORMAP_SP = {
  sld_pn_black_sp: ["black"],
  sld_pn_onix_sp: ["onix"],
  sld_pn_collegiate_navy_sp: ["navy", "navy blue"],
  sld_pn_collegiate_royal_sp: ["royal"],
  sld_pn_light_blue_sp: ["light blue", "columbia blue"],
  sld_pn_collegiate_purple_sp: ["purple"],
  sld_pn_coffee_sp: ["coffee"],
  sld_pn_maroon_sp: ["maroon"],
  sld_pn_collegiate_burgundy_sp: ["burgundy", "burgandy"],
  sld_pn_power_red_sp: ["red", "power red"],
  sld_pn_collegiate_orange_sp: ["orange"],
  sld_pn_collegiate_gold_sp: ["gold"],
  sld_pn_dark_green_sp: ["dark green", "forest green"],
  sld_pn_kelly_green_sp: ["kelly green"],
  sld_pn_aqua_sp: ["aqua"],
  sld_pn_green_sp: ["green"],
  sld_pn_bombay_brown_sp: ["brown"],
  sld_pn_vegas_gold_sp: ["vegas gold"],
  sld_pn_sand_sp: ["light gold"],
  sld_pn_stone_sp: ["stone"],
  sld_pn_teal_sp: ["teal"],
  sld_pn_solar_red_sp: ["solar red"],
  sld_pn_neon_green_sp: ["neon green"]
};

const colorMap = (color, applicationType = "heat_transfer") => {
  let colorCode = "";
  if (applicationType === "heat_transfer") {
    colorCode = Object.entries(COLORMAP_HT).filter(clrMap =>
      clrMap[1].includes(color)
    )[0];
    if (!colorCode) {
      colorCode = ["sld_pn_obsidian_shine_ht"];
    }
  } else if (applicationType === "screen_print") {
    colorCode = Object.entries(COLORMAP_SP).filter(clrMap =>
      clrMap[1].includes(color)
    )[0];
    if (!colorCode) {
      colorCode = ["sld_pn_black_sp"];
    }
  }
  return colorCode[0];
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
  sld_pn_power_red: ["power red", "red", "cardinal", "scarlet", "cherry"],
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

const awayDecorations = ({ jersey, pant }, colors) => {
  const applicationType = jersey.frontImage.match(/\$application=(\w+)/)[1];
  if (colors && colors.length === 2) {
    jersey.textColor = colors[0];
    jersey.strokeColor = colors[1];

    pant.strokeColor1 = colors[0];
    pant.strokeColor2 = _.sample(["red", "blue", "gold"]);
  } else if (colors && colors.length === 3) {
    jersey.textColor = colors[0];
    jersey.strokeColor = colors[1] === "white" ? colors[2] : colors[1];

    pant.strokeColor1 = colors[0];
    pant.strokeColor2 = jersey.strokeColor;
  } else {
    jersey.textColor = colors ? colors[0] : "black";
    jersey.strokeColor = _.sample(["red", "blue", "gold"]);

    pant.strokeColor1 = jersey.textColor;
    pant.strokeColor2 = jersey.strokeColor;
  }

  jersey.textColorCode = colorMap(jersey.textColor, applicationType);
  jersey.strokeColorCode = colorMap(jersey.strokeColor, applicationType);
  pant.strokeColor1Code = colorMap(pant.strokeColor1, applicationType);
  pant.strokeColor2Code = colorMap(pant.strokeColor2, applicationType);

  jersey.frontImage = _.replace(
    jersey.frontImage,
    /(TEAM|NUMBER)TEXTCOLOR/g,
    jersey.textColorCode
  );
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /(TEAM|NUMBER)STROKECOLOR/g,
    jersey.strokeColorCode
  );

  pant.frontImage = _.replace(
    pant.frontImage,
    "PANTS_STRIPES",
    stripesOnPants(pant.strokeColor1Code, pant.strokeColor2Code).url
  );

  return { jersey, pant };
};

const homeDecorations = ({ jersey, pant }, colors) => {
  const applicationType = jersey.frontImage.match(/\$application=(\w+)/)[1];
  if (colors && colors.length === 2) {
    jersey.textColor = colors[1];
    jersey.textColorCode = colorMap(colors[1], applicationType);

    if (colors[1].match(/gold/)) {
      jersey.strokeColor = "white";
    } else {
      jersey.strokeColor = _.sample(["gold", "black"]);
    }

    pant.strokeColor1 = jersey.strokeColor;
    pant.strokeColor2 = _.sample(["gold", "black"]);
  } else if (colors && colors.length === 3) {
    jersey.textColor = colors[1];
    jersey.strokeColor = colors[2];

    pant.strokeColor1 = colors[2];
    pant.strokeColor2 = colors[1];
  } else {
    jersey.textColor = "white";
    jersey.strokeColor = "black";

    pant.strokeColor1 = "red";
    pant.strokeColor2 = "gold";
  }

  jersey.textColorCode = colorMap(jersey.textColor, applicationType);
  jersey.strokeColorCode = colorMap(jersey.strokeColor, applicationType);
  pant.strokeColor1Code = colorMap(pant.strokeColor1, applicationType);
  pant.strokeColor2Code = colorMap(pant.strokeColor2, applicationType);

  jersey.frontImage = _.replace(
    jersey.frontImage,
    /(TEAM|NUMBER)TEXTCOLOR/g,
    jersey.textColorCode
  );
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /(TEAM|NUMBER)STROKECOLOR/g,
    jersey.strokeColorCode
  );

  pant.frontImage = _.replace(
    pant.frontImage,
    "PANTS_STRIPES",
    stripesOnPants(pant.strokeColor1Code, pant.strokeColor2Code).url
  );

  return { jersey, pant };
};

const stripesOnPants = (primaryColor, secondaryColor) => {
  let stripe = _.sample(PANTS_STRIPE_OPTIONS);
  stripe.url = _.replace(stripe.url, "STRIPE_PRIMARY_COLOR", primaryColor);
  stripe.url = _.replace(stripe.url, "STRIPE_SECONDARY_COLOR", secondaryColor);
  return stripe;
};

const JERSEY_STRIPE_OPTIONS = [
  {
    name: "Two Stripe",
    url:
      "obj=a/o/st1_s2&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t2&src=STRIPE_SECONDARY_COLOR&show"
  },
  {
    name: "Three Thin Stripes",
    url:
      "obj=a/o/st1_s3&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t3&src=STRIPE_SECONDARY_COLOR&show"
  },
  {
    name: "Burner Stripe",
    url:
      "&obj=a/o/st1_s7&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t7&src=STRIPE_SECONDARY_COLOR&show&"
  },
  {
    name: "Classic Stripe",
    url:
      "obj=a/o/st1_s1&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t1&src=STRIPE_SECONDARY_COLOR&show&"
  },
  {
    name: "Claw Stripe",
    url:
      "obj=a/o/st1_s5&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t5&src=STRIPE_SECONDARY_COLOR&show&"
  },
  {
    name: "Power Stripe",
    url:
      "obj=a/o/st1_s4&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t4&src=STRIPE_SECONDARY_COLOR&show&"
  },
  {
    name: "Speed Stripe",
    url:
      "obj=a/o/st1_s6&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t6&src=STRIPE_SECONDARY_COLOR&show&"
  },
  {
    name: "Stinger Stripe",
    url:
      "obj=a/o/st1_s8&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t8&src=STRIPE_SECONDARY_COLOR&show&"
  },
  {
    name: "Wings Stripe",
    url:
      "obj=a/o/st1_s9&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t9&src=STRIPE_SECONDARY_COLOR&show&"
  },
  {
    name: "No Stripe",
    url: "obj=a/o/st1_s0&show&obj=a/o/st2_t0&show"
  }
];

const PANTS_STRIPE_OPTIONS = [
  ...JERSEY_STRIPE_OPTIONS,
  {
    name: "Solid Stripe",
    url: "obj=a/o/st1_sd&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t0&show"
  }
];

module.exports = {
  JERSEY_URL,
  PANTS_URL,
  FONTS,
  COLORS,
  colorMapBase,
  homeDecorations,
  awayDecorations
};
