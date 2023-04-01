// Handle error function..
 module.exports =function catchAsyncError(func){
    return (req,res,next) =>{
      func(req,res).catch((err)=>{
        //res.json(err) 
          next(err) 
          // app.js handle error  middleware
       }  )
     }
    } 