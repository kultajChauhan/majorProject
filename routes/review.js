const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema, reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
let Listing = require("../model/listing.js");
const Review = require("../model/review.js");



const validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
  
    if (error) {
      return next(new ExpressError(400, error)) ;
    } else {
      next();
    }
  };


  //review
  //post route
  router.post(
    "/:id/reviews",
    validatereview,
    wrapAsync(async (req, res) => {
      let listing = await Listing.findById(req.params.id);
      let newReview = new Review(req.body.review);
      console.log(listing);
      console.log(newReview);
  
      listing.reviews.push(newReview);
      console.log(listing);
      await newReview.save();
      await listing.save();
  
      res.redirect(`/listing/${listing.id}`);
    })
  );
  
  //delete review route
  router.delete(
    "/:id/review/:reviewId",
    wrapAsync(async (req, res) => {
      let { id, reviewId } = req.params;
  
      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
  
      res.redirect(`/listing/${id}`);
    })
  );

  module.exports=router;