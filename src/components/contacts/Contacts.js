import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

export default function Contacts() {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, filterSearch } = contactContext;
  return (
    <Fragment>
      {contacts.length > 0 &&
        !filtered &&
        filterSearch.length === 0 &&
        contacts.map((contact) => {
          return <ContactItem key={contact.id} contact={contact}></ContactItem>;
        })}
      {filtered &&
        filtered.map((contact) => {
          return <ContactItem key={contact.id} contact={contact}></ContactItem>;
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
