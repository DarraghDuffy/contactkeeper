import React, { useContext, Fragment, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from './../layout/Spinner';
import { GET_CONTACTS } from '../../context/types';

export default function Contacts() {
  const contactContext = useContext(ContactContext);
  const {
    contacts,
    filtered,
    filterSearch,
    getContacts,
    loading,
  } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Fragment>
        <Spinner></Spinner>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {contacts.length > 0 &&
        !filtered &&
        filterSearch.length === 0 &&
        contacts.map((contact) => {
          return (
            <ContactItem key={contact._id} contact={contact}></ContactItem>
          );
        })}
      {filtered &&
        filtered.map((contact) => {
          return (
            <ContactItem key={contact._id} contact={contact}></ContactItem>
          );
        })}
      {filtered && filtered.length === 0 && filterSearch.length > 0 && (
        <p className='text-primary'>no contacts found</p>
      )}
      {contacts.length === 0 && (
        <h3 className='text-danger'>ah, you have no contacts...</h3>
      )}
    </Fragment>
  );
}
