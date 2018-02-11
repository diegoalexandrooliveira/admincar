import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import * as passport from "passport";


export class PassportStrategy {
    private passport: passport.PassportStatic;

    public static initialize(passport: passport.PassportStatic) {
        let opts: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "123"
        };
        passport.use(new Strategy(opts, (jwt_payload, done) => {
            console.log(jwt_payload);
            done(null, "diego");
        }));
    }
}