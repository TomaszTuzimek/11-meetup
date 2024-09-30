import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head';

export default function HomePage(props) {
  return (
    <>
            <Head>
                <title>React meetups</title>
                <meta 
                    name='description' 
                    content='Huge list of ReACT meetups'></meta>
                <meta name='key'></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
   
    </>
  )
}


// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: MEETUPS_FOR_TESTS
//     }
//   };
// }


export async function getStaticProps(){
  
    const client = await MongoClient.connect(process.env.MONGO_STRING);
    const db = client.db();
    const mongoCollection = db.collection('meetups')
    const meetupsFromMongo = await mongoCollection.find().toArray();
    client.close();

    const  meetups = meetupsFromMongo.map( (meetup) =>{
 
        return {
            id : meetup._id,
            title : meetup.title,
            address : meetup.address,
            image : meetup.image,
            description : meetup.description,
        }
    })

    return{
      props:{
        meetups: meetups,
        
      },
      revalidate: 1
    }
}
