import mongoose from "mongoose";


const suggestionSchema = new mongoose.Schema({
    Student:{
       type:String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Date:{
        type:Date,
        default:Date.now()
    }
    })


   const Suggestionmodel =  mongoose.models.Suggestion ||mongoose.model('Suggestion', suggestionSchema);
   export default Suggestionmodel;