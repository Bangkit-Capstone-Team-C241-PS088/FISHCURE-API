# FISHCURE-API

Combination of all Fishcure API before
- [Register](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#register)
- [Login](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#login)
- [Mengirim kode OTP ke email user](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#mengirim-kode-otp-ke-email-user)
- [Melakukan autentikasi kode OTP user](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#melakukan-autentikasi-kode-otp-user)
- [Ganti password user](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#ganti-password-user)
- [Solution](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#solution)
- [Save History](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#save-history)
- [Get History](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#get-history)
- [Get All History](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#get-all-history)
- [Get Article](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#get-article)
- [Get All Article](https://github.com/Bangkit-Capstone-Team-C241-PS088/FISHCURE-API?tab=readme-ov-file#get-all-article)

# Guide menggunakan API FISHCURE 🐟🐠🐡🦈:

Base url : wait for deployment

---

## Register

url

```
/register
```

request payload data :

```
{
    "email" : "[user email]",
    "password" : "[user password]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "User berhasil ditambahkan",
    "data": {
        "email": "[email user]"
    }
}
```

- ketika email sudah digunakan :

```
{
    "status": "failed",
    "message": "Email sudah digunakan"
}
```

---

## Login

url

```
/login
```

request payload data :

```
{
    "email" : "[user email]",
    "password" : "[user password]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "User berhasil login",
    "data": {
        "email": "[email user]"
    }
}
```

- ketika gagal :

```
{
    "status": "failed",
    "message": "Email atau Password yang dimasukkan salah"
}
```

---

## Mengirim kode OTP ke email user

url

```
/sendOtp
```

request payload data :

```
{
    "password" : "[user password]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Kode OTP berhasil dikirimkan",
    "data": {
        "otp": "[kode otp user]"
    }
}
```

- ketika email belum melakukan register :

```
{
    "status": "failed",
    "message": "Email yang anda masukkan belum melakukan register"
}
```

---

## Melakukan autentikasi kode OTP user

url

```
/authOtp
```

request payload data :

```
{
    "email" : "[user email]",
    "otp" : "[user otp code]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Kode OTP telah sesuai",
    "data": {
        "email": "[email user]"
    }
}
```

- ketika kode otp tidak sesuai :

```
{
    "status": "failed",
    "message": "Kode yang anda masukkan salah"
}
```

---

## Ganti password user

url

```
/updatePassword
```

request payload data :

```
{
    "email" : "[user email]",
    "newPassword" : "[user new password]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Password berhasil diperbarui",
    "data": {
        "email": "[email user]"
    }
}
```

## Ujicoba koneksi - method GET

url

```
/ping
```

### list response dari server :

- ketika berhasil :

```
{
    "Hello, I am alive"
}
```

---

## Pediksi Gambar Ikan

url

```
/predict
```

request payload data :

```
{
    "file" : [file gambar user]
}
```

### list response dari server :

- ketika berhasil :

```
{
    "class": "[jenis penyakit]",
    "confidence": [nilai akurasi]
}
```

---

## Solution

url

```
/solution
```

request payload data :

```
{
    "diseaseName" : "[nama penyakit]"
}
```

### nama-nama penyakit yang tersedia :

```
aeromonas
anchor_worms
costia
dropsy
fin_rot
gill_flukes
gill_mites
healthy
hemorrhagic_septicemia
mouth_rot
tail_rot
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Data solusi berhasil didapatkan",
    "data": {
        "name": "[nama penyakit]",
        "gejala": {
            "1": "[gejala 1]",
            "2": "[gejala 2]",
            "3": "[gejala 3]",
        },
        "langkah_penanganan": {
            "1": "[langkah penanganan 1]",
            "2": "[langkah penanganan 2]",
            "3": "[langkah penanganan 3]"
        },
        "obat": {
            "1": "[obat 1]",
            "2": "[obat 2]",
            "3": "[obat 3]"
        }
    }
}
```

notes -> jumlah gejala, langkah penanganan, dan obat menyesuaikan.

- ketika nama penyakit yang dicari tidak ditemukan :

```
{
    "status": "failed",
    "message": "Penyakit yang anda cari tidak ditemukan"
}
```

---

## Save History

url

```
/saveHistory
```

request payload data :

```
{
    "email" : "[user email]",
    "desease_name" : "[nama penyakit]"
    "akurasi" : "[akurasi scan]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Data berhasil ditambahkan",
    "data": {
            "email": "[user email]",
            "date_time": "[date time scan diambil]",
            "desease_name": "[nama penyakit]",
            "akurasi": "[akurasi scan]"
    }
}
```

---

## GET History

url

```
/getHistory
```

request payload data :

```
{
    "email" : "[email user]",
    "dateTime" : "[waktu scan dengan format YY-MM-DD Hour-Minuite-Second]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Data history didapatkan",
    "data": {
        "email": "[user email]",
        "date_time": "[date time scan diambil]",
        "desease_name": "[nama penyakit]",
        "akurasi": "[akurasi scan]"
    }
}
```

- ketika data history tidak ditemukan :

```
{
    "status": "failed",
    "message": "Data history tidak ditemukan"
}
```

---

## GET ALL History

url

```
/getAllHistory
```

request payload data :

```
{
    "email" : "[email user]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Data history didapatkan",
    "data": {
            "0": {
                "email": "[user email]",
                "date_time": "[date time scan diambil]",
                "desease_name": "[nama penyakit]",
                "akurasi": "[akurasi scan]"
            },
            "1": {
                "email": "[user email]",
                "date_time": "[date time scan diambil]",
                "desease_name": "[nama penyakit]",
                "akurasi": "[akurasi scan]"
            },
            "2": {
                "email": "[user email]",
                "date_time": "[date time scan diambil]",
                "desease_name": "[nama penyakit]",
                "akurasi": "[akurasi scan]"
            }
    }
}
```

- ketika data history tidak ditemukan :

```
{
    "status": "failed",
    "message": "Data history tidak ditemukan"
}
```

---

## GET Article

url

```
/getArticle
```

request payload data :

```
{
    "email" : "[email user]",
    "idArticle" : "[id artikel yang akan dibuka]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Data artikel didapatkan",
    "data": {
        "id_article": [id artikel],
        "writer": "[penulis artikel]",
        "date_time": "[waktu artikel dipublish]",
        "image": "[link gambar artikel]",
        "title": "[judul artikel]",
        "article": {
            "1": "[isi artikel 1]",
            "2": "[isi artikel 2]"
            "3": "[isi artikel 3]"
        }
    }
}
```

- ketika user belum mendaftar ingin mencoba :

```
{
    "status": 'failed',
    "message": 'Anda belum mendaftarkan diri'
}
```

- ketika data artikel tidak ditemukan :

```
{
    "status": "failed",
    "message": "Artikel tidak ditemukan"
}
```

---

## GET All Article

url

```
/getArticle
```

request payload data :

```
{
    "email" : "[email user]"
}
```

### list response dari server :

- ketika berhasil :

```
{
    "status": "success",
    "message": "Data artikel didapatkan",
    "data": {
        "0": {
            "id_article": [id artikel],
            "writer": "[penulis artikel]",
            "date_time": "[waktu artikel dipublish]",
            "image": "[link gambar artikel]",
            "title": "[judul artikel]",
            "article": {
                "1": "[isi artikel 1]",
                "2": "[isi artikel 2]"
                "3": "[isi artikel 3]"
            }
        }
        "1": {
            "id_article": [id artikel],
            "writer": "[penulis artikel]",
            "date_time": "[waktu artikel dipublish]",
            "image": "[link gambar artikel]",
            "title": "[judul artikel]",
            "article": {
                "1": "[isi artikel 1]",
                "2": "[isi artikel 2]"
                "3": "[isi artikel 3]"
            }
        }
    }
}
```

- ketika user belum mendaftar ingin mencoba :

```
{
    "status": 'failed',
    "message": 'Anda belum mendaftarkan diri'
}
```

- ketika data artikel tidak ditemukan :

```
{
    "status": "failed",
    "message": "Artikel tidak ditemukan"
}
```

---
