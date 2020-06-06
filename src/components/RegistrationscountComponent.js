import React,{Component} from 'react';
import { Grid,Container,Header,Message,Button } from 'semantic-ui-react';
import {Chart} from 'react-google-charts';
import {NavLink} from 'react-router-dom';

class Registrationscount extends Component{
    render(){
        // const entries=this.state.entries.map(function(entry){
        //     console.log(entry);
        //     return(
        //      <div key={entry._id}>{entry}</div>
        //     );
        // })
       // console.log(this.state.entries.length);
        
        if(this.props.isLoggedIn==='true' && this.props.entries.length>0){
            var entries=this.props.entries;
            var selfCount=0;
            var groupCount=0;
            var corporateCount=0;
            var othersCount=0;
            for(var i=0;i<entries.length;i++){
                console.log(entries[i]);
                if(entries[i].registrationType==="self"){
                    selfCount++;
                }
                else if(entries[i].registrationType==="group"){
                    groupCount++;
                }
                else if(entries[i].registrationType==="corporate"){
                    corporateCount++;
                }
                else if(entries[i].registrationType==="others"){
                    othersCount++;
                }
            }
            console.log(selfCount);console.log(groupCount);console.log(corporateCount);console.log(othersCount);
            
            return(
                
                <Container className="registrationsCount">
                    <Header as="h2" inverted>Hi admin!</Header>
                    <Grid divided>
                        <Grid.Row>
                            <Grid.Column computer={3}></Grid.Column>
                            <Grid.Column computer={10} mobile={16}>
                            <Header as="h3" inverted>Following are the counts of registrations.</Header>
                            <Chart
                                backgroundColor="none"
                                height={400 }
                                chartType="ColumnChart"
                                data={[
                                ['Registration Type', 'Counts',],
                                ['Self', selfCount],
                                ['Group', groupCount],
                                ['Corporate', corporateCount],
                                ['Others', othersCount],
                                ]}
                                options={{
                                title: 'Registration Counts',
                                chartArea: { width: '65%' },
                                hAxis: {
                                    title: 'Registration Type',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Count',
                                },
                                }}
                                legendToggle
                            />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column computer={16}>
                                <NavLink to="/registrations"><Button color='teal'>View all registrations</Button></NavLink>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }           
        else if(this.props.isLoggedIn==='true' && this.props.entriesLoading){
            
            return(
                <Message>Loading</Message>
            );  
        }
        else if(this.props.isLoggedIn==='loading'){
            return(
                <Message>Loading</Message>
            );
        }
        else if(this.props.isLoggedIn==='false'){
            return(
                <Message>You were not logged in! Please try again</Message>
            );
        }
    }
    
}

export default Registrationscount;