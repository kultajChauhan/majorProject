let express = require("express");
let app = express();
let mongoose = require("mongoose");
let Listing=require("./model/listing")
let path=require("path")

let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("database connected!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.get("/", (req, res) => {
  res.send("Hi, i am root!!");
});

app.get("/allListings",async (req,res)=>{
  let Listings=await Listing.find({});
  res.render("../views/listings/index.ejs",{Listings})
})

app.get("/testListing",async (req,res)=>{
    let sampleListing= new Listing({
        title:"My New Villa",
        description:"By the Beach",
        price:1200,
        location:"Calangute Goa",
        country:"India",
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
});

app.listen(8080, () => {
  console.log("server is listening at 8080");
});
