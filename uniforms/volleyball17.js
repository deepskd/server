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
JERSEYTEXT_UPPERFRONT\
JERSEYTEXT_LOWERFRONT\
NUMBER_FRONT\
NUMBER_BACK\
obj=a&req=object}&resMode=sharp2&wid=250&op_usm=1.2,1,4,0\
TEAMCREST_LEFTSLEEVE\
TEAMCREST_RIGHTSLEEVE`

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
  mi_v17_collegiate_royal: ['royal', 'royal blue', 'blue'],
  mi_v17_light_blue: ['light blue', 'columbia blue'],
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
  mi_v17_bold_aqua: ['bold aqua'],
}

const COLORS = {
  mi_v17_white: { hex: '#ffffff', label: 'White' },
  mi_v17_black: { hex: '#000000', label: 'Black' },
  mi_v17_collegiate_navy: { hex: '#000F44', label: 'Navy' },
  mi_v17_collegiate_royal: { hex: '#2b3c74', label: 'Royal Blue' },
  mi_v17_light_blue: { hex: '#7092bc', label: 'Light Blue' },
  mi_v17_coffee: { hex: '#6f4e37', label: 'Coffee' },
  mi_v17_maroon: { hex: '#4a2d35', label: 'Maroon' },
  mi_v17_collegiate_burgundy: { hex: '#602732', label: 'Burgundy' },
  mi_v17_power_red: { hex: '#891e2e', label: 'Power Red' },
  mi_v17_victory_red: { hex: '#ab002e', label: 'Victory Red' },
  mi_v17_collegiate_orange: { hex: '#b74024', label: 'Orange' },
  mi_v17_yellow: { hex: '#e8d000', label: 'Yellow' },
  mi_v17_collegiate_gold: { hex: '#eca800', label: 'Gold' },
  mi_v17_sand: { hex: '#baab81', label: 'Sand' },
  mi_v17_dark_green: { hex: '#324c44', label: 'Dark Green' },
  mi_v17_bold_green: { hex: '#40735e', label: 'Bold Green' },
  mi_v17_collegiate_aqua: { hex: '#03bb85', label: 'Aqua' },
  mi_v17_collegiate_purple: { hex: '#38305a', label: 'Purple' },
  mi_v17_eqt_pink: { hex: '#cf388b', label: 'Pink' },
  mi_v17_onix: { hex: '#555f66', label: 'Onix' },
  mi_v17_clear_onix: { hex: '#a9abb0', label: 'Clear Onix' },
  mi_v17_solar_yellow: { hex: '#f4ff50', label: 'Solar Yellow' },
  mi_v17_solar_green: { hex: '#b1f166', label: 'Solar Green' },
  mi_v17_bold_aqua: { hex: '#41b9d1', label: 'Bold Aqua' },
}

const BASEOPTIONS = {
  jersey: {
    mi_v17_white: { hex: '#ffffff', label: 'White' },
    mi_v17_black: { hex: '#000000', label: 'Black' },
    mi_v17_collegiate_navy: { hex: '#000F44', label: 'Navy' },
    mi_v17_collegiate_royal: { hex: '#2b3c74', label: 'Royal' },
    mi_v17_light_blue: { hex: '#7092bc', label: 'Light Blue' },
    mi_v17_coffee: { hex: '#6f4e37', label: 'Coffee' },
    mi_v17_maroon: { hex: '#4a2d35', label: 'Maroon' },
    mi_v17_collegiate_burgundy: { hex: '#602732', label: 'Burgundy' },
    mi_v17_power_red: { hex: '#891e2e', label: 'Power Red' },
    mi_v17_victory_red: { hex: '#ab002e', label: 'Victory Red' },
    mi_v17_collegiate_orange: { hex: '#b74024', label: 'Orange' },
    mi_v17_yellow: { hex: '#e8d000', label: 'Yellow' },
    mi_v17_collegiate_gold: { hex: '#eca800', label: 'Gold' },
    mi_v17_sand: { hex: '#baab81', label: 'Sand' },
    mi_v17_dark_green: { hex: '#324c44', label: 'Dark Green' },
    mi_v17_bold_green: { hex: '#40735e', label: 'Bold Green' },
    mi_v17_collegiate_aqua: { hex: '#03bb85', label: 'Aqua' },
    mi_v17_collegiate_purple: { hex: '#38305a', label: 'Purple' },
    mi_v17_eqt_pink: { hex: '#cf388b', label: 'Pink' },
    mi_v17_onix: { hex: '#555f66', label: 'Onix' },
    mi_v17_clear_onix: { hex: '#a9abb0', label: 'Clear Onix' },
    mi_v17_solar_yellow: { hex: '#f4ff50', label: 'Solar Yellow' },
    mi_v17_solar_green: { hex: '#b1f166', label: 'Solar Green' },
    mi_v17_bold_aqua: { hex: '#41b9d1', label: 'Bold Aqua' },
  },
  pant: {
    mi_v17_white: { hex: '#ffffff', label: 'White' },
    mi_v17_black: { hex: '#000000', label: 'Black' },
    mi_v17_collegiate_navy: { hex: '#000F44', label: 'Navy' },
    mi_v17_collegiate_royal: { hex: '#2b3c74', label: 'Royal' },
    mi_v17_maroon: { hex: '#4a2d35', label: 'Maroon' },
    mi_v17_power_red: { hex: '#891e2e', label: 'Power Red' },
    mi_v17_dark_green: { hex: '#324c44', label: 'Dark Green' },
    mi_v17_collegiate_purple: { hex: '#38305a', label: 'Purple' },
    mi_v17_eqt_pink: { hex: '#cf388b', label: 'Pink' },
    mi_v17_onix: { hex: '#555f66', label: 'Onix' },
  },
}

const DECORATIONS = {
  jersey: {
    text: {
      label: 'Jersey Text',
      upper_front: {
        label: 'Upper Front',
        options: {
          size: ['small'],
          style: ['straight'],
          small_straight: {
            label: '2.5 inch Straight',
            url: `obj=a/o/ufo&decal&show&res=41.940789473684205&pos=0,0&src=fxg{adidasAG/APP16_vuw_teamname_straight?&$application=sublimation&$text=TEAMNAME&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}&`,
          },
        },
      },
      lower_front: {
        label: 'Lower Front',
        options: {
          size: ['small'],
          style: ['straight'],
          small_straight: {
            label: '2.5 inch Straight',
            url: `obj=a/o/lfo&decal&show&res=41.940789473684205&pos=0,0&src=fxg{adidasAG/APP16_vuw_teamname_straight?&$application=sublimation&$text=TEAMNAME&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}&`,
          },
        },
      },
    },
    team_crest: {
      label: 'Jersey Crest',
      options: {
        left_sleeve: {
          label: 'Left Sleeve',
          url: `&obj=a/o/lsl&decal&show&res=1342.1052631578946&pos=0,0&src=is{TEAMCREST_IMAGEURL?}`,
        },
        right_sleeve: {
          label: 'Right Sleeve',
          url: `&obj=a/o/rsl&decal&show&res=1342.1052631578946&pos=0,0&src=is{TEAMCREST_IMAGEURL?}`,
        },
      },
    },
    number: {
      label: 'Player Number',
      front: {
        label: 'Front',
        options: {
          size: ['small', 'large'],
          small: {
            label: '4 inches',
            url: `obj=a/o/cfc&decal&show&res=26.315789473684216&pos=0,0&src=fxg{adidasAG/APP16_vuw_playernumber?&$application=sublimation&$text=PLAYERNUMBER&$font=NUMBERFONT&$text_color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}&`,
          },
          large: {
            label: '6 inches',
            url: `obj=a/o/cfc&decal&show&res=17.65927977839335&pos=0,0&src=fxg{adidasAG/APP16_vuw_playernumber?&$application=sublimation&$text=PLAYERNUMBER&$font=NUMBERFONT&$text_color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}&`,
          },
        },
      },
      back: {
        label: 'Back',
        options: {
          size: ['small', 'large'],
          small: {
            label: '6 inches',
            url: `obj=a/o/cbc&decal&show&res=13.22271195229453&pos=0,0&src=fxg{adidasAG/APP16_vuw_playernumber?&$application=sublimation&$text=PLAYERNUMBER&$font=NUMBERFONT&$text_color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}&`,
          },
          large: {
            label: '8 inches',
            url: `obj=a/o/cbc&decal&show&res=17.65927977839335&pos=0,0&src=fxg{adidasAG/APP16_vuw_playernumber?&$application=sublimation&$text=PLAYERNUMBER&$font=NUMBERFONT&$text_color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}&`,
          },
        },
      },
    },
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

const DESIGN_PANELS = [
  {
    key: 'jersey-front-text',
    title: 'Jersey Front Text',
  },
  {
    key: 'jersey-number',
    title: 'Jersey Player Number',
  },
  {
    key: 'jersey-team-crest',
    title: 'Jersey Team Crest',
  },
  {
    key: 'jersey-logo',
    title: 'Jersey Logo',
  },
  {
    key: 'pant-logo',
    title: 'Shorts Logo',
  },
]

module.exports = {
  JERSEY_URL,
  PANTS_URL,
  FONTS,
  BASEOPTIONS,
  COLORS,
  colorMap,
  DECORATIONS,
  DESIGN_PANELS,
}
