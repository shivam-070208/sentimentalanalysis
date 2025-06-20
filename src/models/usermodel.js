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
enum:["Student","Teacher"],
default:"Student"
},
Password:{
    type:String,
    require:true
}

});
const Usermodel = mongoose.models.Usereddrf || mongoose.model('Usereddrf', Userschema);


export  {Usermodel};
