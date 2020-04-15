import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: '1',
        name: 'Jill Connors',
        email: 'jill@dummy.com',
        phone: '11-111-111',
        type: 'personal',
      },
      {
        id: '2',
        name: 'James Foley',
        email: 'james@dummy.com',
        phone: '22-222-222',
        type: 'professional',
      },
      {
        id: '3',
        name: 'Rachel Muprhy',
        phone: '33-333-333',
        email: '',
        type: 'personal',
      },
    ],
    current: null,
    filtered: null,
    filterSearch: '',
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add Contact
  const addContact = (contact) => {
    contact.id = v4();
    console.log(contact.id);
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  //Delete Contact
  const deleteContact = (contactId) => {
    dispatch({ type: DELETE_CONTACT, payload: { id: contactId } });
  };

  //Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //Filter Contacts
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        filterSearch: state.filterSearch,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
