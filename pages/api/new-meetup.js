import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if(req.method === 'POST'){
        const data = req.body;
        console.log('data from request: ' + data);
    
        const client =  await MongoClient.connect(process.env.MONGO_STRING);
        const db = client.db();

        const meetupsCollection = db.collection('meetups')
        await meetupsCollection.insertOne(data);

        client.close();
    
        res.status(201).json({message: 'Meetup inserted'})
    }
}

export default handler