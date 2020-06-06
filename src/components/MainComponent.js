import React, {Component} from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Register from './RegisterComponent';
import Login from './LoginComponent';
import Registrationscount from './RegistrationscountComponent';
import Registrations from './RegistrationsComponent';
import RegistrationDetail from './RegistrationDetail';
import {Switch,Route,Redirect} from 'react-router-dom';
import {baseUrl} from '../baseUrl';

class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoggedIn:'false',
            entries:[],
            entriesLoading:true
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.state.isLoggedIn==='true' && prevState.isLoggedIn==='loading'){
            fetch(baseUrl)
                .then(response=>response.json())
                .then((entries)=>{
                    this.setState({
                        entries:entries,
                        entriesLoading:false
                    })
                    console.log(this.state.entries)
                })
                .catch(error=>console.log(error.message))
        }
    }
    onLogIn(value){
        this.setState({
            isLoggedIn:value,
        })
    }
    onLogOut(){
        console.log("ran");
        this.setState({
            isLoggedIn:'false'
        })
    }
    render(){
        console.log(this.state.isLoggedIn)
        const RegistrationWithId = ({match}) => {
            //alert(match.params.registrationId);
            return(
                <RegistrationDetail entry={this.state.entries.filter((entry) => entry._id === match.params.registrationId)[0]}
                  isLoggedIn={this.state.isLoggedIn}
                />
            );
        }
        return(
            <React.Fragment>
                <Header isLoggedIn={this.state.isLoggedIn} onLoggingOut={()=>this.onLogOut()}/>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route exact path="/register" component={Register} />
                    <Route path="/login" component={()=><Login onLogging={(value)=>this.onLogIn(value)}/>} />
                    <Route path="/registrationsCount" 
                        component={()=><Registrationscount
                                            isLoggedIn={this.state.isLoggedIn} 
                                            entries={this.state.entries} 
                                            entriesLoading={this.state.entriesLoading}
                                            loginLoading={this.state.loginLoading}
                                        />
                        }
                    />
                    <Route exact path="/registrations" component={()=><Registrations
                                            isLoggedIn={this.state.isLoggedIn} 
                                            entries={this.state.entries} 
                                        />
                        }
                    />
                    <Route path='/registrations/:registrationId' component={RegistrationWithId} />
                    <Redirect to="/home" />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Main;