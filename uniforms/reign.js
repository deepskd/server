const _ = require('lodash')

const JERSEY_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&\
src=ir{adidasAGRender/APP18_rem_je_1?&obj=a/f/nvr&show\
&obj=a/m/bas&src=BASECOLOR&show&\
obj=a/m/nec&src=NECKCOLOR&show\
&obj=a/m/log&src=LOGOCOLOR&show\
&obj=a/s/shg&show\
&obj=a/o/ust_u1&src=STRIPE1COLOR&show\
&obj=a/o/lst_l1&src=STRIPE2COLOR&show\
&obj=a/o/str_s0&show&\
JERSEYTEXT_UPPERFRONT\
JERSEYTEXT_LOWERFRONT\
NUMBER_FRONT\
NUMBER_BACK\
&obj=a&req=object}&resMode=sharp2&wid=250&op_usm=1.2,1,4,0`

// stroke=false&$stroke_color=none

const PANTS_URL = `https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&\
src=ir{adidasAGRender/APP18_rem_sh_1?&\
obj=a/f/nvr&show&\
obj=a/m/bas&src=BASECOLOR&show&\
obj=a/m/log&src=LOGOCOLOR&show&\
obj=a/s/shg&show&\
obj=a/o/lst_l1&src=TEAMTEXTCOLOR&show&\
obj=a/o/str_s0&show\
&obj=a&req=object}&resMode=sharp2&wid=250&op_usm=1.2,1,4,0`

// &obj=a/o/rle&decal&show&res=10.567757977621218&pos=0,0&src=fxg{APP18_rem_sho_teamletter?$application=sublimation&&$text=TEAMLETTER&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}&\
// obj=a/o/lle&decal&show&res=10.567757977621218&pos=0,0&src=fxg{APP18_rem_sho_teamletter?&$application=sublimation&$text=TEAMLETTER&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}

const FONTS = {
  adineue_pro_bold: 'Adineue Pro Bold',
  clarendon_bold: 'Clarendon Bold',
  full_block: 'Full Block',
  half_block: 'Half Block',
  louisville: 'Louisville',
}

const COLORMAP = {
  mi_rei_black: ['black'],
  mi_rei_white: ['white'],
  mi_rei_collegiate_navy: ['navy', 'navy blue'],
  mi_rei_collegiate_royal: ['royal', 'royal blue', 'blue'],
  mi_rei_light_blue: ['columbia blue', 'light blue'],
  mi_rei_maroon: ['maroon'],
  mi_rei_collegiate_burgundy: ['burgundy', 'burgandy'],
  mi_rei_power_red: ['red', 'cardinal', 'scarlet'],
  mi_rei_collegiate_orange: ['orange', 'texas orange'],
  mi_rei_collegiate_gold: ['gold'],
  mi_rei_yellow: ['yellow'],
  mi_rei_sand: ['old gold', 'vegas gold'],
  mi_rei_coffee: ['coffee'],
  mi_rei_collegiate_aqua: ['aqua'],
  mi_rei_green: ['green', 'kelly green'],
  mi_rei_dark_green: ['forest green', 'dark green'],
  mi_rei_collegiate_purple: ['purple'],
  mi_rei_intense_pink: ['pink'],
  mi_rei_onix: ['gray'],
  mi_rei_clear_onix: ['silver'],
}

const COLORS = {
  mi_rei_black: { hex: '#000000', label: 'Black' },
  mi_rei_white: { hex: '#ffffff', label: 'White' },
  mi_rei_collegiate_navy: { hex: '#000F44', label: 'Navy' },
  mi_rei_collegiate_royal: { hex: '#2b3c74', label: 'Royal' },
  mi_rei_light_blue: { hex: '#7092bc', label: 'Light Blue' },
  mi_rei_maroon: { hex: '#4a2d35', label: 'Maroon' },
  mi_rei_collegiate_burgundy: { hex: '#602732', label: 'Burgundy' },
  mi_rei_power_red: { hex: '#891e2e', label: 'Power Red' },
  mi_rei_collegiate_orange: { hex: '#b74024', label: 'Orange' },
  mi_rei_collegiate_gold: { hex: '#eca800', label: 'Gold' },
  mi_rei_yellow: { hex: '#e8d000', label: 'Yellow' },
  mi_rei_sand: { hex: '#baab81', label: 'Sand' },
  mi_rei_coffee: { hex: '#6f4e37', label: 'Coffee' },
  mi_rei_collegiate_aqua: { hex: '#03bb85', label: 'Aqua' },
  mi_rei_green: { hex: '#40735e', label: 'Green' },
  mi_rei_dark_green: { hex: '#324c44', label: 'Dark Green' },
  mi_rei_collegiate_purple: { hex: '#38305a', label: 'Purple' },
  mi_rei_intense_pink: { hex: '#cf388b', label: 'Pink' },
  mi_rei_onix: { hex: '#555f66', label: 'Onix' },
  mi_rei_clear_onix: { hex: '#a9abb0', label: 'Clear Onix' },
}

const BASEOPTIONS = {
  jersey: {
    mi_rei_black: { hex: '#000000', label: 'Black' },
    mi_rei_white: { hex: '#ffffff', label: 'White' },
    mi_rei_collegiate_navy: { hex: '#000F44', label: 'Navy' },
    mi_rei_collegiate_royal: { hex: '#2b3c74', label: 'Royal' },
    mi_rei_light_blue: { hex: '#7092bc', label: 'Light Blue' },
    mi_rei_maroon: { hex: '#4a2d35', label: 'Maroon' },
    mi_rei_collegiate_burgundy: { hex: '#602732', label: 'Burgundy' },
    mi_rei_power_red: { hex: '#891e2e', label: 'Power Red' },
    mi_rei_collegiate_orange: { hex: '#b74024', label: 'Orange' },
    mi_rei_collegiate_gold: { hex: '#eca800', label: 'Gold' },
    mi_rei_yellow: { hex: '#e8d000', label: 'Yellow' },
    mi_rei_sand: { hex: '#baab81', label: 'Sand' },
    mi_rei_coffee: { hex: '#6f4e37', label: 'Coffee' },
    mi_rei_collegiate_aqua: { hex: '#03bb85', label: 'Aqua' },
    mi_rei_green: { hex: '#40735e', label: 'Green' },
    mi_rei_dark_green: { hex: '#324c44', label: 'Dark Green' },
    mi_rei_collegiate_purple: { hex: '#38305a', label: 'Purple' },
    mi_rei_intense_pink: { hex: '#cf388b', label: 'Pink' },
    mi_rei_onix: { hex: '#555f66', label: 'Onix' },
    mi_rei_clear_onix: { hex: '#a9abb0', label: 'Clear Onix' },
  },
  pant: {
    mi_rei_black: { hex: '#000000', label: 'Black' },
    mi_rei_white: { hex: '#ffffff', label: 'White' },
    mi_rei_collegiate_navy: { hex: '#000F44', label: 'Navy' },
    mi_rei_collegiate_royal: { hex: '#2b3c74', label: 'Royal' },
    mi_rei_light_blue: { hex: '#7092bc', label: 'Light Blue' },
    mi_rei_maroon: { hex: '#4a2d35', label: 'Maroon' },
    mi_rei_collegiate_burgundy: { hex: '#602732', label: 'Burgundy' },
    mi_rei_power_red: { hex: '#891e2e', label: 'Power Red' },
    mi_rei_collegiate_orange: { hex: '#b74024', label: 'Orange' },
    mi_rei_collegiate_gold: { hex: '#eca800', label: 'Gold' },
    mi_rei_yellow: { hex: '#e8d000', label: 'Yellow' },
    mi_rei_sand: { hex: '#baab81', label: 'Sand' },
    mi_rei_coffee: { hex: '#6f4e37', label: 'Coffee' },
    mi_rei_collegiate_aqua: { hex: '#03bb85', label: 'Aqua' },
    mi_rei_green: { hex: '#40735e', label: 'Green' },
    mi_rei_dark_green: { hex: '#324c44', label: 'Dark Green' },
    mi_rei_collegiate_purple: { hex: '#38305a', label: 'Purple' },
    mi_rei_intense_pink: { hex: '#cf388b', label: 'Pink' },
    mi_rei_onix: { hex: '#555f66', label: 'Onix' },
    mi_rei_clear_onix: { hex: '#a9abb0', label: 'Clear Onix' },
  },
}

const colorMap = color => {
  let colorCode = ''
  colorCode = Object.entries(COLORMAP).filter(clrMap =>
    clrMap[1].includes(color)
  )[0]
  if (!colorCode) {
    colorCode = ['mi_rei_black']
  }

  return colorCode[0]
}

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
    key: 'jersey-logo',
    title: 'Jersey Logo',
  },
  {
    key: 'jersey-neck',
    title: 'Jersey Neck',
  },
  {
    key: 'jersey-side-stripe-1',
    title: 'Jersey Side Upper Stripe',
  },
  {
    key: 'jersey-side-stripe-2',
    title: 'Jersey Side Lower Stripe',
  },
  {
    key: 'pant-logo',
    title: 'Shorts Logo',
  },
]

const DECORATIONS = {
  jersey: {
    text: {
      label: 'Jersey Text',
      upper_front: {
        label: 'Upper Front',
        options: {
          size: ['small'],
          style: ['straight', 'curved'],
          small_straight: {
            label: '2.5 inch Straight',
            url: `obj=a/o/ufr&decal&show&res=42.606516290726816&pos=0,0&src=fxg{APP18_rem_jer_teamname_straight?&$application=sublimation&$text=TEAMNAME&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}&`,
          },
          small_curved: {
            label: '2.5 inch Curved',
            url: `obj=a/o/ufr&decal&show&res=42.606516290726816&pos=0,0&src=fxg{APP18_rem_jer_teamname_vertical?&$application=sublimation&$text=TEAMNAME&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}&`,
          },
        },
      },
      lower_front: {
        label: 'Lower Front',
        options: {
          size: ['small'],
          style: ['straight', 'curved'],
          small_straight: {
            label: '2.5 inch Straight',
            url: `obj=a/o/lfr&decal&show&res=42.606516290726816&pos=0,0&src=fxg{APP18_rem_jer_teamname_straight?&$application=sublimation&$text=TEAMNAME&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}&`,
          },
          small_curved: {
            label: '2.5 inch curved',
            url: `obj=a/o/lfr&decal&show&res=42.606516290726816&pos=0,0&src=fxg{APP18_rem_jer_teamname_reverse_vertical?&$application=sublimation&$text=TEAMNAME&$font=TEAMFONT&$text_color=TEAMTEXTCOLOR&$stroke_color=TEAMSTROKECOLOR}&`,
          },
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
            url: `&obj=a/o/cch&decal&show&res=26.57634184471079&pos=0,0&src=fxg{APP18_rem_jer_playernumber?&$application=sublimation&$text=PLAYERNUMBER&$font=NUMBERFONT&$color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}`,
          },
          large: {
            label: '6 inches',
            url: `&obj=a/o/cch&decal&show&res=17.65927977839335&pos=0,0&src=fxg{APP18_rem_jer_playernumber?&$application=sublimation&$text=PLAYERNUMBER&$font=NUMBERFONT&$color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}`,
          },
        },
      },
      back: {
        label: 'Back',
        options: {
          size: ['small', 'large'],
          small: {
            label: '6 inches',
            url: `&obj=a/o/cba&decal&show&res=17.65927977839335&pos=0,0&src=fxg{APP18_rem_jer_playernumber?&$application=sublimation&$text=PLAYERNUMBER&$font=NUMBERFONT&$color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}`,
          },
          large: {
            label: '8 inches',
            url: `&obj=a/o/cba&decal&show&res=13.22271195229453&pos=0,0&src=fxg{APP18_rem_jer_playernumber?&$application=sublimation&$text=PLAYERNUMBER&$font=NUMBERFONT&$color=NUMBERTEXTCOLOR&$stroke_color=NUMBERSTROKECOLOR}`,
          },
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
  DESIGN_PANELS,
}
