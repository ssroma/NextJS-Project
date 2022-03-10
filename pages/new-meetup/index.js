import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";


function NewMeetup(){
  const router = useRouter();
  const addMeetupHandler = async (meetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(meetupData)
    });
  
    const data = response.json();
    data.then( item => {
      console.log(item);
    });

    router.push("/");

  }
  
  return (
    <Fragment >
      <Head>
        <title>Add New Meetup</title>
        <meta name="description" content="Add new meeting to the React meetups list" />
      </Head> 
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetup;