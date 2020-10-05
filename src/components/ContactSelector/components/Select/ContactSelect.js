import React from 'react';
import SelectItem from './components/SelectItem/SelectItem';
import { ActivityContext } from '../../../Activities/Context';
import './ContactSelect.scss';



class ContactSelect extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
         
        }
    }

    render() {
        const { contactList, searchResult } = this.props;
        console.log("check2 " + searchResult.length);
        return (
            <ActivityContext.Consumer>
                {contact => (
                    <div className="contactSelect">
                        <div className="contactSelect__title">
                            <span className="contactSelect__title__text">
                                {this.props.label}
                            </span>
                        </div>
                        {searchResult.length > 0 ?
                            searchResult.map(item => {
                                if (item._id !== contact._id) {
                                    return (
                                        <SelectItem
                                            key={item._id}
                                            contactID={item._id}
                                            contact={item}
                                            email={item.email}
                                            handleRemoveContact={this.props.handleRemoveContact}
                                            handleAddContact={this.props.handleAddContact}>
                                        </SelectItem>
                                    )
                                }
                                return null;
                            })
                            :
                            <React.Fragment>
                                <SelectItem
                                    contactID={contact._id}
                                    contact={contact}
                                    email={contact.email}
                                    handleRemoveContact={this.props.handleRemoveContact}
                                    handleAddContact={this.props.handleAddContact}>
                                </SelectItem>
                                {contactList.map(item => {
                                    if (item._id !== contact._id) {
                                        return (
                                            <SelectItem
                                                key={item._id}
                                                contactID={item._id}
                                                contact={item}
                                                email={item.email}
                                                handleRemoveContact={this.props.handleRemoveContact}
                                                handleAddContact={this.props.handleAddContact}>
                                            </SelectItem>
                                        )
                                    }
                                    return null;
                                })
                                }
                            </React.Fragment>
                        }
                    </div>
                )
                }
            </ActivityContext.Consumer>
        )
    }
}


export default ContactSelect;