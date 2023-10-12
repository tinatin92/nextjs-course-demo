import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';


function NewMeetupPage () {
  const router = useRouter()

   async function addMettupHandler (entereddata) { 
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(entereddata),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)

    router.push('/')
       
     }

    return  <>
    <Head>
        <title>Add React Meetups</title>
        <meta name="description" content="add your new meetups" />
        </Head>
      <NewMeetupForm onAddMeetup={addMettupHandler}/>
    </>
   
};

export default NewMeetupPage;