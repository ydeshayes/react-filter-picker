import React from 'react';
import PropTypes from 'prop-types';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      value: {}
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.emptyInputText = this.emptyInputText.bind(this);
  }

  onSearchChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  onInputValueChange(e) {
    this.setState({
      value: {
        value: e.target.value,
        label: e.target.value
      }
    });
  }

  emptyInputText() {
    this.setState({
      value: {
        value: '',
        label: ''
      }
    });
  }

  onClick(e, value) {
    e.stopPropagation();
    e.preventDefault();

    this.props.onChange(value);
  }

  render() {
    const {
      values = [],
      typeaHead = false,
      onChange,
      open,
      style,
      itemStyle
    } = this.props;
    const { search } = this.state;

    let filteredValues = [...values];

    if (typeaHead) {
      filteredValues = filteredValues.filter(v => v.label === search);
    }

    return (
      <div
        className={`dropdown__menu ${open && 'dropdown__menu--open'}`}
        style={style}
      >
        {filteredValues
          && !!filteredValues.length
          && typeaHead && (
            <input type='text' onChange={this.onSearchChange} value={search} />
          )}
        {filteredValues.map(value => (
          <a
            key={value.label}
            className='dropdown__menu__list_item'
            style={itemStyle}
            onClick={e => this.onClick(e, value)}
          >
            {value.label}
          </a>
        ))}
        {(!filteredValues || !filteredValues.length) && (
          <div className='dropdown__menu__input'>
            <input
              value={this.state.value.value}
              onInput={this.onInputValueChange}
              type='text'
              onClick={e => e.stopPropagation()}
            />
            <div
              className='widget__dropdown__menu__input__button'
              onClick={e => {
                e.stopPropagation();
                onChange(this.state.value);
                this.emptyInputText();
              }}
            >
              Ok
            </div>
          </div>
        )}
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  values: PropTypes.array,
  typeaHead: PropTypes.bool,
  open: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
  itemStyle: PropTypes.object
};

export default DropdownMenu;
