import React from 'react';
import PropTypes from 'prop-types';

import FilterDropdown from './FilterDropdown';

class FilterSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [{}],
      editedFilterIndex: 0,
      currentStep: 0,
      isMenuOpen: false
    };

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.editTag = this.editTag.bind(this);
  }

  componentDidMount() {
    /* document.addEventListener('click', () => {
      this.setState({
        editedFilterIndex: -1,
        isMenuOpen: false
      });
    });*/
  }

  editTag(e, editedFilterIndex) {
    e.stopPropagation();

    this.setState({
      editedFilterIndex,
      isMenuOpen: true
    });
  }

  onAddButtonClick(e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      editedFilterIndex: this.state.filters.length - 1,
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  onCategorySelect(category, index) {
    this.setState(prevState => {
      const newState = prevState;

      if (newState.filters.lenght - 1 < index) {
        newState.filters.push({
          category
        });

        return newState;
      }

      newState.filters[index].category = category;

      newState.currentStep = 1;
      return newState;
    });
  }

  onValueSelect(value, index) {
    this.setState(prevState => {
      const newState = prevState;

      if (newState.filters.lenght - 1 < index) {
        newState.filters.push({
          value
        });

        return newState;
      }

      newState.filters[index].value = value;

      newState.editedFilterIndex = newState.filters.length;
      newState.currentStep = 0;
      newState.isMenuOpen = false;

      if (!newState.filters[index + 1]) {
        newState.filters[index + 1] = {};
      }

      this.props.onChange(newState.filters);

      return newState;
    });
  }

  removeFilter(e, index) {
    e.stopPropagation();
    e.preventDefault();

    this.setState(prevState => {
      const newState = prevState;

      newState.filters.splice(index, 1);
      if (!newState.filters.lenght) {
        newState.filters.push({});
      }
      this.props.onChange(newState.filters);
      return newState;
    });
  }

  render() {
    const { categories, values } = this.props;
    const { filters, editedFilterIndex, currentStep, isMenuOpen } = this.state;

    return (
      <div className='filter_selector'>
        {filters.map(
          (filter, index) =>
            editedFilterIndex === index ? (
              <FilterDropdown
                open={isMenuOpen}
                category={filter.category && filter.category.label}
                currentStep={currentStep}
                categories={categories}
                values={filter.category && values[filter.category.value]}
                onSelectCategory={c => this.onCategorySelect(c, index)}
                onSelectValue={v => this.onValueSelect(v, index)}
              />
            ) : (
              filter.category
              && filter.value && (
                <div
                  className='filter_tag'
                  onClick={e => this.editTag(e, index)}
                >
                  <span>
                    {filter.category.label} :{' '}
                    {filter.value.label && filter.value.label.length > 10
                      ? `${filter.value.label.substring(0, 10)}...`
                      : filter.value.label}
                  </span>
                  <div
                    className='filter_tag__close_btn'
                    onClick={e => this.removeFilter(e, index)}
                  >
                    x
                  </div>
                </div>
              )
            )
        )}
        <div className='filter_add_button' onClick={this.onAddButtonClick}>
          +
        </div>
      </div>
    );
  }
}

FilterSelector.propTypes = {
  categories: PropTypes.array,
  values: PropTypes.array,
  onChange: PropTypes.func
};

export default FilterSelector;
