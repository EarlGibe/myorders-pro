var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema=new Schema({
    username: String,
    password: String,
    role: String,
    isActive: Boolean
},
{
    collection:'users'
})

const User=mongoose.model('User',userSchema);

module.exports=User;
