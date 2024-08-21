const express=require('express');
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
//const dotenv=require(dotenv);

const app=express();
//dotenv.config();

//schema user:passnet/dbname
mongoose.connect("mongodb+srv://sfayazmr:Abcdef067@cluster01.ckihayr.mongodb.net/RegisterFormdata"
).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});
//model
login =mongoose.Schema(
    {   name:String,
        user:String,
        pass:String,
        email:String,
        phone:String
    })

const Registerd=mongoose.model("ModelLogin",login)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//pages
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/index.html")
});

//html form post
app.post("/register", async (req,res)=>{
    try{
        const {name,user,pass,email,phone}=req.body;
        //checking user
        const existuser=await Registerd.findOne({email:email});
        if(!existuser){
        //update data
        const registerdata=new Registerd({
            name,user,pass,email,phone
                })
        //save data
        await registerdata.save();
        res.redirect("/success")

        }else{
            alert("User Exist");
            res.redirect("/error");
        }


    }catch(error){
        console.log(error)
        res.redirect("error");
    }
    
});
app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/Success.html")
})

app.get("/error",(req,res)=>{
    res.sendFile(__dirname+"/error.html")
})


app.listen(5000,()=>{console.log("running")})

