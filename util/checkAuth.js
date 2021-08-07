const {AuthenticationError} =require('apollo-server')
const { secretKey } = require('../config/secretKey')
const jwt = require('jsonwebtoken')
const userModel = require('../Model/userModel')
const uerModel =require('../Model/userModel') 
const postModel = require('../Model/postModel')

module.exports = async ({req}) =>{

    if(!req.headers.authorization)
    {
        throw new Error('Authorization header must be present')
    }
     // Get out token from req Header 
      let token  =req.headers.authorization
      token = token.split('Bearer ')[1]
 
      // Generate ID using token 
      try {

          const _id =  jwt.verify(token,secretKey).id
        
          if(!_id)
          {
              throw new Error("invalid Token format")
            }
            
            // Let's find out user 
            const user = await userModel.findOne({
                _id
            })
            if(!user) 
            {
                throw new Error("User not present with this token")
            } 
            else
            {
                return user
            }
        } 
        catch(err) {
             throw new AuthenticationError('Token is badly formatted',{errors:'token is badly formated'})
        }
          
      
            
        }