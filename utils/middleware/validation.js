const validate = (data, schema) => {
    const { error } = schema.validate(data);
    return error;
};

const validationHandler = (schema, check = 'body') => {
    return (req, res, next) => {
        console.log(req[check])
        const err = validate(req[check], schema);
        err ? next(new Error(err)) : next();
    }
}

module.exports = validationHandler;