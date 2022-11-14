import { useState, useEffect, useRef } from 'react';
// import css from './Phonebook.module.css';
import ContactForm from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export default function Phonebook() {
  // const defaultContacts = [
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ];

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const isFirstLoad = useRef(true);

  useEffect(() => {
    const readContacts = JSON.parse(localStorage.getItem('contacts'));
    if (readContacts) {
      setContacts(readContacts);
    } else {
      setContacts([
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]);
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    const prepareConatcts = JSON.stringify(contacts);
    localStorage.setItem('contacts', prepareConatcts);
  }, [contacts]);

  const addToPhonebook = ({ id, name, number }) => {
    if (contacts.find(el => el.name === name)) {
      alert(`${name} is arledy is contacts`);
      return false;
    }
    setContacts(p => [...p, { id, name, number }]);
    return true;
  };

  const filteredContactList = () => {
    return contacts.filter(f => {
      return f.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const onInputFilterHandle = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const clearFilter = () => setFilter('');

  const deletePhonebookID = id => {
    setContacts(prevState => {
      return prevState.filter(el => el.id !== id);
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddPhonebook={addToPhonebook} />
      <h2>Contacts</h2>
      <Filter
        onInputHandle={onInputFilterHandle}
        filterValue={filter}
        clearFilter={clearFilter}
      />
      <ContactList
        onDeletePhonebookID={deletePhonebookID}
        contactList={filteredContactList()}
        filterEl={filter}
      />
    </div>
  );
}
