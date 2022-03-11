import { Fragment } from "react";
import MeetupDetailItem from "../../components/meetups/MeetupDetailItem";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  return (
    <Fragment>
      <MeetupDetailItem meetupData={props.meetupData} />
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
    paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString() }})),
    fallback: 'blocking'
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