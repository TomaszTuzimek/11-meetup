import React from 'react'
import MeetupDetails from '../../components/meetups/MeetupDetails'
import { MongoClient} from 'mongodb'
import Head from 'next/head'

function MeetupDetailPage(props) {

  return (

      <>
          <Head>
            <title>{props.title}</title>
            <meta name='description' content={props.description} />
          </Head>
          <MeetupDetails 
            id={props.id}
            image={props.image}
            title={props.title}
            address={props.address}
            description={props.description}
          />
      </>    
  )
}

export async function getStaticPaths(){

  const client = await MongoClient.connect(process.env.MONGO_STRING);
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find({}, {projection:{_id : 1}}).toArray();


  return  {paths: meetups.map((meetup) =>({
                                            params: {meetupId : meetup._id.toString()}
                                          })
                              ),
                              fallback:false,

}
}

export async function getStaticProps(context){
  const meetupId = context.params.meetupId;


  const connection = await MongoClient.connect(process.env.MONGO_STRING);
  const db = connection.db();
  const meetupCollection = db.collection('meetups');

  const meetup = await meetupCollection.findOne({_id: meetupId})

  return(
    {
      props:{
        id: meetup._id,
        ...meetup
      }
    }
  )
}
export default MeetupDetailPage