import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import css from 'components/ContactForm/ContactForm.module.css';

class ContactForm extends React.Component {
  static PrpoTypes = {
    onAddPhonebook: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  onInputHandle = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onSubmitPhonebook = e => {
    e.preventDefault();

    const isWrite = this.props.onAddPhonebook({
      id: nanoid(7),
      name: this.state.name,
      number: this.state.number,
    });
    isWrite && this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <form className={css.phonebook} onSubmit={this.onSubmitPhonebook}>
          <label className={css.label}>
            Name
            <input
              className={css.input}
              onInput={this.onInputHandle}
              value={this.state.name}
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
              onInput={this.onInputHandle}
              value={this.state.number}
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
  }
}

export default ContactForm;
