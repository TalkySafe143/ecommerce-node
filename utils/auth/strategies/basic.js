const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const bcrypt = require('bcrypt');
const MongoLib = require('../../../lib/mongo');

passport.use(
    new BasicStrategy(async (username, password, cb) => {
        const mongoDB = new MongoLib();

        try {
            const [ user ] = await mongoDB.getAll('users', { username });

            if (!user) {
                return cb(new Error('No estas autorizado', false));
            }

            if (!await bcrypt.compare(password, user.password)) {
                return cb(new Error('No estas autorizado', false))
            }

            return cb(null, user);
        } catch(err) {
            cb(err, false);
        }
    })
)