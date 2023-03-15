const errorHandler = (err, req, res, next) => {
    switch (true) {
        case err.name == "SequelizeValidationError":
            res.status(400).json({ statusCode: 400, message: err.errors[0].message })
            break;
        case err.name == "EmailRequired":
            res.status(400).json({ statusCode: 400, message: "Email is required" })
            break;
        case err.name == "usernameRequired":
            res.status(400).json({ statusCode: 400, message: "Username perlu diisi" })
            break;
        case err.name == "PassRequired":
            res.status(400).json({ statusCode: 400, message: "Kata sandi perlu diisi" })
            break;
        case err.name == "UserNotFound":
            res.status(400).json({ statusCode: 400, message: "Data user tidak ditemukan" })
            break;
        case err.name == "InvalidCredentials":
            res.status(401).json({ statusCode: 400, message: "Username/password salah" })
            break;
        case err.name == "NoInput":
            res.status(400).json({ statusCode: 400, message: "Mohon isi data yang diperlukan" })
            break;
        case err.name == "TokenNotFound":
            res.status(401).json({ statusCode: 400, message: "Akses token tidak ditemukan" })
            break;
        case err.name == "JsonWebTokenError":
            res.status(401).json({ statusCode: 400, message: "Akses token salah" })
            break;
        case err.name == "NotFound":
            res.status(404).json({ statusCode: 400, message: "Data yang dicari tidak ditemukan" })
            break;
        case err.name == "Forbidden":
            res.status(403).json({ statusCode: 400, message: "Akses tidak diperbolehkan"})
            break;
        case err.name == "SequelizeUniqueConstraintError":
            res.status(403).json({ statusCode: 400, message: "Input data harus unik"})
            break;
        default:
            res.status(500).json({ statusCode: 400, message: "Internal server error" })
            break;
    }
}

module.exports = errorHandler;
