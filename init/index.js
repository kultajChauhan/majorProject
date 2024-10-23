const mongoose=require("mongoose");
const initData=require('./data');
const Listing=require('../model/listing')

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

  const initDB= async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was inserted!!!")
  };

  initDB();