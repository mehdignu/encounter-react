const cloudinary = require('cloudinary');
const axios = require('axios');


module.exports = function fileUploadMiddleware(req, res) {

    cloudinary.config({
        cloud_name: 'drtbzzsis',
        api_key: '839589289496339',
        api_secret: 'vn8Yl0z3k9_o74lm3avOEWBBc4s'
    });


    cloudinary.uploader.upload_stream((result) => {

        res.status(200).json(result);


        //     axios({
        //         url: '/api/upload', //API endpoint that needs file URL from CDN
        //         method: 'post',
        //         data: {
        //             url: result.secure_url,
        //             name: req.body.name,
        //             description: req.body.description,
        //         },
        //     }).then((response) => {
        //         res.status(200).json(response.data.data);
        //     }).catch((error) => {
        //         res.status(500).json(error.response.data);
        //     });
        }).end(req.file.buffer);

};
