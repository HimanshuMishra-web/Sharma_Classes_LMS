const authRouter = require("../../routes/authRouter");
const {body, validationResult} = require("express-validator");
const {User, UserToken, Role} = require("../../models");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_KEY;
const {comparePassword, error, success} = require("../helpers");
const handler = async (req, res) => {
    const {mobile, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({errors: errors.array()});
    }
    try {
        const user = await User.findOne({
            where: {mobile},
            include:[
                {
                    model:Role,
                    foreignKey:"role"
                }
            ]
        });
        if (!user) res.status(204).json({message: "User Not Found"});
        const isMatched = await comparePassword(password, user.password);
        if (isMatched) {
            const token =await jwt.sign({user}, "secret");
            await UserToken.create({
                userId: user?.id,
                token
            });
            res.status(200).json(success("Logged In Successfully", "success",{token,user}));
        } else {
            res.status(401).json(error("Invalid Credentials","error"));
        }
    } catch (error) {
        res.status(500).json(error("Something Went Wrong","error"));
    }
}

authRouter.post("/login", ([
    body("mobile").notEmpty().withMessage("Mobile Is Required"),
    body("password").notEmpty().withMessage("Password Is Required")
]), handler);