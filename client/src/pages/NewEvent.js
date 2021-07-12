import React, { useState, useContext } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { Form, Button, Container, Block, Image, Box, Heading } from "react-bulma-components"
import API from '../utils/API';
import GlobalContext from '../utils/GlobalState';
import GeoapifySearch from '../utils/GeoapifySearch';

export default function CreateEvent() {
    const [formObject, setFormObject] = useState({})
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [venue, setVenue] = useState("")
    const { id } = useContext(GlobalContext);
    const form = document.getElementById("eventForm");
  
    function handleAddressChange(value) {
      setVenue(value)
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title && formObject.description) {
 
          API.saveEvent({
            title: formObject.title,
            description: formObject.description,
            start_date: startDate.toLocaleDateString(),
            end_date: endDate.toLocaleDateString(),
            owner: id,
            venue: venue.properties.formatted
          })
          .then(res => {
            if (res) {
              console.log(res.status)
            form.reset();}
          })
           .catch(err => console.log(err));
        }
      };

  return (
    <Container 
    backgroundColor='link'
           >
             <Box
              backgroundColor='link'> </Box>
      
      <Box style={{ width: 750, margin: 'auto' }}>

        <Block>
          <Image
            style={{ margin: 'auto' }}
            size={128}
            src='https://user-images.githubusercontent.com/74746211/117521730-20fd6580-af64-11eb-9522-6c4a865877c4.png'
          />
        </Block>
        <Block>
        <Heading subtitle size={3}>
          ADD A NEW EVENT
        </Heading>

        </Block>

    <form id='eventForm'>

      <Form.Field>
        <Form.Label>Event Title</Form.Label>
        <Form.Control>
          <Form.Input
             onChange={handleInputChange}
             type="text" 
             placeholder="event title" 
             name="title"
          />
         </Form.Control>
             </Form.Field>

             <Form.Field>
             <Form.Label> Select Event Start Date and Time</Form.Label>
             <DateTimePicker value={startDate} onChange={setStartDate} name="start_date" />
             </Form.Field>

             <Form.Field>
             <Form.Label> Select Event End Date and Time</Form.Label>
                <DateTimePicker value={endDate} onChange={setEndDate} name="end_date" />
                </Form.Field>
                Enter the Event Address
                    <GeoapifySearch type="text" handleAddressChange={handleAddressChange} />
                        <Form.Field>
        <Form.Label>Enter Event Details</Form.Label>
        <Form.Textarea
        onChange={handleInputChange} 
        placeholder="Add event descriptions and other deatiles about your event." 
        name="description"
        />
      </Form.Field>  
    
      <Form.Field kind="group">
        <Form.Control>
          <Button color="link"
          type="submit" onClick={handleFormSubmit} 
          >Submit</Button>
        </Form.Control>
        <Form.Control>
          <Button 
          type='reset'
          color="link" 
          colorVariant="light">
            Cancel
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
    </Box>
        </Container>
  );
        }