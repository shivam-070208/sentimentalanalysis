import mongoose from "mongoose";


const feedbackSchema = new mongoose.Schema({
    TeacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    StudentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Ratings:{
        availability: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        knowledge: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        communication: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        Behaviour:{
            type: Number,
            required: true,
            min: 1,
            max: 5
        }
    },
    Feedback:{
        type:String,

    },
    Date: {
        type: Date,
        default: Date.now
    }


})


export default Feedbackmodel = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);