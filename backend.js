const express = require('express')
const app = express()
const port = 3000
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://vikas:vikas@cluster0.pwqhuw7.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'users';

async function main() {
  // Use connect method to connect to the server 
  await client.connect();
  console.log('Connected successfully to server');
  db = await client.db(dbName);
  collection = await db.collection('products');
  // const insertResult = await collection.insertMany([{ 'Name': 'Vikas gupta', "city": 'Panvel', "designation": "Angular UI develoepr" },
  // { 'Name': 'tejas', 'city': 'kalmaboli', 'designation': 'Angular' },
  // { 'Name': 'akshy', 'city': 'koparkhairane', 'designation': 'Data_Analatic' },
  // { 'Name': 'Mukes', 'city': 'vashi', 'designation': 'Master in datasince' },
  // { 'Name': 'Audumber', 'city': 'kamothe', 'designation': 'Ai_Devloper' }]);


  // const updateResult = await collection.updateMany({'Name':'Vikas gupta' }, { $set: { 'Name':'akash yadav'}},{multi:true});
  // console.log('Updated documents =>', updateResult);

  //  const deleteResult = await collection.deleteOne({ 'Name': 'tejas' });
  //  console.log('Deleted documents =>', deleteResult);


  



 
 
  return 'done.';
}

main() 
  .then(console.log)
  .catch(console.error)
//  .finally(() => client.close());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/listall', async (req, res) => {

  const users = await collection.find({}).toArray();
  //console.log('Found documents =>', findResult);
  res.send(users)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})