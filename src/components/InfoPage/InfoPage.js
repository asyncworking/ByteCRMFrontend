import React, { Component } from 'react';
import { faEnvelope, faEdit, faPhoneAlt, faCalendarAlt, faPlus, faTasks,faUser,faBuilding} from "@fortawesome/free-solid-svg-icons";
import BasicInfo from './components/BasicInfo';
import DetailInfo from './components/DetailInfo';
import NoteModal from '../Modal/components/Function/Note';
import EmailModal from '../Modal/components/Function/Email';
import CallModal from '../Modal/components/Function/Call';
import TaskModal from '../Modal/components/Function/Task';
import MeetingModal from '../Modal/components/Function/Meeting';
import DataPack from './services/DataPack';
import './InfoPage.scss';


class InfoPage extends Component {
  constructor(props) {
    super(props);
    const navItems = [
      { key: 'Note', value: 'Note', icon: faEdit, modal: <NoteModal /> },
      { key: 'Email', value: 'Email', icon: faEnvelope, modal: <EmailModal /> },
      { key: 'Call', value: 'Call', icon: faPhoneAlt, modal: <CallModal /> },
      { key: 'Log', value: 'Log', icon: faPlus, modal: '' },
      { key: 'Task', value: 'Task', icon: faTasks, modal: <TaskModal /> },
      { key: 'Meeting', value: 'Meet', icon: faCalendarAlt, modal: <MeetingModal /> },
    ];
    this.state = {
      navItems,
      currentModal: navItems[0],
      name: 'email',
    };
    this.onNavItemClick = this.onNavItemClick.bind(this);
  }

  onNavItemClick(selectedModal) {
    console.log('Switch to the ' + selectedModal.key);
    this.setState({
      currentModal: selectedModal,
    });
    this.props.openModal(selectedModal);
  }

  render() {
    const { navItems, currentModal } = this.state;
    let dataPack = "";

    if(this.props.contact){
       dataPack = new DataPack("contact","Contacts",this.props.contact);
    }
    else{
       dataPack = new DataPack("company","Companies",this.props.company);
       console.table(dataPack);
    }

    return (
      <div className="InfoPage">
        <BasicInfo 
          dataPack = {dataPack}    
          navItems={navItems}
          modalKey={currentModal.key}
          onNavItemClick={this.onNavItemClick}
        />

        <DetailInfo 
          dataPack = {dataPack}    
          expandPack = {this.props.expandPack}/>
      </div>
    );
  }
}

export default InfoPage;