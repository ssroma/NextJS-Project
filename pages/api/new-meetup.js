// api/new-meetup
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://meetUp:264859Santos!@cluster0.ahsjr.mongodb.net/meetups?retryWrites=true&w=majority";

async function handler(req, res) {
  if(req.method === 'POST'){
    const data = req.body;

    const client = await MongoClient.connect(uri);
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();
    res.status(201).json({message: 'MeetUp inserted sucessfully.'});
  }

}


export default handler;