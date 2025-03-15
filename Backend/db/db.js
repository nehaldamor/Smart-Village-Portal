const mongoose=require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGODB_URL

    ).then(()=>{
        console.log(`mongo connected on ${process.env.MONGODB_URL}`);
    }).catch(err=>console.log(err));
}

module.exports=connectToDb;