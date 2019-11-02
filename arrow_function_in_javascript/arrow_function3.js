// arow function is basically an anonymous function

//syntax:
//    (parameter) =>{statement}


// make a normal function

var myfunction = function(name){
    return "hello world "+name;
}
console.log(myfunction("tanvir rahman"))


// make the same function with arow function

var again = (name)=>{
    return "hello world "+name
}

console.log("tanvir rahman")

// arrow function with multiple parameter

var adding = (a,b)=>{
    return a+b;
}
console.log(adding(2,3));