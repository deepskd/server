const _ = require('lodash')

const JERSEY_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&\
src=ir{adidasAGRender/APP16_vuw_sht_ls_1?&\
obj=a/m/bas&src=BASECOLOR&show&\
obj=a/m/sle&src=mi_v17_white&show&\
obj=a/m/lsi&src=mi_v17_white&show&\
obj=a/m/usi&src=mi_v17_collegiate_orange&show&\
obj=a/m/col&src=TEAMTEXTCOLOR&show&\
obj=a/o/sha_ls&show&\
obj=a/f/nvr&show&\
obj=a/o/sep_u1&show&\
obj=a/o/grs_g1&src=mi_v17_white_second&show&\
obj=a/o/grt_p1&src=mi_v17_white_third&show&\
obj=a/s/shg&show&\
obj=a/o/gra_ob&src=mi_v17_white&show&\
obj=a/o/str_s0&show&\
obj=a/o/log&src=LOGOCOLOR&show&\
obj=a/o/ufo&decal&show&\
res=41.940789473684205&pos=0,0&src=fxg{adidasAG/APP16_vuw_teamname_straight?&\
$application=sublimation&\
$text=TEAMNAME&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}&\
obj=a/o/cfc&decal&show&\
res=26.315789473684216&pos=0,0&\
src=fxg{adidasAG/APP16_vuw_playernumber?&\
$application=sublimation&\
$text=PLAYERNUMBER&$font=NUMBERFONT&$text_color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}&\
obj=a/o/cbc&decal&show&\
res=13.22271195229453&pos=0,0&\
src=fxg{adidasAG/APP16_vuw_playernumber?&\
$application=sublimation&\
$text=PLAYERNUMBER&$font=NUMBERFONT&$text_color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}&\
obj=a&req=object}&resMode=sharp2&wid=250&op_usm=1.2,1,4,0`

const PANTS_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&src=ir{adidasAGRender/APP16_vuw_sho_1?&\
obj=a/m/bas&src=BASECOLOR&show&\
obj=a/m/wai&show&\
obj=a/f/nvr&show&\
obj=a/o/sep&show&\
obj=a/o/grs_g1&src=TEAMTEXTCOLOR&show&\
obj=a/o/grt_p1&src=TEAMTEXTCOLOR&show&\
obj=a/s/shg&show&\
obj=a/o/gra_ob&src=TEAMTEXTCOLOR&show&\
obj=a/o/str_s0&show&\
obj=a/o/log&src=LOGOCOLOR&show&\
obj=a&req=object}&resMode=sharp2&op_usm=1.2,1,4,0`
//obj=a/o/wba&decal&show&res=35.3185595567867&pos=0,0&src=fxg{adidasAG/APP16_vum_sho_teamname?&$application=sublimation&$text=TEAMNAME&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}&\
const FONTS = {
  times_bold: 'Times Bold',
  full_block: 'Full Block',
  red_zone: 'Red Zone',
  roadrunner: 'Roadrunner',
  western: 'Western',
  fakt_bold: 'Fakt Bold',
  plain_block: 'Plain Block',
  half_block: 'Half Block',
  invader: 'Invader',
  brush_script: 'Brush Script',
}

const COLORMAP = {
  mi_v17_white: ['white'],
  mi_v17_black: ['black'],
  mi_v17_collegiate_navy: ['navy', 'navy blue'],
  mi_v17_collegiate_royal: ['royal', 'royal blue'],
  mi_v17_light_blue: ['blue', 'columbia blue'],
  mi_v17_coffee: ['coffee'],
  mi_v17_maroon: ['maroon'],
  mi_v17_collegiate_burgundy: ['burgundy', 'burgandy'],
  mi_v17_power_red: ['red', 'cardinal', 'scarlet'],
  mi_v17_victory_red: ['victory red'],
  mi_v17_collegiate_orange: ['orange', 'texas orange'],
  mi_v17_yellow: ['yellow'],
  mi_v17_collegiate_gold: ['gold'],
  mi_v17_sand: ['old gold', 'vegas gold'],
  mi_v17_dark_green: ['forest green', 'dark green'],
  mi_v17_bold_green: ['bold green'],
  mi_v17_collegiate_aqua: ['aqua'],
  mi_v17_collegiate_purple: ['purple'],
  mi_v17_eqt_pink: ['pink'],
  mi_v17_onix: ['gray'],
  mi_v17_clear_onix: ['silver'],
  mi_v17_solar_yellow: ['solar yellow'],
  mi_v17_solar_green: ['solar green'],
  mi_v17_bold_aqua: ['bold acqua'],
}

const COLORS = {
  mi_v17_white: '#ffffff',
  mi_v17_black: '#000000',
  mi_v17_collegiate_navy: '#000F44',
  mi_v17_collegiate_royal: '#2b3c74',
  mi_v17_light_blue: '#7092bc',
  mi_v17_coffee: '#6f4e37',
  mi_v17_maroon: '#4a2d35',
  mi_v17_collegiate_burgundy: '#602732',
  mi_v17_power_red: '#891e2e',
  mi_v17_victory_red: '#ab002e',
  mi_v17_collegiate_orange: '#b74024',
  mi_v17_yellow: '#e8d000',
  mi_v17_collegiate_gold: '#eca800',
  mi_v17_sand: '#baab81',
  mi_v17_dark_green: '#324c44',
  mi_v17_bold_green: '#40735e',
  mi_v17_collegiate_aqua: '#03bb85',
  mi_v17_collegiate_purple: '#38305a',
  mi_v17_eqt_pink: '#cf388b',
  mi_v17_onix: '#555f66',
  mi_v17_clear_onix: '#a9abb0',
  mi_v17_solar_yellow: '#f4ff50',
  mi_v17_solar_green: '#b1f166',
  mi_v17_bold_aqua: '#41b9d1',
}

