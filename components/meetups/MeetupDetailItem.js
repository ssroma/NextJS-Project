import { Fragment } from "react";
import Head from "next/head";
import Card from "../../components/ui/Card";
import Link from "next/link";
import classes from "./MeetupDetailItem.module.css";

function MeetupDetailItem(props){

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
            <textarea rows="5" cols="10" readOnlid="textArea"   defaultValue={description}>
            </textarea>
          </div>
          <div className={classes.actions}>
            <Link className={classes.link} href={"/"}>Bacto Home  Page</Link>
          </div>
        </Card>
      </div>
    </Fragment>
  )
};

export default MeetupDetailItem;