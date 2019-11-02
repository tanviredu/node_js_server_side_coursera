//all the callback function will
//be the some form of arrow function

const todos = [{
title:'buy bread',
isDone:'true'

},{
	title:'Go to Gym',
isDone:'false'

},{
	title:'Create youtube chanel',
isDone:'true'

}]

//console.log(todos)

// lets create a object that only meet our condition 
// which is true ot done and then return this data
const thingsdone = todos.filter((todo)=>{
	return todo.isDone==="true";
}) 
// this todo is like the item in forloop 
//its work like a function 
// but it is not exactly a function

console.log(thingsdone)

// its works just like a function with
// a foreach loop
// o for lop in python

//doing the same thing with one line

const done = todos.filter((todo)=>todo.isDone==='true')
console.log(done)