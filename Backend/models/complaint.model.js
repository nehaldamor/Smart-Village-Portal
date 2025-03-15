const mongoose=require("mongoose");

const complaintSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum:["Water","Road","Electricity","Health","Education","Other"]
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","In-Progress","Resolved"],
        default:"Pending"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const complaintModel=mongoose.model("complaints",complaintSchema);

module.exports=complaintModel;