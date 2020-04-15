import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

export default function ContactItem({ contact }) {
  const { name, phone, email, id, type } = contact;

  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const whichBagde = () => {
    return type === 'personal' ? 'badge-primary' : 'badge-success';
  };
  const displayType = () => {
    return type.charAt(0).toLocaleUpperCase() + type.substring(1);
  };
  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  const setTheCurrentContact = () => {
    setCurrent(contact);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}
        <span style={{ float: 'right' }} className={'badge ' + whichBagde()}>
          {displayType()}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            {' '}
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={setTheCurrentContact}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
}
