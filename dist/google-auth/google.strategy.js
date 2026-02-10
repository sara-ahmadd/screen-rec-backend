import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import User from "../db/models/user.model.js";
import { providers } from "../constants.js";
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
    const { id, displayName, emails, photos } = profile;
    const userEmail = emails?.[0]?.value;
    const userAvatar = photos?.[0]?.value;
    //check user existence by google id at first
    //if user already exists retuen user
    let user = await User.findOne({ where: { googleId: id } });
    if (user)
        return done(null, user);
    //   check user existance by email
    user = await User.findOne({ where: { email: userEmail } });
    // if user has no google id, but his email exists, set his google id (link with google)
    if (user) {
        const userPass = user?.getDataValue("password");
        const userGoogleId = user?.getDataValue("googleId");
        if (userPass && !userGoogleId) {
            user.setDataValue("googleId", id);
            user.setDataValue("provider", providers.google);
            user.setDataValue("user_name", displayName ?? user.getDataValue('user_name'));
            user.setDataValue("avatar_url", userAvatar ?? user.getDataValue('avatar_url'));
            await user.save();
        }
        console.log({ userr: user });
        return done(null, user); // at least for testing
    }
    const newUser = await User.create({
        user_name: displayName,
        email: userEmail,
        avatar_url: userAvatar,
        googleId: id,
        provider: providers.google,
        isActivated: true,
    });
    return done(null, newUser); // at least for testing
}));
export default passport;
//# sourceMappingURL=google.strategy.js.map