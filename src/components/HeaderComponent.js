import React, {Component} from 'react';
import { Menu,Container,Icon,Responsive,Dropdown } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {baseUrl} from '../baseUrl';
class Header extends Component {
    constructor(props){
        super(props);
        this.handleLogout=this.handleLogout.bind(this);
    }
    handleLogout(event){
        fetch(baseUrl+"logout")
                .then(response=>response.json())
                .then((response)=>{
                    this.props.onLoggingOut();
                })
                .catch(error=>console.log(error.message))
    }
    render() {
      if(this.props.isLoggedIn==='true'){
        return(
            <Menu secondary pointing inverted size="massive">
                    <Container>
                        <NavLink to="/registrationsCount" activeClassName="active">
                            <Responsive as={Menu.Item} minWidth={790}
                                name='home'> 
                                        <Icon name='chart bar'  />Registrations Count
                            </Responsive>
                        </NavLink>
                        <NavLink to="/registrations" activeClassName="active">
                            <Responsive as={Menu.Item} minWidth={790}
                                name='home'> 
                                        <Icon name='list'  />All Registrations
                            </Responsive>
                        </NavLink>
                        <Menu.Menu position='right'>
                                <Responsive as={Menu.Item} minWidth={790}
                                    name='admin'>
                                        <NavLink to="/home" onClick={this.handleLogout}>
                                            <Icon name="sign out alternate"></Icon>  Logout 
                                        </NavLink>
                                </Responsive>
                        </Menu.Menu>
                        <Responsive as ={Menu.Menu} maxWidth={789}  position='right'>
                            <Dropdown
                                item
                                icon ='bars'
                                >
                                <Dropdown.Menu>
                                    <NavLink to="/registrationsCount"><Dropdown.Item text='Registaration Count' secondary className="mobile-dropdown"/></NavLink>
                                    <NavLink to="/registrations"><Dropdown.Item text='All registrations' secondary className="mobile-dropdown"/></NavLink>
                                    <NavLink to="/home" onClick={this.handleLogout}><Dropdown.Item text='Logout' secondary className="mobile-dropdown"/></NavLink>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Responsive>
                    </Container>
                </Menu>
        );
      }else{
          return(
                <Menu secondary pointing inverted size="massive">
                    <Container>
                        <NavLink to="/home" activeClassName="active">
                            <Responsive as={Menu.Item} minWidth={790}
                                name='home'> 
                                        <Icon name='home'  />Home 
                            </Responsive>
                        </NavLink>
                        <NavLink to="/register" >
                            <Responsive as={Menu.Item} minWidth={790}
                                name='register'>
                                    <Icon name='signup'  />Register for the event
                            </Responsive>
                        </NavLink>
                        <Menu.Menu position='right'>
                            <NavLink to="/login">
                                <Responsive as={Menu.Item} minWidth={790}
                                    name='admin'>
                                        Are you an admin?
                                </Responsive>
                            </NavLink>
                        </Menu.Menu>
                        <Responsive as ={Menu.Menu} maxWidth={789}  position='right'>
                            <Dropdown
                                item
                                icon ='bars'
                                >
                                <Dropdown.Menu>
                                    <NavLink to="/home"><Dropdown.Item text='Home' secondary className="mobile-dropdown"/></NavLink>
                                    <NavLink to="/register"><Dropdown.Item text='Register' className="mobile-dropdown" secondary/></NavLink>
                                    <NavLink to="/login"><Dropdown.Item text='Admin?' secondary className="mobile-dropdown"/></NavLink>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Responsive>
                    </Container>
                </Menu>
          )
      }
      
    }
  }
  
export default Header;