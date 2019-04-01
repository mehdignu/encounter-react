const fs = require('fs');
const publicKEY = fs.readFileSync(__dirname+'/keys/public.key', 'utf8');
const tokenizer = require(__dirname + '/tokenizer.js');

const checkToken = (req) => {
    //get the http header 'authorization'
    let authorization = req.get('authorization');
    if (!authorization) {
        throw new Error(401)
    }

    let token = authorization.replace('Bearer ', '');

    return tokenizer.verify(JSON.parse(token), publicKEY);
};

module.exports = function (req, res, next) {

    try {

        console.log(req.get('authorization'));

        //check the token and give back the verified user
        res.locals.vuser = checkToken(req);

    } catch (e) {
        //if any error coccurs, we do not authorize the request
        console.log("unouthorized", e)
        res
            .status(401)
            .end(JSON.stringify({error: "not_authorized"}));
    }


    next();
};
