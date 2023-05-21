var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema=new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    isFirstAccess: { type: Boolean, default: true },
    loggedIn: { type: Boolean, default: false },
    dataInserimento: { type: Date, default: Date.now }
},
{
    collection:'users'
})

const User=mongoose.model('User',userSchema);

module.exports=User;
