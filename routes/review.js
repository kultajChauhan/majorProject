const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema, reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
let Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const reviewController=require("../controller/review.js");



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
    wrapAsync(reviewController.postReview)
  );
  
  //delete review route
  router.delete(
    "/:id/review/:reviewId",
    wrapAsync(reviewController.deleteReview)
  );

  module.exports=router;