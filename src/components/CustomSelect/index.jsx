import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { OptionItem, OptionsList, SelectButton, SelectContainer } from './styles';

const CustomSelect = ({ options, value, onChange, ariaLabel, searchFilter }) => {
  const [ open, setOpen ] = useState(false);
  const containerRef = useRef(null);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <SelectContainer ref={containerRef} searchFilter={searchFilter}>
      <SelectButton
        type='button'
        searchFilter={searchFilter}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(prev => !prev);
        }}
        open={open}
        aria-label={ariaLabel}
      >
        {selectedOption ? selectedOption.label : 'Selecione'}
      </SelectButton>
      {open && (
        <OptionsList>
          {options.map((opt) => (
            <OptionItem key={opt.value} onClick={() => handleSelect(opt.value)} searchFilter={searchFilter}>
              {opt.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  searchFilter: PropTypes.bool,
};

export default CustomSelect;