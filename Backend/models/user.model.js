const mongoose=require("mongoose");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { use } = require("../app");
const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"firstname must 3 ch long"]
        },
        lastname:{
            type:String,
            minlength:[3,"firstname must 3 ch long"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"email must 5 ch long"],
        lowercase:true
    },
    village:{
        type:String,
        required:true,
        minlength:[3,"village must 3 ch long"]
    },
    phone:{
        type:String,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
        required:true
    },
    password:{
        type:String,
        minlength:[6,"password must 6 ch long"],
        required:true,
        select:false
    },
    resetOTP:{
        type:String,
    },
    resetOTPExpiry:{
        type:Date,
    },
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword=async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword=async function (password) {
    return await bcrypt.hash(password,10);
}

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;