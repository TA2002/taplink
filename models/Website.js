const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  website_path: { type: String, required: true },
  display_name: { type: String, required: true },
  bio: { type: String, required: true },
  contact: { type: String, required: false },
  contact_email: { type: String, required: false },
  instagram_link: { type: String, required: false },
  facebook_link: { type: String, required: false },
});

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://ta2153:Stopdance@tapspace.cfoxg87.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
