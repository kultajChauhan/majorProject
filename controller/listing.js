const Listing = require('../model/listing.js')

module.exports.index = async (req, res) => {
    let Listings = await Listing.find({});
    res.render("listings/index.ejs", { Listings });
  }