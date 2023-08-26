const createRouter = require("../../routes/createRouter");
const {body, validationResult} = require("express-validator");
const {User} = require("../../models/user");
const handler = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }
    const {name, roleId, mobile, email, password, address} = req.body;

    try {
        const user = await User.create({
            name,
            roleId,
            mobile,
            email,
            password,
            address
        })
        res.status(201).json({message: "Registered Successfully", data: user});
    } catch (error) {
        res.json({message: error.message})
    }

}

createRouter.post("/user",  ([
    body("name").notEmpty().withMessage("Name Is Required"),
    body("roleId").notEmpty().withMessage("User's Role Is Required"),
    body("mobile").notEmpty().withMessage("Mobile Is Required"),
    body("password").notEmpty().withMessage("Password Is Required"),
]), (handler));