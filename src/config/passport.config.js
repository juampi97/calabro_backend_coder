import passport from "passport";
import local from "passport-local";
import userModel from "../model/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
    
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, age, email } = req.body;
        try {
            let user = await userModel.findOne({ email: username }).lean().exec();
            if (user) {
                console.log('User already exists');
                return done(null, false);
            }
            const newUser = {
                first_name,
                last_name,
                age,
                email,
                password: creteHash(password)
            }
            let result = await userModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done("Error al obtener el usuario: "+error);
        }
    }));
}

export default initializePassport;
