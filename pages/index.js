import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";


function HomePage(props){
 
  return (
    <Fragment> 
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of higly active React meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps(){
  const uri = "mongodb+srv://meetUp:264859Santos!@cluster0.ahsjr.mongodb.net/meetups?retryWrites=true&w=majority";

  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map( meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  }
}

export default HomePage;