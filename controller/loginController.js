const signupSchema = require("../schema/signup");

const loginId = async (req, res) => {
    console.log("req.query.email",req.query.email)
    try {
       const data= await signupSchema.find({ email: req.query.email});
       if(data.length === 0){
        res.status(200).json({ type:"error", message: "No User Found" });
    }else{
        if(data[0].password===req.query.password){

            res.status(200).json({ type:"success", message: "Login information inserted successfully." }); 
        }else{
            res.status(200).json({ type:"error", message: "Enter correct password" }); 

        }
      

       }
    } catch (err) {
        console.error("Error inserting login information:", err);
        
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const signup =async(req,res)=>{
    try {
        const data= await signupSchema.find({ email: req.body.email});
        if(data.length === 0){
            await signupSchema.create({ name:req.body.name ,email: req.body.email, password: req.body.password });
        
            res.status(200).json({ message: "Login information inserted successfully." ,type:"success" });
        }else{
            res.status(200).json({ message: "User already exits" , type:"error" });

        }
        
    } catch (err) {
        console.error("Error inserting login information:", err);
        
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { loginId,signup };



