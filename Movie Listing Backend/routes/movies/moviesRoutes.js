const express = require("express");
const router =express.Router();
const Movie=require("../../db/schemas/movieSchema");
const { parse } = require("dotenv");
router.get("/", async(req,res) => {
    const queryParams=req.query;
    const filters ={};
    if(queryParams){
    filtersname={
        $regex:`^${queryParams.name1}`,
        $options:"i",
    };
    }
    if(queryParams.rating){
        filters.rating={
            $gte:parseFloat(queryParams.rating),
        };
    }
    const movies=await Movie.find(filters);
    res.json(movies);
});
router.post("/",async(req,res) =>{
    try {
    console.log(req.body);
    const moviesData=req.body;
    const newMovie = new Movie(moviesData);
    await newMovie.save();
    res.json({
        message:"movie added successfully",

    });
    }catch(error){
    console.log(error);
    res.status(500).json({
        message:"Internal server error",
    });
    }
});
router.put("/:id",async(req,res) =>{
    try{
const movieId=req.params.id;
const updatedMovieData=req.body;
await Movie.findByIdAndUpdate(movieId,updatedMovieData);
res.json({
    message:"Movie updated successfully",
});
} catch(error){
    console.log(error);
     res.status(500).json({
        message:"Internal server error",
});
    }
});
router.delete("/:id",async(req,res) =>{
    try{
const movieId=req.params.id;
const updatedMovieData=req.body;
await Movie.findByIdAndDelete(movieId,updatedMovieData);
res.json({
    message:"Movie delete successfully",
});
} catch(error){
    console.log(error);
     res.status(500).json({
        message:"Internal server error",
});
    }
});
router.get("/:id", async (req, res) => {
    try{
     const movield = req.params.id;
     console.log("Handling the get by id request");
     const movie = await Movie.findById(movieId);
     res.json(movie);
    }catch (error) {  
     if (error.kind ==="ObjectId") {
     res.status(404).json({message: "Movie not found" });  
     } else {
     
     res.status(500).json({ message: "Internal server error"});
     }
 }
 
 });
module.exports = router;