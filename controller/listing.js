const Listing = require('../model/listing.js')

module.exports.index = async (req, res) => {
    let Listings = await Listing.find({});
    res.render("listings/index.ejs", { Listings });
  }

  module.exports.newForm =(req, res) => {
    res.render("listings/new.ejs");
  }

  module.exports.delete=async (req, res) => {
    let { id } = req.params;
    const deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/allListings");
  }

  module.exports.show=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  }

  module.exports.create=async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/allListings");
  }

  module.exports.edit=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }

  module.exports.update=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file!=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    
    req.flash("success","Listing updated!");
    res.redirect(`/listing/${id}`);
  }