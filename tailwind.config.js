
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {},
    maxWidth: {
      '1/4': '25%',
      '2/5':"40%",
      '1/2': '50%',
      '3/4': '75%',
     },
     fontSize:{
      '6xl':["4rem", {
        lineHeight:"4.4rem",
      }],
      "4xl":["1.4rem",{
        // lineHeight:"40px"
      }],
      "3xl":["1.2rem",{
        // lineHeight:"40px"
      }],
      "40":["30px"]

     },
     backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#8460c2',
             'secondary': '#ffed4a',
            'danger': '#e3342f',
            }),
    textColor: theme => ({
              ...theme('colors'),
              'primary': '#8460c2',
               'secondary': '#ffed4a',
              'danger': '#e3342f',
              }),
    fontFamily:{
      'lato':['Lato'],
      'black-han-sans':['Black Han Sans'],
      'montserrat':["Montserrat"],
      'exo':['Exo'],
      'sigmar':['Sigmar'],
      'cabin':['Cabin'],
      'kalam':['Kalam'],
      'courgette':['Courgette']
    }
      
  },
  variants: {},
  plugins: [],
}
