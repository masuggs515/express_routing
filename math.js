const {mode, mean, median} = require('mathjs');
const ExpressError = require('./expressError');

function math(operation, nums){
    let value;
    let numArr = nums.split(',');
    let array = [];
    
    for(let i=0; i<numArr.length;i++){
        let num = +numArr[i];
        console.log(num)
        if(Number.isNaN(num)){
            throw new ExpressError(`${numArr[i]} is not a number.`, 400)
        }
        array.push(num);
    }
    if(operation === 'mean'){
        value = Number(mean(array))
    } else if(operation === 'mode'){
        value = Number(mode(array).join(''))
    } else if(operation === 'median'){
        array = array.sort();
        value = Number(median(array))
    } else if(operation === 'all'){
        array = array.sort();
        value = {
            mean: Number(mean(array)),
            mode: Number(mode(array).join('')),
            median: Number(median(array))
        }
    };
    return value;

}




module.exports = { math }