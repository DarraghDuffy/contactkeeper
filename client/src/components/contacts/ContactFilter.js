import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

export default function ContactFilter() {
  const contactContext = useContext(ContactContext);
  const text = useRef('');
  const { filterContact, clearFilter, filtered } = contactContext;
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  }, [filtered]);
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='filter contacts...'
        onChange={onChange}
      />
    </form>
  );
}
