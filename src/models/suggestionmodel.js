import mongoose from "mongoose";


const suggestionSchema = new mongoose.Schema({
    StudentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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


    export default Suggestionmodel = mongoose.models.Suggestion || mongoose.model('Suggestion', suggestionSchema);