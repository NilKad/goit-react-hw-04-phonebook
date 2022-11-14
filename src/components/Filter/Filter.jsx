import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ onInputHandle, filterValue, clearFilter }) => {
  const onKeyDown = e => {
    e.key === 'Escape' && clearFilter();
  };

  return (
    <input
      type="text"
      name="filter"
      className={css.input}
      onInput={onInputHandle}
      onKeyDown={onKeyDown}
      value={filterValue}
    />
  );
};

Filter.propTypes = {
  onInputHandle: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};
