const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../../config')

// basic strategy
require('../../utils/auth/strategies/basic');

router.post('/token', async (req, res, next) => {
    passport.authenticate('basic', (err, user) => {
        try {
            if (err || !user) {
                next(new Error('No tienes permisos'))
            }

            req.login(user, { session: false }, async error => {
                if (error) next(error);

                const payload = { sub: user.username, email: user.email };
                const token = jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' });

                return res.status(200).json({ access_token: token })
            })
        } catch(error) {
            next(error);
        }
    })(req, res, next);
});

module.exports = router;