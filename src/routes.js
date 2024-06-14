const {
    registerUserHandler,
    loginUserHandler,
    otpSendHandler,
    otpAuthHandler,
    updatePasswordHandler,
    saveHistoryHandler,
    getHistoryhandler,
    getAllHistoryhandler,
    solutionHandler
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
        handler: getHistoryhandler
    },
    {
        // mengambil semua data scan dari database history
        method: 'POST',
        path: '/getAllHistory',
        handler: getAllHistoryhandler
    },
    {
        // mengambil data solusi
        method: 'POST',
        path: '/solution',
        handler: solutionHandler
    }
];

module.exports = routes;