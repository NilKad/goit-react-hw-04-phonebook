import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import { ContactListItem } from './ContactListItem';

export const ContactList = ({ contactList, onDeletePhonebookID }) => {
  return (
    contactList.length > 0 && (
      <ul className={css.contactsList}>
        {contactList.map(el => {
          return (
            <ContactListItem
              key={el.id}
              element={el}
              onDeletePhonebookID={onDeletePhonebookID}
            >
              <button
                type="button"
                className={css.button}
                onClick={() => onDeletePhonebookID(el.id)}
              >
                Delete
              </button>
            </ContactListItem>
          );
        })}
      </ul>
    )
  );
};

ContactList.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDeletePhonebookID: PropTypes.func.isRequired,
};
