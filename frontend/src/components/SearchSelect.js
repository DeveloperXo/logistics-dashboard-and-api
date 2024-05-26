import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CInputGroup, CInputGroupText } from "@coreui/react";
import { cilChevronBottom } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const SearchSelect = ({
  id,
  label,
  placeholder,
  searchPlaceholder,
  name,
  value,
  options,
  onChange,
  onChangeSearch,
  required,
}) => {
  const [localValue, setLocalValue] = useState(value || '');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleItemClick = (_value) => {
    setLocalValue(_value);
    setToggle(false);
    onChange({ target: { name, value: _value } });
  };

  const toggleSearch = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <div className="search-select-wrap">
      <div className="search-select-display-wrap">
        <div className="search-select-display">
          {label && <label className="form-label" htmlFor={id}>{label}</label>}
          <br />
          <CInputGroup onClick={toggleSearch}>
            <input
              className="form-control"
              type="text"
              placeholder={placeholder}
              name={name}
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              id={id}
              required={required}
              readOnly
            />
            <CInputGroupText>
              <CIcon icon={cilChevronBottom} />
            </CInputGroupText>
          </CInputGroup>
        </div>
        {toggle && (
          <div className="search-select-toggle">
            <div className="search-input">
              <input
                className="form-control"
                placeholder={searchPlaceholder}
                type="text"
                onChange={onChangeSearch}
                id={`${id}-search`}
              />
            </div>
            <div className="select-search-options">
              <ul>
                {options.map((elem, key) => (
                  <li key={key} onClick={() => handleItemClick(elem.value)}>
                    {elem.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SearchSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeSearch: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default SearchSelect;
