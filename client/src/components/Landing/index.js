import React from "react";
import { Hero, Container, Heading, Block, Image, Box } from "react-bulma-components";

 export default function Landing() {

    return(
       <>
  <Hero size='fullheight' color='dark' style={{backgroundColor:"#1A237E"}} >
    
    <Hero.Header>
    </Hero.Header>
    <Hero.Body>
      <Container>
      <Block>
              <Image
                style={{ margin: 'auto' }}
                size={128}
                src='https://user-images.githubusercontent.com/74746211/117521730-20fd6580-af64-11eb-9522-6c4a865877c4.png'
              />
            </Block>
        <Heading size={2}>
        Momentous
        </Heading>
        
        <Heading
          size={4}
          subtitle
          weight='light'
        >
          BRINGING PEOPLE TOGETHER FOR A MOMENTOUS OCCASION!
        </Heading>
        </Container>
    </Hero.Body>
    <Hero.Footer >
    <Box color='light' style={{backgroundColor:"#F4B400"}}>
    <Heading
          size={3}
          subtitle
         
        > EVENTS
      </Heading>
      </Box> 
    </Hero.Footer>

    </Hero>
   </>
    );
  
 }
