import Head from 'next/head'
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";


/* const DUMMY_MEETUP = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://media.istockphoto.com/id/1160446488/photo/tbilisi-downtown-georgia-taken-in-april-2019.jpg?s=612x612&w=0&k=20&c=yybfqVCUZsy8qNWMnpmX1AjAmbuXtj5Kg5aekaeHj7M=',
        address: 'tbilisi',
        description: 'this is the first meetup'
    },
    {
        id: 'm2',
        title: 'A second Meetup',
        image: 'https://media.istockphoto.com/id/624128014/photo/saarbrucken-bridge-and-sameba-cathedral-in-tbilisi-georgia.jpg?s=2048x2048&w=is&k=20&c=5Ic9atwXQYjGSjRiKas5mheERDrBd1lI-Aw9Eu-OZj0=',
        address: 'tbilisi',
        description: 'this is the second meetup'
    }
] */

function HomePage (props) {
   
    return <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Broews a huge list of higly active react meetups" />
      </Head>
       <MeetupList meetups={props.meetups}/>
    </>

};

export async function getStaticProps() {
  const client = await  MongoClient.connect('mongodb+srv://tinatygordadze:w5pZZZc4NVdqp6wV@cluster0.irt77z9.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupCollections = db.collection('meetups');
  const meetups = await meetupCollections.find().toArray()
  client.close()
   //fetch data from server side
    return {
        props: {
            meetups:meetups.map(meetup => ({
                title:meetup.title,
                address: meetup.address,
               image: meetup.image,
               id: meetup._id.toString()
            }))
        },
        revalidate: 1,
    };
}

/* export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res
    //fetch data from server side
    return {
        props: {
            meetups: DUMMY_MEETUP
        }
    }
} */

export default HomePage;