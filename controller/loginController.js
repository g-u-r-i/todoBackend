const loginSchema = require("../schema/login");

const loginId = async (req, res) => {
    try {
        await loginSchema.create({ email: req.body.email, password: req.body.password });
        
        res.status(200).json({ message: "Login information inserted successfully." });
    } catch (err) {
        console.error("Error inserting login information:", err);
        
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { loginId };
