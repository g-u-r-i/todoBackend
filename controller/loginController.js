const signupSchema = require("../schema/signup");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const decrypt = require("../utility/utilityFunction");
const crypto = require("crypto");
const moment = require("moment");
const { sendMail } = require("../utility/sendEmail");

const login = async (req, res) => {
    const {email,password}=req.query
    console.log("ddddd",email,password)
    try {
        const data = await signupSchema.findOne({ email: email });
        console.log("ddd",data)
        if (data.length === 0) {
            res.status(200).json({ type: "error", message: "No User Found" });
        } else {
            const checkPassword= await decrypt.hashData(password)
            const datas= await decrypt.decrypt(checkPassword, data.password)
      console.log("checkPassword",checkPassword)
            if (datas) {

                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": data.email,
                            "password": data.password
                        }
                    },
                    process.env.DB_ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                )

                const refreshToken = jwt.sign(
                    { "email": data.email , "passsword":data.passsword },
                    process.env.DB_REFRESH_TOKEN_SECRET,
                    { expiresIn: '7d' }
                )

                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })


                res.status(200).json({ type: "success", accessToken: accessToken, message: "Login information inserted successfully." });
            } else {
                res.status(200).json({ type: "error", message: "Enter correct password" });

            }


        }
    } catch (err) {
        console.error("Error inserting login information:", err);

        res.status(500).json({ error: "Internal Server Error" });
    }
};



const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.DB_REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ email: req.body.email }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundUser.email,
                        "password" : foundUser.passsword
                        // "roles": foundUser.roles
                    }
                },
                process.env.DB_ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}


const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}




const signup = async (req, res) => {
    try {
        const data = await signupSchema.find({ email: req.body.email });
        if (data.length === 0) {
            await signupSchema.create({ name: req.body.name, email: req.body.email, password: req.body.password });

            res.status(200).json({ message: "Login information inserted successfully.", type: "success" });
        } else {
            res.status(200).json({ message: "User already exits", type: "error" });

        }

    } catch (err) {
        console.error("Error inserting login information:", err);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

const forgetPassword = async (req,res)=>{
    const {email} =req.query
    try{
        const data = await signupSchema.findOne({ email: email });
        if (!data) {
            return res.status(404).json({type:'error', message: "User not found" });
          }
          const resetToken = crypto.randomBytes(20).toString("hex");
          const resetTokenExpiry = moment().add(1, "hour").toISOString();
      
          data.resetToken = resetToken;
          data.resetTokenExpiry = resetTokenExpiry;
        //   await user.save();
      
          await sendMail(resetToken,data)
          res.status(202).json({type:"success", message: "Email sent successfully" })

    }catch (err) {
        console.error("Error inserting login information:", err);

        res.status(500).json({ type:'error', message: "Internal Server Error" });
    }
}

module.exports = { login, signup, refresh, logout, forgetPassword };




