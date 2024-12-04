const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Review=require('./review')

const defaultImg =
  "https://images.unsplash.com/photo-1679908731995-4ee6f1ceedbc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const listingSchema = new schema({
  title: { type: String, required: true },
  description: String,
  image: {
    filename: { type: String, default: "listingimage" },
    url: {
      type: String,
      set: (v) => {
        return v === "" ? defaultImg : v;
      },
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User
  }
});

listingSchema.post("findOneAndDelete", async (listing)=>{
  if (listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
  }
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
