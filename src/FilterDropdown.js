import React from 'react';
import PropTypes from 'prop-types';

import DropdownMenu from './DropdownMenu';

class FilterDropdown extends React.Component {
  render() {
    const {
      categories,
      onSelectCategory,
      values,
      onSelectValue,
      currentStep,
      open,
      category
    } = this.props;
    let onChange = onSelectCategory;
    let valuesProp = categories;

    if (currentStep === 1) {
      onChange = onSelectValue;
      valuesProp = values;
    }

    let props = {
      onChange,
      values: valuesProp,
      open
    };

    if (!category && !open) {
      return false;
    }

    return (
      <div>
        <div className='filter_dropdown'>
          <div>
            {category && `${category}`}
            {open && ':'}
          </div>
          <DropdownMenu {...props} />
        </div>
      </div>
    );
  }
}

FilterDropdown.propTypes = {
  categories: PropTypes.array,
  onSelectCategory: PropTypes.func,
  values: PropTypes.array,
  onSelectValue: PropTypes.func,
  currentStep: PropTypes.string,
  open: PropTypes.bool,
  category: PropTypes.string
};

export default FilterDropdown;
