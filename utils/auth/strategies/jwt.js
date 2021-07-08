const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../../config');
const MongoLib = require('../../../lib/mongo');

passport.use(
    new Strategy({
        secretOrKey: config.authJwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (tokenPayload, cb) => {
        const mongoDB = new MongoLib();

        try {
            const [ user ] = await mongoDB.getAll('users', {
                username: tokenPayload.sub
            });

            if (!user) {
                return cb(new Error('No estas autorizado'))
            }

            return cb(null, user)
        } catch(err) {
            return cb(err);
        }
    })
)