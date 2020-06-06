import React from 'react';
import { Container,Header,Image, Grid,Message} from 'semantic-ui-react';
import { baseUrl } from '../baseUrl';

const RegistrationDetail = (props)=>{
    //console.log(props.entry.fullName);
    if(props.isLoggedIn==='true'){
        return(
        
            <Container className="registrationDetail">
                <Header as="h2" inverted>Following are the details of this entry.</Header>
                <Grid>
                    <Grid.Row className="details">
                        <Grid.Column computer={2} mobile={16}></Grid.Column>
                        <Grid.Column computer={7} mobile={16}>
                            <Header as="h3" inverted>Id Image :</Header>
                            <Image src={baseUrl+props.entry.idImage} />
                        </Grid.Column>
                        <Grid.Column computer={7} mobile={16} textAlign="left" >
                            <Header inverted>Name: {props.entry.fullName}</Header>
                            <Header inverted>Email: {props.entry.email}</Header>
                            <Header inverted>Mobile: {props.entry.mobile}</Header>
                            <Header inverted>Registration Type: {props.entry.registrationType}</Header>
                            <Header inverted>Number of Tickets: {props.entry.numberOfTickets}</Header>
                            <Header inverted>Registration id: {props.entry._id}</Header>
                            <Header inverted>Registration Date: {new Intl.DateTimeFormat('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: '2-digit'
                                                }).format(new Date(props.entry.createdAt))}
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        ); 
    }
    else{
        return(
            <Message>Please log in and try again</Message>
        );
    }
}

export default RegistrationDetail;