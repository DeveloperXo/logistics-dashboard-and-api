import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Customer, Admin } from 'models';
import config from './config';

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // don't make ignoreExpiration true because it does not validate auth expire time
    ignoreExpiration: false
};

const jwtVerify = async (payload, done) => {
    try {
        let user = await Customer.findById(payload.sub);
        if (!user) {
            user = await Admin.findById(payload.sub);
            if (!user){
                return done(null, false);
            }
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
export default jwtStrategy;