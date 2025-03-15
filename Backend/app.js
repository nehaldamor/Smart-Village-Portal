const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const connectToDb=require("./db/db");
const userRoutes=require("./routes/user.routes");
const adminRoutes=require("./routes/admin.routes");
const complaintRoutes=require("./routes/complaint.routes");
const noticeRoutes=require("./routes/notice.routes")
const schemeRoutes=require("./routes/scheme.routes")
const app=express();
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hellow world");
});

app.use("/users",userRoutes);
app.use("/admins",adminRoutes);
app.use("/complaints",complaintRoutes);
app.use("/notices",noticeRoutes);
app.use("/schemes",schemeRoutes)
module.exports=app;