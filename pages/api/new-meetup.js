// /api/new-meetup
//POST /aoi/nwe-meetup
import { MongoClient } from "mongodb";

async function handler (req, res) {
    if(req.method === 'POST'){
    const data = req.body;


  const client = await  MongoClient.connect('mongodb+srv://tinatygordadze:w5pZZZc4NVdqp6wV@cluster0.irt77z9.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupCollections = db.collection('meetups');
  const result = await  meetupCollections.insertOne(data);

 console.log(result);
 client.close();

 res.status(201).json({message: 'Meetup inserted'})
    }
}

export default handler;