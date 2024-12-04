const Listing=require("../model/listing.js");
const Review=require("../model/review.js");

module.exports.postReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    console.log(listing);
    console.log(newReview);

    listing.reviews.push(newReview);
    console.log(listing);
    await newReview.save();
    await listing.save();

    res.redirect(`/listing/${listing.id}`);
  }

  module.exports.deleteReview=async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listing/${id}`);
  }