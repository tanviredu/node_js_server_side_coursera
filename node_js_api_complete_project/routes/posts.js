const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

//router.get('/',(req,res)=>{
//    res.send("we are on post");
//});


// router.get('/specfic',(req,res)=>{
//     res.send("we are on specfic");
// });
router.post('/',(req,res)=>{
    //console.log(req.body); // to test if we have inforamation
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });
    // this is call promise running threded program one after another
    //using then
    post.save().then(data=>{
        res.json(data); // saving in the dataabse then send the API to whom is requesting
    }).catch(err=>{
        res.json({message:err})
    });
});

// we can do it a aysnc way too for now we are ignoring it
// we will use the get request in  a async way

// successfully get the response and store the databse

// now we will create a get request in a same route so we can fetch the data
// this will get all the post
router.get('/',async (req,res)=>{
    try{
        const posts = await Post.find(); // this will find all the post
        res.json(posts);
    }catch(err){
        res.json({message:err});
}
});


// this will get a specfic post
router.get('/:postID',async (req,res)=>{
    try{
    //console.log(req.params.postID);
    const post  = await Post.findById(req.params.postID);
    res.json(post);
    }catch(err){
        res.json({message:err});
    }
});

//delete a specfic post

router.delete('/:postID',async (req,res)=>{
    try{
    //console.log(req.params.postID);
    const removedpost = await Post.remove({_id:req.params.postID});
    res.json(removedpost);
    }catch(err){
        res.json({message:err});
    }
});

// this is gonna update it
router.patch('/:postID',async (req,res)=>{
    try{
    //console.log(req.params.postID);
    const updatedpost = await Post.updateOne({_id:req.params.postID},{$set:{"title":"updated title"}});
    res.json(updatedpost);
    }catch(err){
        res.json({message:err});
    }
});






module.exports = router;