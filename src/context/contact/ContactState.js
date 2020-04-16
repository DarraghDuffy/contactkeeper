import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import { contacts } from '../../config/config';
import setAuthToken from '../../utils/setAuthToken';

import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    filterSearch: '',
    error: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Get Contact
  const getContacts = async () => {
    try {
      const res = await axios.get(contacts);
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      let errorObj = null;
      if (error.response.data.errors) {
        errorObj = error.response.data.errors;
      } else {
        errorObj = [{ msg: error.response.data.message }];
      }
      dispatch({ type: CONTACT_ERROR, payload: errorObj });
    }
  };

  //Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(contacts, contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      let errorObj = null;
      if (error.response.data.errors) {
        errorObj = error.response.data.errors;
      } else {
        errorObj = [{ msg: error.response.data.message }];
      }
      dispatch({ type: CONTACT_ERROR, payload: errorObj });
    }
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
        error: state.error,
        addContact,
        deleteContact,
        getContacts,
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
