const _ = require('lodash')

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
&obj=a&req=object}&resMode=sharp2&wid=250&op_usm=1.2,1,4,0`

const PANTS_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?\
&src=ir{adidasAGRender/APP16_bbm_sho_1?\
&obj=a/m/bod&src=BASECOLOR\
&show&obj=a/m/wba&src=TEAMTEXTCOLOR\
&show&obj=a/m/bac&src=TEAMSTROKECOLOR\
&show&obj=a/s/shg\
&show&obj=a/o/ar1_a7&src=TEAMTEXTCOLOR&show\
&obj=a/o/ar2_b0&show&\
obj=a/o/log&src=LOGOCOLOR\
&show&obj=a&req=object}\
&resMode=sharp2&wid=250&op_usm=1.2,1,4,0`

const FONTS = {
  brush_script: 'Brush Script',
  dribbler: 'Dribbler',
  event_2012: 'Event 2012',
  full_block: 'Full Block',
  half_block: 'Half Block',
  invader: 'Invader',
  plain_block: 'Plain Block',
  redzone: 'Redzone',
  roadrunner: 'Roadrunner',
  times_bold: 'Times Bold',
  western: 'Western',
}

const COLORMAP = {
  tru_black: ['black'],
  tru_white: ['white'],
  tru_collegiate_navy: ['navy', 'navy blue'],
  tru_collegiate_royal: ['royal', 'royal blue'],
  tru_light_blue: ['blue', 'columbia blue'],
  tru_maroon: ['maroon'],
  tru_collegiate_burgundy: ['burgundy', 'burgandy'],
  tru_power_red: ['red', 'cardinal', 'scarlet'],
  tru_collegiate_orange: ['orange', 'texas orange'],
  tru_collegiate_gold: ['gold'],
  tru_yellow: ['yellow'],
  tru_sand: ['old gold', 'vegas gold'],
  tru_coffee: ['coffee'],
  tru_collegiate_aqua: ['aqua'],
  tru_green: ['green', 'kelly green'],
  tru_dark_green: ['forest green', 'dark green'],
  tru_collegiate_purple: ['purple'],
  tru_intense_pink: ['pink'],
  tru_onix: ['gray'],
  tru_clear_onix: ['silver'],
}

const COLORS = {
  tru_black: '#000000',
  tru_white: '#ffffff',
  tru_collegiate_navy: '#000F44',
  tru_collegiate_royal: '#2b3c74',
  tru_light_blue: '#7092bc',
  tru_maroon: '#4a2d35',
  tru_collegiate_burgundy: '#602732',
  tru_power_red: '#891e2e',
  tru_collegiate_orange: '#b74024',
  tru_collegiate_gold: '#eca800',
  tru_yellow: '#e8d000',
  tru_sand: '#baab81',
  tru_coffee: '#6f4e37',
  tru_collegiate_aqua: '#03bb85',
  tru_green: '#40735e',
  tru_dark_green: '#324c44',
  tru_collegiate_purple: '#38305a',
  tru_intense_pink: '#cf388b',
  tru_onix: '#555f66',
  tru_clear_onix: '#a9abb0',
}

const colorMap = color => {
  let colorCode = ''
  colorCode = Object.entries(COLORMAP).filter(clrMap =>
    clrMap[1].includes(color)
  )[0]
  if (!colorCode) {
    colorCode = ['tru_black']
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

  jersey.frontImage = _.replace(
    jersey.frontImage,
    /(TEAM|NUMBER)TEXTCOLOR/g,
    jersey.textColorCode
  )
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /(TEAM|NUMBER)STROKECOLOR/g,
    jersey.strokeColorCode
  )
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

  jersey.frontImage = _.replace(
    jersey.frontImage,
    /(TEAM|NUMBER)TEXTCOLOR/g,
    jersey.textColorCode
  )
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /(TEAM|NUMBER)STROKECOLOR/g,
    jersey.strokeColorCode
  )

  return { jersey, pant }
}

module.exports = {
  JERSEY_URL,
  PANTS_URL,
  FONTS,
  COLORS,
  colorMap,
  homeDecorations,
  awayDecorations,
}
