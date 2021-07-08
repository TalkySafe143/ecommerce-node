const config = require('../../config');

const logErrors = (err, req, res, next) => {
    console.log(err.stack);
    next(err)
}

// Capturar errores desde clientes como Insomnia, Postman o AJAX
const clientErrors = (err, req, res, next) => {
    if(req.xhr) {
        res.status(500).json({ err: err.message })
    } else {
        next(err)
    }
};

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) { // Captura los errores en Streaming (No son capturados por Express)
        next(err);
    } 
    if (!config.dev) {
        delete err.stack
    }

    res.status(err.status || 500);
    res.render('error', { error: err });

}

module.exports = { logErrors, clientErrors, errorHandler }