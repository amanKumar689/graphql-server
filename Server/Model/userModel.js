const {Schema,model} = require('mongoose')

// ? Let's define  How will our structure be look


const userSchema = new Schema({
    username:String ,
    email :String ,
    password:String ,
    createdAt:String
})

// ?   our Model should be look

 const userModel = model('users',userSchema)
 module.exports = userModel