import React, { useContext, useEffect } from 'react';
import Contacts from '../../components/contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/contextAuth';

export default function Home() {
  const authContext = useContext(AuthContext);
  const { loadUser, loading } = authContext;
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
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
