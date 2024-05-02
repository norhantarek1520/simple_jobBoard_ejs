const token = async(req , res , next )=>{
    const token =  req.cookies.token ; 
    if(token){
        return true
    }
    else{
        return false
    }
}

module.exports = {token};
