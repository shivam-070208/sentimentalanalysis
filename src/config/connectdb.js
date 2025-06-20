import mongoose from "mongoose";


export const connectDb = async (handler)=>{
    console.log('req come')
    try{
        if(mongoose.connection&&!mongoose.connection.readyState){
         
            await mongoose.connect(process.env.MONGO_URI);
        }
        return handler;
    }catch(err){
        console.log('err',err)
    }

}