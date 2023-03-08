const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "EmailRequired":
            res.status(400).json({ message: "Email is required" })
            break;
        case "usernameRequired":
            res.status(400).json({ message: "Username perlu diisi" })
            break;
        case "PassRequired":
            res.status(400).json({ statusCode: 400, message: "Kata sandi perlu diisi" })
            break;
        case "UserNotFound":
            res.status(400).json({ statusCode: 400, message: "Data user tidak ditemukan" })
            break;
        case "InvalidCredentials":
            res.status(401).json({ statusCode: 400, message: "Username/password salah" })
            break;
        case "NoInput":
            res.status(400).json({ statusCode: 400, message: "Mohon isi data yang diperlukan" })
            break;
        case "TokenNotFound":
            res.status(401).json({ statusCode: 400, message: "Akses token tidak ditemukan" })
            break;
        case "JsonWebTokenError":
            res.status(401).json({ statusCode: 400, message: "Akses token salah" })
            break;
        case "NotFound":
            res.status(404).json({ statusCode: 400, message: "Data yang dicari tidak ditemukan" })
            break;
        case "Forbidden":
            res.status(403).json({ statusCode: 400, message: "Akses tidak diperbolehkan"})
            break;
        default:
            res.status(500).json({ statusCode: 400, message: "Internal server error" })
            break;
    }
}

module.exports = errorHandler;
