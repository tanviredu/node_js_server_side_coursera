const mongoose = require('mongoose');
const Dishes = require('./models/dishes');


const url = 'mongodb://localhost:27017/newdata';
const connect = mongoose.connect(url);

// this was the previous
// connect.then(db=>{
//     console.log('Database connected successfully');
//     // create the record in a new way
//     Dishes.create({
//         name:"This is Pizza",
//         description:"This is the description"
//         // we just add the dish now it will give you
//         // a dish object
//     }).then((dish)=>{
//         console.log(dish);
//         return Dishes.find({}).exec();
//     }).then((dishes)=>{
//         console.log(dishes);
//         return Dishes.remove({});
//     }).then(()=>{
//         return mongoose.connection.close();
//     }).catch((err)=>{
//         console.log(err);
//     })
// })


// this is the new
connect.then((db)=>{
    console.log("Connected to the database");
    Dishes.create({
        name:"This is Pizza",
        description:"This is the description"
    }).then((dish)=>{
        console.log("dish");
        // selecting the post and update it
        return Dishes.findByIdAndUpdate(dish._id,{$set:{description:"This is the updated Descriptiomn"}},
        // this new true will return the updated post after altering it
        {new:true}).exec();
    }).then((dish)=>{
        console.log(dish);
        // now adding the comment
        // the comment in the database added as an array
        // then we have to push it
        dish.comments.push({
            rating:5,
            comment:"This is a comment",
            author:"I am the author"
        });
        return dish.save();
    }).then((dish)=>{
        console.log(dish);
        // delete the wholecolection
        return Dishes.remove({});
    }).then(()=>{
        return mongoose.connection.close();
    }).catch((err)=>{
        console.log(err);
    })
})