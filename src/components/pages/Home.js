import React from 'react';
import Contacts from '../../components/contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

export default function Home() {
  return (
    <div className='grid-2'>
      <div className=''>
        <ContactForm></ContactForm>
      </div>
      <div>
        <ContactFilter></ContactFilter>
        <Contacts></Contacts>
      </div>
    </div>
  );
}
