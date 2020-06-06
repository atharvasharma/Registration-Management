import React, { Component } from 'react'
import { Form,Container,Header, Grid,Confirm} from 'semantic-ui-react';
import Preview from './PreviewComponent';
import {baseUrl} from '../baseUrl';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            fullName:'',
            mobile:'',
            email:'',
            registrationType:'self',
            numberOfTickets:'1',
            id:null,
            touched:{
                fullName:false,
                mobile:false,
                email:false,
            },
            previewOpen:false,
        }
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
        this.handleImage=this.handleImage.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showPreview=this.showPreview.bind(this);
    }

    handleSubmit(event){
        const formData=new FormData();
        formData.append('fullName',this.state.fullName);
        formData.append('mobile',this.state.mobile);
        formData.append('email',this.state.email);
        formData.append('registrationType',this.state.registrationType);
        formData.append('numberOfTickets',this.state.numberOfTickets);
        formData.append('id',this.state.id);
        fetch(baseUrl+"register",{
            method: "POST",
            body:formData,
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
        .then(response => alert('You have been registered successfully. Your registration ID is: '+response._id))
        .catch(error =>  {
            if(error.response.statusText==="Conflict"){
                alert("Entry with this email already exists");
            }else{
                alert("We couldn't register you currently. Please try again later.")
            }
        });
        this.setState({previewOpen:false});
        event.preventDefault();
    }

    handleInputChange(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
        this.setState({
            [name]:value
        })
    }

    handleBlur=(field)=>(evt)=>{
        this.setState({
            touched:{...this.state.touched,[field]:true}
        });
    }

    handleImage(event){
        this.setState({
            id: event.target.files[0]
        })
    }

    showPreview(){
        if(this.state.fullName.length===0 || this.state.mobile.length===0 
            || this.state.email.length===0 || this.state.id===null){
                alert("Please fill in all the details");
                return;
        }
        this.setState({
            previewOpen:true
        })
    }

    handleCancel(){
        this.setState({
            previewOpen:false
        })
    }

    validate(fullName,mobile,email){
        const errors={
            fullName:'',
            mobile:'',
            email:''
        };
        if(this.state.touched.fullName && fullName.length<3){
            errors.fullName='First Name should be of length >=3';
        }
        const mobreg=/^[789]\d{9}$/;
        if(this.state.touched.mobile && !mobreg.test(mobile) && mobile.length!==10){
            errors.mobile='Mobile Number should only contain digits and length equal to 10'
        }
        const emailreg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.touched.email && !emailreg.test(email)){
            errors.email='Enter a valid Email'
        }
        return errors;
    }
    render() {
        const errors=this.validate(this.state.fullName,this.state.mobile,this.state.email);
        return (
            <Container className="register">
                <Grid divided>
                    <Grid.Row>
                        <Grid.Column computer={9} mobile={16}>
                            <Header as="h2" content="Please fill in the details below." inverted size="huge"/>
                            <Form inverted>
                                <Form.Group widths="equal">
                                    <Form.Input fluid label='Full name' placeholder='Full name' type="text" required 
                                        name="fullName" value={this.state.fullName}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('fullName')}
                                        error={errors.fullName}
                                    />

                                    <Form.Input fluid label='Mobile' placeholder='Mobile' type="tel" required 
                                        name="mobile" value={this.state.mobile}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('mobile')}
                                        error={errors.mobile}
                                    />
                                </Form.Group>
                                <Form.Input fluid label='Email' placeholder='Email' type="email" required 
                                    name="email" value={this.state.email}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleBlur('email')}
                                    error={errors.email}
                                />
                                <label className="typeLabel">Registration Type</label>
                                <select name="registrationType" value={this.state.registrationType} required
                                    onChange={this.handleInputChange}
                                >
                                    <option value="self">Self</option>
                                    <option value="group">Group</option>
                                    <option value="corporate">Corporate</option>
                                    <option value="others">Others</option>
                                </select>
                                <Form.Input fluid label='No of tickets' placeholder='No of tickets' type="number" min="1" required 
                                    name="numberOfTickets" value={this.state.numberOfTickets}
                                    onChange={this.handleInputChange} 
                                    disabled={this.state.registrationType==='self'}    
                                />
                                <Form.Input fluid label='Upload ID card' placeholder='Upload ID card' type="file" 
                                    accept="image/*" required
                                    onChange={this.handleImage}
                                />
                                <Form.Button onClick={this.showPreview}>Submit</Form.Button>
                                <Confirm open={this.state.previewOpen} 
                                    content={
                                        <Preview fullName={this.state.fullName} mobile={this.state.mobile}
                                            email={this.state.email} registrationType={this.state.registrationType}
                                            numberOfTickets={this.state.numberOfTickets} id={this.state.id}
                                        />
                                    }
                                    onCancel={this.handleCancel}
                                    onConfirm={this.handleSubmit}
                                    header="Are you sure you want to register with the following details?"
                                />
                            </Form>
                        </Grid.Column>
                        <Grid.Column computer={2} mobile={16}></Grid.Column>
                        <Grid.Column computer={5} mobile={16}>
                            <img src="images/register.png" alt="register"></img>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        </Container>
        )
    }
}
export default Register;