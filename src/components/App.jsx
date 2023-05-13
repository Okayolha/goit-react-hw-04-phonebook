import React, { Component } from 'react';
import { Form } from './Form/Form';
import { ContactsList } from './ContactsList/ContactsList'
import { Filter } from './Filter/Filter';
import css from './App.module.css'

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

formSubmitHandler = (contact) => {
  const { name, number } = contact;

  const isNameExists = this.state.contacts.some(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (isNameExists) {
    alert(`${name} is already in contacts`);
    return;
  }

  const isNumberExists = this.state.contacts.some(
    (c) => c.number === number
  );

  if (isNumberExists) {
    alert(`${number} is already in contacts`);
    return;
  }

  this.setState((prevState) => ({
    contacts: [contact, ...prevState.contacts],
  }));
};

    deletContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
  }
  

  filterChange = (e) => {
    this.setState({ filter: e.currentTarget.value })
  }

  render() {
    const { filter, contacts } = this.state

    const normalizeFilter = filter.toLowerCase()
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter))

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>

        <Form onSubmit={this.formSubmitHandler} />

        <h2>Contacts:</h2>
        <Filter
          value={filter}
          onChange={this.filterChange} />

        <ContactsList contacts={filteredContacts} onDeletContact={this.deletContact} />

      </div>
    );
  }

};
