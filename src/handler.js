require('dotenv').config();

const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const nodemailer = require("nodemailer");
const moment = require('moment-timezone');
const { insertQuery, selectAQuery } = require("./db_query");

// menuliskan data yang dikirim aplikasi ke database
const registerUserHandler = async (request, h) => {
    try {
        const { email, password } = request.payload;

        // cek jika email sudah digunakan
        const sqlSelect = `SELECT * FROM login_info WHERE email = '${email}'`;
        const result = await selectAQuery(sqlSelect);

        if (result.length >= 1) {
            const response = h.response({
                status: 'failed',
                message: 'Email sudah digunakan',
            });

            response.code(401);
            return response;
        }

        // menyimpan user data ke database
        const hashPassword = await bcrypt.hash(password, 13);
        const data = {
            email: email,
            password: hashPassword
        };

        const sqlInsert = 'INSERT INTO login_info SET ?';
        await insertQuery(sqlInsert, data);

        const response = h.response({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: { email: email }
        });

        response.code(201);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// memastikan username & password sesuai dengan database
const loginUserHandler = async (request, h) => {
    try {
        const { email, password } = request.payload;

        // mengambil data dari database
        const sql = `SELECT * FROM login_info WHERE email = '${email}'`;
        const result = await selectAQuery(sql);

        if (result < 1) {
            const response = h.response({
                status: 'failed',
                message: 'Email atau Password yang dimasukkan salah'
            });

            response.code(401);
            return response;
        }

        // cek autentikasi password
        const user = result[0];
        const authenticated = await bcrypt.compare(password, user.password);

        if (authenticated) {
            const response = h.response({
                status: 'success',
                message: 'User berhasil login',
                data: { email: user.email }
            });

            response.code(201);
            return response;
        }

        const response = h.response({
            status: 'failed',
            message: 'Email atau Password yang dimasukkan salah'
        });

        response.code(401);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// mengirimkan kode otp ke email ketika lupa password
const otpSendHandler = async (request, h) => {
    try {
        const { email } = request.payload;

        // validate email
        const sql = `SELECT * FROM login_info WHERE email = '${email}'`;
        const result = await selectAQuery(sql);

        if (result < 1) {
            const response = h.response({
                status: 'failed',
                message: 'Email yang anda masukkan belum melakukan register'
            });

            response.code(401);
            return response;
        }

        //generate otp
        const otp = nanoid(6);

        // send email
        let config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        }

        let transporter = nodemailer.createTransport(config);

        transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "FISHCURE - Reset Password Request",
            text: `Kode OTP anda : ${otp}`,
            html: `<b>Kode OTP anda : ${otp} </b>`
        }).catch(err => {
            console.log("Error:", err);
            return h.response({ message: "Server error" }).code(500);
        });

        // save to database
        const data = {
            otp: otp
        };

        const sqlInsert = `UPDATE login_info SET ? WHERE email = '${email}'`;
        await insertQuery(sqlInsert, data);

        // return success
        const response = h.response({
            status: 'success',
            message: 'Kode OTP berhasil dikirimkan',
            data: { otp: otp }
        });

        response.code(201);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// mengkonfirmasi kode otp yang dimasukka pengguna
const otpAuthHandler = async (request, h) => {
    try {
        const { email, otp } = request.payload;

        const sql = `SELECT * FROM login_info WHERE email = '${email}' && otp = '${otp}'`;
        const result = await selectAQuery(sql);

        if (result[0] !== undefined) {
            const data = {
                otp: ''
            };
            const sqlInsert = `UPDATE login_info SET ? WHERE email = '${email}'`;
            await insertQuery(sqlInsert, data);

            const response = h.response({
                status: 'success',
                message: 'Kode OTP telah sesuai',
                data: { email: email }
            });

            response.code(201);
            return response;
        }

        const response = h.response({
            status: 'failed',
            message: 'Kode yang anda masukkan salah'
        });

        response.code(401);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// update password pengguna
const updatePasswordHandler = async (request, h) => {
    try {
        const { email, newPassword } = request.payload;
        const hashPassword = await bcrypt.hash(newPassword, 13);

        // update database
        const data = {
            password: hashPassword
        };
        const sqlInsert = `UPDATE login_info SET ? WHERE email = '${email}'`;
        await insertQuery(sqlInsert, data);

        const response = h.response({
            status: 'success',
            message: 'Password berhasil diperbarui',
            data: { email: email }
        });

        response.code(201);
        return response;
    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// ===

const saveHistoryHandler = async (request, h) => {
    try {
        const { email, disease_name, akurasi } = request.payload;

        // konversi date js ke format SQL
        const date = new Date();
        const jakartaMoment = moment.tz(date, "Asia/Jakarta");
        const dateTimeSql = jakartaMoment.format('YYYY-MM-DD HH:mm:ss');
        // const dateTimeSql = date.toISOString().slice(0, 19).replace('T', ' ');

        // deklarasi data
        const data = {
            email: email,
            date_time: dateTimeSql,
            disease_name: disease_name,
            akurasi: akurasi
        }

        // simpan data ke database
        const sqlInsert = 'INSERT INTO history_scan SET ?';
        await insertQuery(sqlInsert, data);

        const response = h.response({
            status: 'success',
            message: 'Data berhasil ditambahkan',
            data: data
        });

        response.code(201);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

const getHistoryHandler = async (request, h) => {
    try {
        const { email, dateTime } = request.payload
        // example format for dateTime = 2024-05-29T11:12:15Z
        // const dateTimeSql = new Date(dateTime).toISOString().slice(0, 19).replace('T', ' ');

        const sql = `SELECT * FROM history_scan WHERE email = '${email}' && date_time = STR_TO_DATE('${dateTime}', '%Y-%m-%d %H:%i:%s')`;
        const result = await selectAQuery(sql);

        if (result[0] !== undefined) {
            const data = result[0];

            // data.date_time = new Date(data.date_time).toISOString().slice(0, 19).replace('T', ' ');
            data.date_time = data.date_time.toISOString().slice(0, 19).replace('T', ' ');

            const response = h.response({
                status: 'success',
                message: 'Data history didapatkan',
                data: data
            });

            response.code(201);
            return response;
        }

        const response = h.response({
            status: 'failed',
            message: 'Data history tidak ditemukan'
        });

        response.code(401);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

const getAllHistoryHandler = async (request, h) => {
    try {
        const { email } = request.payload

        const sql = `SELECT * FROM history_scan WHERE email = '${email}'`;
        const result = await selectAQuery(sql);

        if (result[0] !== undefined) {
            const data = result.map(element => element);

            data.forEach(element => {
                element.date_time = element.date_time.toISOString().slice(0, 19).replace('T', ' ');;
            });

            const response = h.response({
                status: 'success',
                message: 'Data history didapatkan',
                data: Object.assign({}, data)
            });

            response.code(201);
            return response;
        }

        const response = h.response({
            status: 'failed',
            message: 'Data history tidak ditemukan'
        });

        response.code(401);
        return response;
    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// ===

const solutionHandler = async (request, h) => {
    try {
        const { diseaseName } = request.payload;

        const sql = `SELECT * FROM disease_info WHERE name = '${diseaseName}'`;
        const result = await selectAQuery(sql);

        if (result[0] !== undefined) {
            let disease = result[0];

            // Normalize specific properties
            function normalize(property) {
                let rowData = disease[property];
                rowData = rowData.slice(1, -1);
                rowData = rowData.split("],[");
                rowData = rowData.map(item => item.trim());

                let objectConverted = {};
                rowData.forEach((item, index) => {
                    objectConverted[index + 1] = item;
                });

                disease[property] = objectConverted;
            }

            normalize('gejala');
            normalize('langkah_penanganan');
            normalize('obat');

            const response = h.response({
                status: 'success',
                message: 'Data solusi berhasil didapatkan',
                data: disease
            });

            response.code(201);
            return response;
        };

        const response = h.response({
            status: 'failed',
            message: 'Penyakit yang anda cari tidak ditemukan'
        });

        response.code(401);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// ===

const getAllArticleHandler = async (request, h) => {
    try {
        const { email } = request.payload

        const sql = `SELECT * FROM login_info WHERE email = '${email}'`;
        const result = await selectAQuery(sql);

        if (result[0] !== undefined) {
            const sql = `SELECT * FROM article`;
            const result = await selectAQuery(sql);

            if (result[0] !== undefined) {
                const data = result.map(element => element);

                data.forEach(element => {
                    element.date_time = element.date_time.toISOString().slice(0, 19).replace('T', ' ');

                    // Normalize specific properties
                    function normalize(property) {
                        let rowData = element[property];
                        rowData = rowData.slice(1, -1);
                        rowData = rowData.split("],[");
                        rowData = rowData.map(item => item.trim());

                        let objectConverted = {};
                        rowData.forEach((item, index) => {
                            objectConverted[index + 1] = item;
                        });

                        element[property] = objectConverted;
                    }

                    normalize('article');
                });

                const response = h.response({
                    status: 'success',
                    message: 'Data artikel didapatkan',
                    data: Object.assign({}, data)
                });

                response.code(201);
                return response;

            }

            const response = h.response({
                status: 'failed',
                message: 'Artikel tidak ditemukan'
            });

            response.code(401);
            return response;
        }

        const response = h.response({
            status: 'failed',
            message: 'Anda belum mendaftarkan diri'
        });

        response.code(401);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

const getArticleHandler = async (request, h) => {
    try {
        const { email, idArticle } = request.payload

        const sql = `SELECT * FROM login_info WHERE email = '${email}'`;
        const result = await selectAQuery(sql);

        if (result[0] !== undefined) {
            const sql = `SELECT * FROM article WHERE id_article = ${idArticle}`;
            const result = await selectAQuery(sql);

            if (result[0] !== undefined) {
                let data = result[0];

                data.date_time = data.date_time.toISOString().slice(0, 19).replace('T', ' ');

                // Normalize specific properties
                function normalize(property) {
                    let rowData = data[property];
                    rowData = rowData.slice(1, -1);
                    rowData = rowData.split("],[");
                    rowData = rowData.map(item => item.trim());

                    let objectConverted = {};
                    rowData.forEach((item, index) => {
                        objectConverted[index + 1] = item;
                    });

                    data[property] = objectConverted;
                }

                normalize('article');

                const response = h.response({
                    status: 'success',
                    message: 'Data artikel didapatkan',
                    data: data
                });

                response.code(201);
                return response;

            }

            const response = h.response({
                status: 'failed',
                message: 'Artikel tidak ditemukan'
            });

            response.code(401);
            return response;
        }

        const response = h.response({
            status: 'failed',
            message: 'Anda belum mendaftarkan diri'
        });

        response.code(401);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

module.exports = {
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
};