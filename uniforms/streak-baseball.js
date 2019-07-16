const _ = require('lodash')

const JERSEY_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&src=ir{adidasAGRender/APP16_stm_jfb_1?&\
obj=a/f/nvr&show&\
obj=a/m/bas&src=BASECOLOR&show&\
obj=a/s/shg&show&\
obj=a/o/col_c1&src=str_transparent&show&\
obj=a/o/pst_s1&src=str_white&show&\
obj=a/o/sfr_g1&src=str_white&show&\
obj=a/o/sf2_e1&src=str_white&show&\
obj=a/o/log&src=LOGOCOLOR&show&\
obj=a/o/ufa&decal&show&res=41.940789473684205&pos=0,0&src=fxg{adidasAG/APP16_stm_jfb_teamname_straight?&$text=TEAMNAME&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR&$application=sublimation}&\
obj=a/o/ubu&decal&show&res=13.421052631578947&pos=0,0&src=fxg{adidasAG/APP16_stm_jfb_playernumber?&$application=sublimation&$text=PLAYERNUMBER&$font=NUMBERFONT&$text_color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}&\
obj=a/o/ufl&decal&show&res=26.842105263157894&pos=0,0&src=fxg{adidasAG/APP16_stm_jfb_playernumber?&$application=sublimation&$text=PLAYERNUMBER&$font=NUMBERFONT&$text_color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}\
TEAMCREST_LEFTSLEEVE\
TEAMCREST_RIGHTSLEEVE\
&obj=a&req=object}&resMode=sharp2&wid=250&op_usm=1.2,1,4,0`

const PANTS_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&src=ir{adidasAGRender/APP16_stm_pan_ap_1?&\
obj=a/f/nvr&show&\
obj=a/m/shp_ap&show&\
obj=a/m/bas&src=BASECOLOR&show&\
obj=a/s/shg&show&\
obj=a/o/spa&src=TEAMTEXTCOLOR&show&\
obj=a/o/ssi_s0&show&\
obj=a/o/ss2_e0&src=str_transparent&show&\
obj=a/o/log&src=LOGOCOLOR&show&\
obj=a&req=object}&resMode=sharp2&wid=250&op_usm=1.2,1,4,0`
//obj=a/o/lle&decal&show&res=41.29554655870446&pos=0,0&src=fxg{adidasAG/APP16_stm_pan_teamname_straight?&$application=sublimation&$text=TEAMNAME&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}&\

const FONTS = {
  brush_script: 'Brush Script',
  full_block: 'Full Block',
  half_block: 'Half Block',
  louisville: 'Louisville',
  plain_block: 'Plain Block',
  roadrunner: 'Road Runner',
  times_bold: 'Times Bold',
  western: 'Western',
}

const COLORMAP = {
  str_white: ['white'],
  str_black: ['black'],
  str_collegiate_navy: ['navy', 'navy blue'],
  str_collegiate_royal: ['royal', 'royal blue', 'blue'],
  str_light_blue: ['columbia blue', 'light blue'],
  str_maroon: ['maroon'],
  str_collegiate_burgundy: ['burgundy', 'burgandy'],
  str_power_red: ['red', 'cardinal', 'scarlet'],
  str_collegiate_orange: ['orange', 'texas orange'],
  str_collegiate_gold: ['gold'],
  str_sand: ['old gold', 'vegas gold'],
  str_dark_green: ['forest green', 'dark green'],
  str_collegiate_purple: ['purple'],
  str_intense_pink: ['pink'],
  str_onix: ['gray'],
  str_light_onix: ['silver'],
}

const COLORS = {
  str_white: { hex: '#ffffff', label: 'White' },
  str_black: { hex: '#000000', label: 'Black' },
  str_collegiate_navy: { hex: '#000F44', label: 'Navy' },
  str_collegiate_royal: { hex: '#2b3c74', label: 'Royal Blue' },
  str_light_blue: { hex: '#7092bc', label: 'Light Blue' },
  str_maroon: { hex: '#4a2d35', label: 'Maroon' },
  str_collegiate_burgundy: { hex: '#602732', label: 'Burgundy' },
  str_power_red: { hex: '#891e2e', label: 'Power Red' },
  str_collegiate_orange: { hex: '#b74024', label: 'Orange' },
  str_collegiate_gold: { hex: '#eca800', label: 'Gold' },
  str_sand: { hex: '#baab81', label: 'Sand' },
  str_dark_green: { hex: '#324c44', label: 'Dark Green' },
  str_collegiate_purple: { hex: '#38305a', label: 'Purple' },
  str_intense_pink: { hex: '#cf388b', label: 'Pink' },
  str_onix: { hex: '#555f66', label: 'Onix' },
  str_light_onix: { hex: '#a9abb0', label: 'Light Onix' },
}

