const userResolver = require('./userResolver')
const postResolver = require('./postResolver')
module.exports ={
    Query:{
        ...postResolver.Query ,
        ...userResolver.Query
    } ,
    Mutation:{
        ...userResolver.Mutation ,
        ...postResolver.Mutation
    }
}