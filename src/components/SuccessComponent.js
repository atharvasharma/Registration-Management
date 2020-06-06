import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class Success extends Component {
  state = { modalOpen: false }
  
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    if(this.props.successMessage){
        this.setState({modalOpen:true});
    }
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Modal.Content>
          <h3>{this.props.successMessage}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Success;