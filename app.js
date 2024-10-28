let express = require("express");
let app = express();
let mongoose = require("mongoose");
let Listing=require("./model/listing")
let path=require("path");
const methodOverride=require("method-override");

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
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.get("/", (req, res) => {
  res.send("Hi, i am root!!");
});

//index route
app.get("/allListings",async (req,res)=>{
  let Listings=await Listing.find({});
  res.render("listings/index.ejs",{Listings})
})

//new add form
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs")
})

//delete route
app.delete("/listings/:id/delete",async (req,res)=>{
  let {id}=req.params;
  const deletelisting=await Listing.findByIdAndDelete(id);
console.log(deletelisting);
res.redirect("/allListings");
})

//show route
app.get("/listing/:id",async (req,res)=>{
let {id}=req.params;
const listing=await Listing.findById(id);
res.render("listings/show.ejs",{listing})
});


//create route
app.post("/listings",async (req,res)=>{
 const newListing=new Listing(req.body.listing);
 await newListing.save();
 res.redirect("/allListings")
})

//edit route
app.get("/listing/:id/edit",async (req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/edit.ejs",{listing})})

  //update route
  app.put("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect(`/listing/${id}`);
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
