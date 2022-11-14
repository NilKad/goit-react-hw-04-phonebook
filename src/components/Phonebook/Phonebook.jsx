import React from 'react';
// import css from './Phonebook.module.css';
import ContactForm from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

class Phonebook extends React.Component {
  defaultState = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  };

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const readContact = JSON.parse(localStorage.getItem('contacts'));
    if (!readContact || readContact.length === 0) {
      this.setState({ contacts: this.defaultState.contacts });
    } else {
      this.setState({ contacts: readContact });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      console.log('Contact update');
      const prepareConatcts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', prepareConatcts);
    }
  }
  addToPhonebook = ({ id, name, number }) => {
    if (this.state.contacts.find(el => el.name === name)) {
      alert(`${name} is arledy is contacts`);
      return false;
    }

    this.setState(PrevState => {
      return { contacts: [...PrevState.contacts, { id, name, number }] };
    });
    return true;
  };

  filteredContactList = () => {
    // console.log('this.state: ', this.state);
    return this.state.contacts.filter(f => {
      const filter = this.state.filter.toLowerCase();
      return f.name.toLowerCase().includes(filter);
    });
  };

  onInputHandle = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  clearFilter = () => this.setState({ filter: '' });

  deletePhonebookID = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddPhonebook={this.addToPhonebook} />
        <h2>Contacts</h2>
        <Filter
          onInputHandle={this.onInputHandle}
          filterValue={this.state.filter}
          clearFilter={this.clearFilter}
        />
        <ContactList
          onDeletePhonebookID={this.deletePhonebookID}
          contactList={this.filteredContactList()}
          filterEl={this.state.filter}
        />
      </div>
    );
  }
}

export default Phonebook;