const BASEOPTIONS = {
  jersey: {
    mi_v17_white: { hex: '#ffffff' },
    mi_v17_black: { hex: '#000000' },
    mi_v17_collegiate_navy: { hex: '#000F44' },
    mi_v17_collegiate_royal: { hex: '#2b3c74' },
    mi_v17_light_blue: { hex: '#7092bc' },
    mi_v17_coffee: { hex: '#6f4e37' },
    mi_v17_maroon: { hex: '#4a2d35' },
    mi_v17_collegiate_burgundy: { hex: '#602732' },
    mi_v17_power_red: { hex: '#891e2e' },
    mi_v17_victory_red: { hex: '#ab002e' },
    mi_v17_collegiate_orange: { hex: '#b74024' },
    mi_v17_yellow: { hex: '#e8d000' },
    mi_v17_collegiate_gold: { hex: '#eca800' },
    mi_v17_sand: { hex: '#baab81' },
    mi_v17_dark_green: { hex: '#324c44' },
    mi_v17_bold_green: { hex: '#40735e' },
    mi_v17_collegiate_aqua: { hex: '#03bb85' },
    mi_v17_collegiate_purple: { hex: '#38305a' },
    mi_v17_eqt_pink: { hex: '#cf388b' },
    mi_v17_onix: { hex: '#555f66' },
    mi_v17_clear_onix: { hex: '#a9abb0' },
    mi_v17_solar_yellow: { hex: '#f4ff50' },
    mi_v17_solar_green: { hex: '#b1f166' },
    mi_v17_bold_aqua: { hex: '#41b9d1' },
  },
  pant: {
    mi_v17_white: { hex: '#ffffff' },
    mi_v17_black: { hex: '#000000' },
    mi_v17_collegiate_navy: { hex: '#000F44' },
    mi_v17_collegiate_royal: { hex: '#2b3c74' },
    mi_v17_maroon: { hex: '#4a2d35' },
    mi_v17_power_red: { hex: '#891e2e' },
    mi_v17_dark_green: { hex: '#324c44' },
    mi_v17_collegiate_purple: { hex: '#38305a' },
    mi_v17_eqt_pink: { hex: '#cf388b' },
    mi_v17_onix: { hex: '#555f66' },
  },
}

const colorMap = color => {
  let colorCode = ''
  colorCode = Object.entries(COLORMAP).filter(clrMap =>
    clrMap[1].includes(color)
  )[0]
  if (!colorCode) {
    colorCode = ['mi_v17_black']
  }

  return colorCode[0]
}

const homeDecorations = ({ jersey, pant }, colors) => {
  if (colors && colors.length === 2) {
    jersey.textColor = colors[0]
    jersey.strokeColor = colors[1] === 'white' ? 'gold' : colors[1]
  } else if (colors && colors.length === 3) {
    jersey.textColor = colors[0]
    jersey.strokeColor = colors[1] === 'white' ? colors[2] : colors[1]
  } else {
    jersey.textColor = colors ? colors[0] : 'red'
    jersey.strokeColor = 'black'
  }

  jersey.textColorCode = colorMap(jersey.textColor)
  jersey.strokeColorCode = colorMap(jersey.strokeColor)

  jersey.frontImage = _.chain(jersey.frontImage)
    .replace(/(TEAM|NUMBER)TEXTCOLOR/g, jersey.textColorCode)
    .replace(/(TEAM|NUMBER)STROKECOLOR/g, jersey.strokeColorCode)
    .value()
  return { jersey, pant }
}

const awayDecorations = ({ jersey, pant }, colors) => {
  if (colors && colors.length === 2) {
    jersey.textColor = colors[1]
    jersey.strokeColor = colors[1].match(/gold/)
      ? 'white'
      : _.sample[('gold', 'black')]
  } else if (colors && colors.length === 3) {
    jersey.textColor = colors[1]
    jersey.strokeColor = colors[2]
  } else {
    jersey.textColor = 'white'
    jersey.strokeColor = 'black'
  }

  jersey.textColorCode = colorMap(jersey.textColor)
  jersey.strokeColorCode = colorMap(jersey.strokeColor)

  jersey.frontImage = _.chain(jersey.frontImage)
    .replace(/(TEAM|NUMBER)TEXTCOLOR/g, jersey.textColorCode)
    .replace(/(TEAM|NUMBER)STROKECOLOR/g, jersey.strokeColorCode)
    .value()
  return { jersey, pant }
}

module.exports = {
  JERSEY_URL,
  PANTS_URL,
  FONTS,
  BASEOPTIONS,
  COLORS,
  colorMap,
  homeDecorations,
  awayDecorations,
}
