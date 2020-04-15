import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

export default function ContactForm() {
  const contactContext = useContext(ContactContext);

  const { current, addContact, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current) {
      setThisContact(current);
    } else {
      setThisContact({ name: '', email: '', phone: '', type: 'personal' });
    }
  }, [contactContext, current]);

  const [contact, setThisContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setThisContact({ ...contact, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addContact(contact);
      setThisContact({ name: '', email: '', phone: '', type: 'personal' });
    } else {
      updateContact(contact);
    }
    clearCurrent();
  };

  const clearAll = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current && 'Edit Contact'}
        {!current && 'Add Contact'}
      </h2>
      <input
        type='text'
        name='name'
        placeholder='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        name='email'
        placeholder='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        placeholder='phone'
        value={phone}
        onChange={onChange}
      />
      <h3>Contact type</h3>
      <input
        type='radio'
        name='type'
        value='personal'
        onChange={onChange}
        checked={type === 'personal'}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        onChange={onChange}
        checked={type === 'professional'}
      />{' '}
      Professional
      <div>
        <input
          className={'btn btn-primary btn-block'}
          type='submit'
          value={(current && 'Update Contact') || (!current && 'Add Contact')}
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear All
          </button>
        </div>
      )}
    </form>
  );
}
