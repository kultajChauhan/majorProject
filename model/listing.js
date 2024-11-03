const mongoose = require("mongoose");
const schema = mongoose.Schema;

const defaultImg =
  "https://unsplash.com/photos/a-table-topped-with-lots-of-bowls-and-bowls-qSSKY76beCg";

const listingSchema = new schema({
  title: { type: String, required: true },
  description: String,
  image: {
    type: Object,
    filename:String,
    url:{
      type:String,
      default: defaultImg,
      set: (v) => {
      return v === "" ? defaultImg : v;
    },
    },
    
    
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
