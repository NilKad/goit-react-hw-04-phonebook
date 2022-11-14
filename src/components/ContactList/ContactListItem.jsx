import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactListItem = ({ element, children }) => {
  const { name, number } = element;
  return (
    <li className={css.item}>
      {name}: {number}
      {children}
    </li>
  );
};

ContactListItem.propTypes = {
  element: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
