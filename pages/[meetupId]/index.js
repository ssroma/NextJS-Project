import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import classes from "./index.module.css";
import Card from "../../components/ui/Card";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  const {title, image, address, description} = props.meetupData;

  return (
    <Fragment>
      <Head>
        <title>{title + " Meeting Up"}</title>
        <meta name="description" content={description}  />
      </Head> 
      <div className={classes.detaislContainer}>
        <Card>
            <div className={classes.image}>
              <img src={image} alt={title} />
            </div>
            <div className={classes.content}>
              <h3>{title}</h3>
              <address>{address}</address>
            </div>
            <div className={classes.content}>
              <label htmlFor="textArea">Descriptions: </label>
              <textarea rows="5" cols="10" readOnly id="textArea" defaultValue={description}>
              </textarea>
            </div>
            <div className={classes.actions}>
              <Link className={classes.link} href={"/"}>Back to Home Page</Link>
            </div>
          </Card>
        </div>
    </Fragment>
  )
}

export async function getStaticPaths() {
  const uri = "mongodb+srv://meetUp:264859Santos!@cluster0.ahsjr.mongodb.net/meetups?retryWrites=true&w=majority";

  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
  client.close();
 
  return {
    paths: meetups.map( meetup => ({params: {meetupId: meetup._id.toString() }})),
    fallback: true
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const uri = "mongodb+srv://meetUp:264859Santos!@cluster0.ahsjr.mongodb.net/meetups?retryWrites=true&w=majority";

  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString()
      }
    }
  }
}

export default MeetupDetails;