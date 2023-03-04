const errorHandler = (err, req, res, next) => {
    console.log(err);
    switch (err.name) {
        case "EmailRequired":
            res.status(400).json({ message: "Email is required" })
            break;
        case "usernameRequired":
            res.status(400).json({ message: "Username is required" })
            break;
        case "PassRequired":
            res.status(400).json({ statusCode: 400, message: "Password is required" })
            break;
        case "UserNotFound":
            res.status(400).json({ statusCode: 400, message: "User not Found" })
            break;
        case "InvalidCredentials":
            res.status(401).json({ statusCode: 400, message: "Invalid email/password" })
            break;
        case "NoInput":
            res.status(400).json({ statusCode: 400, message: "Please fill all input fields" })
            break;
        case "TokenNotFound":
            res.status(401).json({ statusCode: 400, message: "Access token not found" })
            break;
        case "JsonWebTokenError":
            res.status(401).json({ statusCode: 400, message: "Invalid token" })
            break;
        case "LikeTwice":
            res.status(400).json({ statusCode: 400, message: "You have liked this post before" })
            break;
        case "NotFound":
            res.status(404).json({ statusCode: 400, message: "Content not found" })
            break;
        case "BigImage":
            res.status(400).json({ statusCode: 400, message: "Maximum file size is 300kb" })
            break;
        case "NotImage":
            res.status(400).json({ statusCode: 400, message: "Invalid file type" })
            break;
        case "Forbidden":
            res.status(403).json({ statusCode: 400, message: "Forbidden access"})
            break;
        case "EditInput":
            res.status(400).json({ statusCode: 400, message: "Please input required fields on edit form"})
            break;
        case "FriendTwice":
            res.status(400).json({ statusCode: 400, message: "You have a pending friend request involving this user"});
            break;
        case "AccFriendTwice":
            res.status(400).json({ statusCode: 400, message: "You are already friends with this user" });
            break;
        case "NoType":
            res.status(400).json({ statusCode: 400, message: "Please input the type of post" });
            break;
        default:
            res.status(500).json({ statusCode: 400, message: "Internal server error" })
            break;
    }
}

module.exports = errorHandler;
