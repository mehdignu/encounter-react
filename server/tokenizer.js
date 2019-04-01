const fs   = require('fs');
const jwt   = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync('keys/private.key', 'utf8');
var publicKEY  = fs.readFileSync('keys/public.key', 'utf8');
module.exports = {
    sign: (payload) => {

        // Token signing options
        var signOptions = {
            expiresIn:  "30d",    // 30 days validity
            algorithm:  "RS256"
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },
    verify: (token, $Option) => {

        var verifyOptions = {
            expiresIn:  "30d",
            algorithm:  ["RS256"]
        };
        try{
            return jwt.verify(token, publicKEY, verifyOptions);
        }catch (err){
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token, {complete: true});
        //returns null if token is invalid
    }
};
