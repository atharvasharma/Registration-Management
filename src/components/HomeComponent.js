import React from 'react';
import {Header,Container,Grid,Button,Icon} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

const Home = ()=>{
    return (
        <Container className="home">
            <Header
                as='h1'
                content='Welcome'
                inverted
            />
            <Header 
                as="h2"     
                size="large" 
                inverted 
                content="Book Your Spot for Thurday's event!" 
            />
            <p>Don't miss out on our sixth annual event, the largest event of all the events.</p>
            <Grid divided>
                <Grid.Row>
                    <Grid.Column computer={1}></Grid.Column>
                    <Grid.Column computer={4} mobile={16}>
                        <div className="feature-div">
                            <img src="./images/man.png" className="man-image" alt="featured"/>
                            <p><strong> Speaker 1</strong></p>
                        </div>
                    </Grid.Column>
                    <Grid.Column computer={1}></Grid.Column>
                    <Grid.Column computer={4} mobile={16}>
                        <img src="./images/woman.png" className="man-image" alt="featured"/>
                        <p><strong> Speaker 2</strong></p>
                    </Grid.Column>
                    <Grid.Column computer={1} ></Grid.Column>
                    <Grid.Column computer={4} mobile={16}>
                        <img src="./images/man2.png" className="man-image"alt="featured"/>
                        <p><strong> Speaker 3</strong></p>
                    </Grid.Column>
                    <Grid.Column computer={1}></Grid.Column>
                </Grid.Row>
                
            </Grid>
            <div className="registerButton">
                <NavLink to="/register">
                    <Button color='teal' size="huge">
                            Register Now <Icon name='arrow alternate circle right outline'/>
                    </Button>
                </NavLink>
            </div>
                
        </Container>
    );
}
export default Home;