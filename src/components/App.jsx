import React from 'react';
import { Form } from './Form/Form';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
  const isContactExists = contacts.some(contact =>
    contact.name.toLowerCase() === data.name.toLowerCase() ||
    contact.number === data.number
  );
  if (isContactExists) {
    alert('This contact already exists!');
    return;
  }
  setContacts(prevContacts => [data, ...prevContacts]);
};


  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizeFilter = filter.toLowerCase();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>

      <Form onSubmit={formSubmitHandler} />

      <h2>Contacts:</h2>
      <Filter value={filter} onChange={filterChange} />

      <ContactsList
        contacts={filteredContacts}
        onDeletContact={deleteContact}
      />
    </div>
  );
};