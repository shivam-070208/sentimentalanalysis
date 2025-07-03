
import mongoose from "mongoose";


const Userschema = new mongoose.Schema({
Name:{
    type:String,
    required:true
},
Email:{
    type:String,
    required:true,
    unique:true
},
Section:{
    type:String,
    require:true,
},
Role:{
type:String,
enum:["Student","Faculty"],
default:"Student"
},
Password:{
    type:String,
    require:true
},
Recent:[],
Feedbackgiven: {
  type: [
    {
      date: Date,
      teacherName: String,
      TeacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      course: String,
    }
  ],
  default: []
},
Department:{
    type:String
}


});
const Usermodel = mongoose.models.User || mongoose.model('User', Userschema);


export  {Usermodel};
