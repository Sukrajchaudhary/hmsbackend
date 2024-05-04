const mongoose=require('mongoose');
const {Schema}=mongoose;
const BlogsSchemas= new Schema({
    image:{
        type:String,
        default:''
    },
    title:{
        type:String,
        required:true
    },
    descriptions:{
        type:String,
        require:true
    }
},{timestamps:true});

exports.Blog=mongoose.model("Blog",BlogsSchemas);