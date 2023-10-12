import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
function MeetupDetails(props) {
  return (
    <>
    <Head>
    <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
    </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description} />
    </>
  );
}

export async function getStaticPaths() {
  const client = await  MongoClient.connect('mongodb+srv://tinatygordadze:w5pZZZc4NVdqp6wV@cluster0.irt77z9.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupCollections = db.collection('meetups');
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  client.close()
  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params:{meetupId: meetup._id.toString()}
    }))
    
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await  MongoClient.connect('mongodb+srv://tinatygordadze:w5pZZZc4NVdqp6wV@cluster0.irt77z9.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupCollections = db.collection('meetups');
  const slececterMeetup = await meetupCollections.findOne({_id: new ObjectId(meetupId)});
  client.close();


  console.log(meetupId)
  return {
    props: {
      meetupData: {
        id: slececterMeetup._id.toString(),
        title: slececterMeetup.title,
        image: slececterMeetup.image,
        description: slececterMeetup.description
      },
    },
  };
}

export default MeetupDetails;
