const {
    registerUserHandler,
    loginUserHandler,
    otpSendHandler,
    otpAuthHandler,
    updatePasswordHandler,
    saveHistoryHandler,
    getHistoryHandler,
    getAllHistoryHandler,
    solutionHandler,
    getAllArticleHandler,
    getArticleHandler,
    uploadImage
} = require("./handler");
const Joi = require('joi');

const routes = [
    {
        // menyimpan data register user
        method: 'POST',
        path: '/register',
        handler: registerUserHandler
    },
    {
        // verifikasi login user
        method: 'POST',
        path: '/login',
        handler: loginUserHandler
    },
    {
        // mengirim kode OTP
        method: 'POST',
        path: '/sendOtp',
        handler: otpSendHandler
    },
    {
        // autentifikasi input otp
        method: 'POST',
        path: '/authOtp',
        handler: otpAuthHandler
    },
    {
        // ganti password
        method: 'POST',
        path: '/updatePassword',
        handler: updatePasswordHandler
    },
    {
        method: 'POST',
        path: '/saveHistory',
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                multipart: {
                    output: 'stream'
                },
                maxBytes: 5 * 1024 * 1024, // Maximum file size is 5MB
            },
            validate: {
                payload: Joi.object({
                    file: Joi.any().meta({ swaggerType: 'file' }).required()
                }).unknown()
            },
            handler: saveHistoryHandler,
        },
    },
    {
        // mengambil sebuah data scan dari database history
        method: 'POST',
        path: '/getHistory',
        handler: getHistoryHandler
    },
    {
        // mengambil semua data scan dari database history
        method: 'POST',
        path: '/getAllHistory',
        handler: getAllHistoryHandler
    },
    {
        // mengambil data solusi
        method: 'POST',
        path: '/solution',
        handler: solutionHandler
    },
    {
        // mengambil semua data artikel
        method: 'POST',
        path: '/getAllArticle',
        handler: getAllArticleHandler
    },
    {
        // mengambil sebuah data artikel
        method: 'POST',
        path: '/getArticle',
        handler: getArticleHandler
    }
];

module.exports = routes;