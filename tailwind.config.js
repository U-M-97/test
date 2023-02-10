/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    
    extend: {
      colors:{
        pink: "#e75387",
        green: "#88ced0",
        greenHover: "#A0D8D9",
        font: "#595f5f",
        gray: "#7592a0",
        lightGray: "lightGray",
        servicesBG: "#f3fafa",
        login: "#dae5e8",
        google: "	#DB4437",
        facebookColor: "#3b5998",
        facebookHover: "#2F477A",
        googleHover: "#CCCCCC",
        dashboard: "#03c9d7",
        saleHeader: "#fcdb04",
        discountGreen: "#bbf982",
        greenTransparent: "rgba(136, 206, 208, 0.6)"
      },
      fontFamily:{
        main: ['Nunito Sans', "sans-serif"]
      },
      width:{
        width: "1500px",
        picturesWrapper: "400vw",
        translateWidth: "100vw",
        plabWidth: "1400px",
        box: "570px",
        card: "380px",
        aboutWidth: "1200px",
        aboutPic: "500px",
        testimonials: "600px",
        testimonialsContainer: "1400px",
        svg: "200px",
        courseWidth: "700px",
        courses: "1250px",
        roomAddIconWidth: "70px",
        dialog: "800px",
      },
      scale:{
        arrow: "3",
        services: "3",
        testimonialArrow: "2",
        trustedBy: "4"
      },
      height:{
        slider: "600px",
        about: "900px",
        card: "320px",
        aboutPic: "550px",
        accommodation: "500px",
        testimonials: "405px",
        svg: "200px",
        signup: "650px",
        review: "400px",
        dialog: "450px",
        dialogContainer: "620px"
      },
      borderWidth:{
        aboutPic: "10px",
        footer: "1px"
      },
      padding:{
        important: "2px",
      },
      translate:{
        cards: "340px"
      },
      letterSpacing:{
        debitCard: "5px",
        name: "3px"
      },
      spacing: {
        firstRow: "260px"
      }
    },
  },
  plugins: [
    
  ]
}
