import React from 'react';
import {Message,List,Container,Segment,Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const Registrations = (props)=>{
    if(props.isLoggedIn==='true'){
        return(
            <Container className="registrations">
                <Header as="h2" inverted>Here is the list all the Registrations</Header>
                <Segment inverted>
                    <List divided inverted relaxed>
                        {props.entries.map(function(entry){
                            return(
                                
                                <List.Item key={entry._id}>
                                    <Link to={`/registrations/${entry._id}`}>
                                        <List.Content>
                                            <strong>Registration id :</strong> {entry._id}
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <strong>Full Name : </strong> {entry.fullName}
                                            <br></br><br></br>
                                            <strong>Date Registered :</strong> {new Intl.DateTimeFormat('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: '2-digit'
                                                }).format(new Date(entry.createdAt))}
                                        </List.Content>
                                    </Link>
                                </List.Item>
                            );
                        })}
                    </List>
                </Segment>
            </Container>
        );
    }
    else{
        return(
            <Message>Please log in and try again</Message>
        );
    }
}
export default Registrations;
