import { useState } from "react";
import { CInputGroup, CInputGroupText } from "@coreui/react";
import { cilChevronBottom } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const SearchSelect = (props) => {
    const [value, setValue] = useState(props.value || '');
    const [toggle, setToggle] = useState('d-none');

    const handleItemClick = (_value) => {
        setValue(_value);
        setToggle('d-none');
    }

    const toggleSearch = () => {
        setToggle(toggle == 'd-none' ? '' : 'd-none');
    }
    return (
        <div className="search-select-wrap">
            <div className="search-select-display-wrap">
                <div className="search-select-display">
                    { props.label ? <label className="form-label" htmlFor={ props.id }>{ props.label }</label> : '' } <br />
                    <CInputGroup onClick={toggleSearch} >
                        <input className="form-control" type="text" placeholder={ props.placeholder } name={ props.name } value={value} onChange={(e) => setValue(e.target.value)} id={ props.id } required={ props.required ? true : false } readOnly />
                        <CInputGroupText id="basic-addon1"><CIcon icon={cilChevronBottom}/></CInputGroupText>
                    </CInputGroup>
                </div>
                <div className={`search-select-toggle ${toggle}`}>
                    <div className="search-input">
                        <input className="form-control" type="text" onChange={ props.onChangeSearch } id={ `${props.id}-search` }/>
                    </div>
                    <div className="select-search-options">
                        <ul>
                            { props.options?.map((elem, key) => (
                                <li key={key} onClick={() => handleItemClick(elem.value)}>{ elem.label }</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchSelect;