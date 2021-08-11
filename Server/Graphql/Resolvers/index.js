const userResolver = require('./userResolver')
const postResolver = require('./postResolver')
module.exports ={
    post:{
    likeCount: parent => (parent.Likes.length) ,
    commentCount: parent =>(parent.comments.length)
    } ,

    Query:{
        ...postResolver.Query ,
        ...userResolver.Query
    } ,
    Mutation:{
        ...userResolver.Mutation ,
        ...postResolver.Mutation
    } ,
    Subscription:{
       ...postResolver.Subscription 
    }
}