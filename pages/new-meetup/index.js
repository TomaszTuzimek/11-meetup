import React from 'react';
import NewMeetupForm from "../../components/meetups/NewMeetupForm.js";
import Head from 'next/head.js';


export default function NewMeetup() {

  return (
    <>
        <Head>
            <title>Add new meetup</title>
            <meta name='description' content='New amazing mettup with react' />
        </Head>
        <NewMeetupForm />
    </>
  )
}
