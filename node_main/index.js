// to learn this 
// first make sure that you know the arrow function 

// evaluate the area and the perimeter 
// of the example


// now we write two arrow function inside a json object
// consider this  si oop
// the redct is the class and under the class there callback function
// function name  will be the key and the arrow function will be value
var rect = {
    // two farrow function to calculate the 
    //peremeter and the area
    peremeter :(x,y)=>{return 2*(x+y)},
    area : (x,y)=>{return x*y}

};


function solveRect(l,b){
    // this function will use the object to solve 
    // Rectlangale
    console.log("length is "+l);
    console.log("breacth is "+b);

    if(l<=0 ||b<=0){
        console.log('in valid breatch and length')
    }else{
        console.log("The area of the Rectangle is "+rect.area(l,b))
        console.log("The peremeter of the Rectangle is "+rect.peremeter(l,b));
    }
}


solveRect(2,4);
solveRect(0,4);
solveRect(1,5);
solveRect(2,5);

// perfectly working 

//using json and arrow function we can write perfect 
//oop