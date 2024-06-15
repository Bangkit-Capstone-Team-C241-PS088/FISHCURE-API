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
    getArticleHandler
} = require("./handler");

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
        // menyimpan data scan ke database history
        method: 'POST',
        path: '/saveHistory',
        handler: saveHistoryHandler
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