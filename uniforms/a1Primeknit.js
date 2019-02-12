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
&PANTS_STRIPES&
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
  sld_pn_power_red_ht: ["power red", "red", "cardinal", "scarlet", "cherry"],
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

const awayDecorations = (away, colors) => {
  const color = {};
  if (colors && colors.length === 2) {
    color.text = colorMapHT(colors[0]);
    color.stroke = colorMapHT(colors[1]);
    away.jersey = _.replace(away.jersey, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away.jersey = _.replace(
      away.jersey,
      /(TEAM|NUMBER)STROKECOLOR/g,
      color.stroke
    );

    away.pants = _.replace(
      away.pants,
      "PANTS_STRIPES",
      stripesOnPants(color.stroke, colorMapHT(_.sample("gold", "sand", "red")))
        .url
    );
  } else if (colors && colors.length === 3) {
    color.text = colorMapHT(colors[0]);
    color.stroke = colorMapHT(colors[1] === "white" ? colors[2] : colors[1]);
    away.jersey = _.replace(away.jersey, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away.jersey = _.replace(
      away.jersey,
      /(TEAM|NUMBER)STROKECOLOR/g,
      color.stroke
    );

    away.pants = _.replace(
      away.pants,
      "PANTS_STRIPES",
      stripesOnPants(color.stroke, colorMapHT(colors[2])).url
    );
  } else if (colors && colors.length === 1) {
    color.text = colorMapHT(colors[0]);
    color.stroke = colorMapHT("black");
    away.jersey = _.replace(away.jersey, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away.jersey = _.replace(
      away.jersey,
      /(TEAM|NUMBER)STROKECOLOR/g,
      color.stroke
    );

    away.pants = _.replace(
      away.pants,
      "PANTS_STRIPES",
      stripesOnPants(color.stroke, colorMapHT(_.sample("gold", "sand", "red")))
        .url
    );
  } else {
    away.jersey = _.replace(
      away.jersey,
      /(TEAM|NUMBER)TEXTCOLOR/g,
      "sld_pn_obsidian_shine_ht"
    );
    away.jersey = _.replace(
      away.jersey,
      /(TEAM|NUMBER)STROKECOLOR/g,
      "sld_pn_matte_power_red_ht"
    );

    away.pants = _.replace(
      away.pants,
      "PANTS_STRIPES",
      stripesOnPants(colorMapHT("silver"), colorMapHT("red")).url
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
    home.jersey = _.replace(home.jersey, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home.jersey = _.replace(
      home.jersey,
      /(TEAM|NUMBER)STROKECOLOR/g,
      color.stroke
    );

    home.pants = _.replace(
      home.pants,
      "PANTS_STRIPES",
      stripesOnPants(color.text, colorMapHT(_.sample("gold", "sand", "red")))
        .url
    );
  } else if (colors && colors.length === 3) {
    color.text = colorMapHT(colors[1]);
    color.stroke = colorMapHT(colors[2]);
    home.jersey = _.replace(home.jersey, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home.jersey = _.replace(
      home.jersey,
      /(TEAM|NUMBER)STROKECOLOR/g,
      color.stroke
    );

    home.pants = _.replace(
      home.pants,
      "PANTS_STRIPES",
      stripesOnPants(color.text, color.stroke).url
    );
  } else if (colors && colors.length === 1) {
    color.text = colorMapHT("white");
    color.stroke = colorMapHT("black");
    home.jersey = _.replace(home.jersey, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home.jersey = _.replace(
      home.jersey,
      /(TEAM|NUMBER)STROKECOLOR/g,
      color.stroke
    );

    home.pants = _.replace(
      home.pants,
      "PANTS_STRIPES",
      stripesOnPants(color.text, color.stroke).url
    );
  } else {
    home.jersey = _.replace(
      home.jersey,
      /(TEAM|NUMBER)TEXTCOLOR/g,
      "sld_pn_white_ht"
    );
    home.jersey = _.replace(
      home.jersey,
      /(TEAM|NUMBER)STROKECOLOR/g,
      "sld_pn_matte_power_red_ht"
    );

    home.pants = _.replace(
      home.pants,
      "PANTS_STRIPES",
      stripesOnPants("sld_pn_white_ht", "sld_pn_matte_power_red_ht").url
    );
  }
  return home;
};

const stripesOnPants = (primaryColor, secondaryColor) => {
  let stripe = _.sample(PANTS_STRIPE_OPTIONS);
  stripe.url = _.replace(stripe.url, "STRIPE_PRIMARY_COLOR", primaryColor);
  stripe.url = _.replace(stripe.url, "STRIPE_SECONDARY_COLOR", secondaryColor);
  console.log(stripe);
  return stripe;
};

const PANTS_STRIPE_OPTIONS = [
  { name: "No Stripe", url: "obj=a/o/st1_s0&show&obj=a/o/st2_t0&show" },
  {
    name: "Solid Stripe",
    url: "obj=a/o/st1_sd&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t0&show"
  },
  {
    name: "Classic Stripe",
    url:
      "obj=a/o/st1_s1&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t1&src=STRIPE_SECONDARY_COLOR&show"
  },
  {
    name: "Burner Stripe",
    url:
      "obj=a/o/st1_s7&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t7&src=STRIPE_SECONDARY_COLOR&show"
  },
  {
    name: "Claw Stripe",
    url:
      "obj=a/o/st1_s5&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t5&src=STRIPE_SECONDARY_COLOR&show"
  },
  {
    name: "Power Stripe",
    url:
      "obj=a/o/st1_s4&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t4&src=STRIPE_SECONDARY_COLOR&show"
  },
  {
    name: "Speed Stripe",
    url:
      "obj=a/o/st1_s6&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t6&src=STRIPE_SECONDARY_COLOR&show"
  },
  {
    name: "Stinger Stripe",
    url:
      "obj=a/o/st1_s8&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t8&src=STRIPE_SECONDARY_COLOR&show"
  },
  {
    name: "Three Thin Stripes",
    url:
      "obj=a/o/st1_s3&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t3&src=STRIPE_SECONDARY_COLOR&show"
  },
  {
    name: "Wing Stripe",
    url:
      "obj=a/o/st1_s9&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t9&src=STRIPE_SECONDARY_COLOR&show"
  },
  {
    name: "Two Stripe",
    url:
      "obj=a/o/st1_s2&src=STRIPE_PRIMARY_COLOR&show&obj=a/o/st2_t2&src=STRIPE_SECONDARY_COLOR&show"
  }
];

module.exports = {
  JERSEY_URL,
  PANTS_URL,
  FONTS,
  colorMapHT,
  colorMapBase,
  homeDecorations,
  awayDecorations
};
