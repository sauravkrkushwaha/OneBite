const mongoose = require('mongoose');
const mongoURI = "";

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    
    const foodCategory = await mongoose.connection.db.collection("food_Category");
    const catData = await foodCategory.find({}).toArray();
    
      global.food_items = data;
      global.foodCategory = catData;
      // console.log(global.food_items,global.foodCategory)
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;


/*
   Fetch data from the "food_items" collection using plain MongoDB driver

   const fetched_data = await mongoose.connection.db.collection("food_items");
   const data = await fetched_data.find({}).toArray();
   console.log("Fetched data:", data);


<-- Both are same -->
const fetched_data = await mongoose.connection.db.collection("food_items");
const data = await fetched_data.find({}).toArray();
console.log("Fetched data:", data);

---------------------------------------------------------------

const db = mongoose.connection.db;
const foodItems = await db.collection("food_items").find({}).toArray();
console.log("Fetched data:");
console.log(JSON.stringify(foodItems, null, 2));
*/