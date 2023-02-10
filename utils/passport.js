const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const FacebookStrategy = require('passport-facebook')

// passport.serializeUser((user, done) => {
//     console.log(user)
//     done(null, user)
// })

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user)
//   })
// })

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.url}/google/redirectGoogle`
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log(profile)
    const userExist = await User.findOne({googleId: profile.id})
    if(!userExist){
      try{
        const newUser = new User({
          email: profile._json.email,
          username: profile.displayName,
          googleId: profile.id,
          image: profile._json.picture, 
        })
        await newUser.save()
        
        const token = jwt.sign(
          {
            id: newUser._id,
            created: Date.now().toString(),
          },
          process.env.jwtSecret,
          {expiresIn: "3d"}
        )
        newUser.token = token
        await newUser.save()
        done(null, newUser)
      }catch(err){
        console.log(err)
      }
    }else{
      console.log("User already exists")
      const token = jwt.sign(
        {
          id: userExist._id,
          created: Date.now().toString()
        },
        process.env.jwtSecret,
        {expiresIn: "3d"}
      )
      userExist.token = token
      await userExist.save()
      done(null, userExist)
    }
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${process.env.url}/facebook/redirectFacebook`,
  profileFields: ['id', 'displayName', 'photos', 'email'],
},
  async (accessToken, refreshToken, profile, done) => {
    // console.log(profile, profile._json.picture.data.url)
    const userExist = await User.findOne({facebookId: profile.id})
    if(!userExist){
      const newUser = new User({
        email: profile._json.email,
        username: profile.displayName,
        facebookId: profile.id,
        image: profile._json.picture.data.url
      })
      await newUser.save()

      const token = jwt.sign(
        {
          id: newUser._id,
          created: Date.now().toString(),
        },
        process.env.jwtSecret,
        {expiresIn: "3d"}
      )
      newUser.token = token
      await newUser.save()
      done(null, newUser)
    }
    else{
      console.log("User already exists")
      const token = jwt.sign(
        {
          id: userExist._id,
          created: Date.now().toString(),
        },
        process.env.jwtSecret,
        {expiresIn: "3d"}
      )
      userExist.token = token
      await userExist.save()
      done(null, userExist)
    }
}
));