const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema, reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
let Listing = require("../model/listing");
const { isLoggedin } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer(storage);


const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    return next(new ExpressError(400, error));
  } else {
    next();
  }
};

router
  .route("/")
  //index route
  .get( wrapAsync(listingController.index))
  //create route
  // .post( validateListing, wrapAsync(listingController.create));
  .post(upload.single('listing[image]'),(req,res)=>{
res.send(req.file);
  })

//new add form
router.get("/new", isLoggedin, wrapAsync(listingController.newForm));

//delete route
router.delete("/:id/delete", wrapAsync(listingController.delete));

//show route
router.get("/:id", wrapAsync(listingController.show));

//edit route
router.get("/listing/:id/edit", wrapAsync(listingController.edit));

//update route
router.put(
  "/listing/:id",
  validateListing,
  wrapAsync(listingController.update)
);

module.exports = router;
