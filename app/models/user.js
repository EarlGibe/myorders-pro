var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema=new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    isActive: { type: Boolean, default: false }
},
{
    collection:'users'
})

const User=mongoose.model('User',userSchema);

module.exports=User;
