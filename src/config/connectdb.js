import mongoose from "mongoose";


export const connectDb = async ()=>{
    console.log('req come')
    try{
        if(mongoose.connection&&!mongoose.connection.readyState){
         
            await mongoose.connect(process.env.MONGO_URI);
            console.log(mongoose.connection.host)
        }
       
    }catch(err){
        console.log('err',err)
    }

}