const BASEOPTIONS = {
  jersey: {
    str_white: { hex: '#ffffff', label: 'White' },
    str_black: { hex: '#000000', label: 'Black' },
    str_collegiate_navy: { hex: '#000F44', label: 'Navy' },
    str_collegiate_royal: { hex: '#2b3c74', label: 'Royal' },
    str_light_blue: { hex: '#7092bc', label: 'Light Blue' },
    str_maroon: { hex: '#4a2d35', label: 'Maroon' },
    str_collegiate_burgundy: { hex: '#602732', label: 'Burgundy' },
    str_power_red: { hex: '#891e2e', label: 'Power Red' },
    str_collegiate_orange: { hex: '#b74024', label: 'Orange' },
    str_collegiate_gold: { hex: '#eca800', label: 'Gold' },
    str_sand: { hex: '#baab81', label: 'Sand' },
    str_dark_green: { hex: '#324c44', label: 'Dark Green' },
    str_collegiate_purple: { hex: '#38305a', label: 'Purple' },
    str_intense_pink: { hex: '#cf388b', label: 'Pink' },
    str_onix: { hex: '#555f66', label: 'Onix' },
    str_light_onix: { hex: '#a9abb0', label: 'Light Onix' },
  },
  pant: {
    str_white: { hex: '#ffffff', label: 'White' },
    str_black: { hex: '#000000', label: 'Black' },
    str_collegiate_navy: { hex: '#000F44', label: 'Navy' },
    str_collegiate_royal: { hex: '#2b3c74', label: 'Royal' },
    str_light_blue: { hex: '#7092bc', label: 'Light Blue' },
    str_maroon: { hex: '#4a2d35', label: 'Maroon' },
    str_collegiate_burgundy: { hex: '#602732', label: 'Burgundy' },
    str_power_red: { hex: '#891e2e', label: 'Power Red' },
    str_collegiate_orange: { hex: '#b74024', label: 'Orange' },
    str_collegiate_gold: { hex: '#eca800', label: 'Gold' },
    str_sand: { hex: '#baab81', label: 'Sand' },
    str_dark_green: { hex: '#324c44', label: 'Dark Green' },
    str_collegiate_purple: { hex: '#38305a', label: 'Purple' },
    str_intense_pink: { hex: '#cf388b', label: 'Pink' },
    str_onix: { hex: '#555f66', label: 'Onix' },
    str_light_onix: { hex: '#a9abb0', label: 'Light Onix' },
  },
}

const colorMap = color => {
  let colorCode = ''
  colorCode = Object.entries(COLORMAP).filter(clrMap =>
    clrMap[1].includes(color)
  )[0]
  if (!colorCode) {
    colorCode = ['str_black']
  }

  return colorCode[0]
}

// const homeDecorations = ({ jersey, pant }, colors) => {
//   if (colors && colors.length === 2) {
//     jersey.textColor = colors[0]
//     jersey.strokeColor = colors[1] === 'white' ? 'gold' : colors[1]
//   } else if (colors && colors.length === 3) {
//     jersey.textColor = colors[0]
//     jersey.strokeColor = colors[1] === 'white' ? colors[2] : colors[1]
//   } else {
//     jersey.textColor = colors ? colors[0] : 'red'
//     jersey.strokeColor = 'black'
//   }

//   jersey.textColorCode = colorMap(jersey.textColor)
//   jersey.strokeColorCode = colorMap(jersey.strokeColor)

//   jersey.frontImage = _.chain(jersey.frontImage)
//     .replace(/(TEAM|NUMBER)TEXTCOLOR/g, jersey.textColorCode)
//     .replace(/(TEAM|NUMBER)STROKECOLOR/g, jersey.strokeColorCode)
//     .value()
//   return { jersey, pant }
// }

// const awayDecorations = ({ jersey, pant }, colors) => {
//   if (colors && colors.length === 2) {
//     jersey.textColor = colors[1]
//     jersey.strokeColor = colors[1].match(/gold/)
//       ? 'white'
//       : _.sample[('gold', 'black')]
//   } else if (colors && colors.length === 3) {
//     jersey.textColor = colors[1]
//     jersey.strokeColor = colors[2]
//   } else {
//     jersey.textColor = 'white'
//     jersey.strokeColor = 'black'
//   }

//   jersey.textColorCode = colorMap(jersey.textColor)
//   jersey.strokeColorCode = colorMap(jersey.strokeColor)

//   jersey.frontImage = _.chain(jersey.frontImage)
//     .replace(/(TEAM|NUMBER)TEXTCOLOR/g, jersey.textColorCode)
//     .replace(/(TEAM|NUMBER)STROKECOLOR/g, jersey.strokeColorCode)
//     .value()
//   return { jersey, pant }
// }

const DECORATIONS = {
  jersey: {
    team_crest: {
      label: 'Jersey Crest',
      options: {
        left_sleeve: {
          label: 'Left Sleeve',
          url: `&obj=a/o/slc&decal&show&res=1020&pos=0,0&src=is{TEAMCREST_IMAGEURL?}`,
        },
        right_sleeve: {
          label: 'Right Sleeve',
          url: `&obj=a/o/src&decal&show&res=1020&pos=0,0&src=is{TEAMCREST_IMAGEURL?}`,
        },
      },
    },
  },
}

module.exports = {
  JERSEY_URL,
  PANTS_URL,
  FONTS,
  BASEOPTIONS,
  COLORS,
  colorMap,
  DECORATIONS,
}
