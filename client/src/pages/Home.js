import React, {useEffect, useState} from 'react'
import { Container, Heading } from 'react-bulma-components';
import Landing from '../components/Landing';
import { List, Event } from '../components/EventList';
import API from '../utils/API';

export default function Home() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        loadEvents()
    }, [])
  
    function loadEvents() {
        API.getEvents()
            .then(res => {
                setEvents(res.data)
            })
            .catch(err => {
                console.log(err)
            })}

       return(
        <>
<Landing/>

<Container>
{events.length ? (
<List>

{events.map((event, index) => (
    <Event
    key={index}
    event={event}
    title={event.title}
    description={event.description}
    id={event._id}

    >
    </Event>
))}
</List>
) : (
          <Heading style={{ paddingTop: 30 }} as='h3'>
            No events yet!
          </Heading>
        )}
</Container>

</>
    );
}