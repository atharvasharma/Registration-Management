import React from 'react';
import {Grid,Header} from 'semantic-ui-react';
const Preview = (props)=>{
    return (
        <Grid celled>
            <Grid.Row className="preview">
                <Grid.Column computer={6} mobile={16}>
                    <Header as="h3" content="Full Name: "/>
                    <span>{props.fullName}</span>
                    <Header as="h3" content="Mobile:"/>
                    <span>{props.mobile}</span>
                    <Header as="h3" content="Email:"/>
                    <span>{props.email}</span>
                    <Header as="h3" content="Registration Type:" />
                    <span>{props.registrationType}</span>
                    <Header as="h3" content="Number of Tickets:"/>
                    <span>{props.numberOfTickets}</span>
                </Grid.Column>
                <Grid.Column computer={10} mobile={16}>
                    <Header as="h3">Id image</Header>
                    <img src={URL.createObjectURL(props.id)} alt="id"/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
export default Preview;