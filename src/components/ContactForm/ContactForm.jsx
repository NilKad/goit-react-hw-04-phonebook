import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import css from 'components/ContactForm/ContactForm.module.css';

const ContactForm = ({ onAddPhonebook }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputHandle = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const onSubmitPhonebook = e => {
    e.preventDefault();

    const isWrite = onAddPhonebook({
      id: nanoid(7),
      name: name,
      number: number,
    });
    if (isWrite) {
      setName('');
      setNumber('');
    }
  };

  return (
    <>
      <form className={css.phonebook} onSubmit={onSubmitPhonebook}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            onInput={onInputHandle}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.label}>
          Number
          <input
            className={css.input}
            onInput={onInputHandle}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.submitBtn} type="submit" name="add">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onAddPhonebook: PropTypes.func.isRequired,
};
