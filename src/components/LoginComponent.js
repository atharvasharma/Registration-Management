import React, {Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import {baseUrl} from '../baseUrl';

class Login extends Component{
    
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }
    handleSubmit(event){
       // alert("Username:"+this.state.username+"Password:"+this.state.password);
        this.props.onLogging('loading');
        const newLogin={
            username:this.state.username,
            password:this.state.password
        }
        fetch(baseUrl+"login",{
            method: "POST",
            body:JSON.stringify(newLogin),
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
            return response;
            }else {
                var error = new Error('Error ' + response.status + ': ' + response.errmsg);
                error.response = response;
                throw error;
            }
        },
        error => {
                throw error;
        })
        .then(response => response.json())
        .then(response => this.props.onLogging('true'))
        .catch(error =>  {
            //console.log(error);
            if(error.response.status===401){
                this.props.onLogging('false');
            }else{
                this.props.onLogging('false');
            }
        });
    }
    handleInputChange(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' inverted textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input fluid icon='user' name="username" iconPosition='left' placeholder='Username' value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <NavLink to="/registrationsCount" onClick={this.handleSubmit}>
                        <Button type="submit" color='teal' fluid size='large'>
                            Login
                        </Button>
                    </NavLink>
                    </Segment>
                </Form>
                </Grid.Column>
            </Grid>
        );
    }
}
export default Login;