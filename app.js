const express = require('express');
const {math} = require('./math');
const ExpressError = require('./expressError');

const app = express()

app.use(express.json())

app.get('/:operation', (req, res, next)=>{
    try{
    const nums = req.query.nums;
    
    const operation = req.params.operation;
    if(operation!== 'all' && operation !== 'mode' && operation !== 'mean' && operation !== 'median'){
         throw new ExpressError("Invalid operation given", 400);
    }
    if(!nums) throw new ExpressError("nums are required", 400);  

    const value = math(operation, nums)
    const response = {response:{
        operation,
        value
    }}
    return res.json(response)
}catch(err){
    return next(err);
}
}
)

app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;
  
    return res.status(status).json({
      error: {message}
    });
  });

app.listen(7000, ()=>{
    console.log('Port at 7000')
})