/* eslint jsx-a11y/label-has-for:0 */
import React from 'react';

import PropTypes from 'prop-types';
import { Radio, RadioGroup } from 'react-form';
import './index.scss';

// Normally this is a shared component but since the
// features are limited it's placed here.
class Radios extends React.Component {
  render() {
    return (
      <div className="radioGroup">
        <RadioGroup field={this.props.field}>
          {
              this.props.values.map(item => (
                <div key={item.id}>
                  <Radio value={item.value} id={item.id} />
                  <label htmlFor={item.id} className="mr-2">{item.labelText}</label>
                </div>
              ))
          }
        </RadioGroup>
      </div>
    );
  }
}

Radios.propTypes = {
  values: PropTypes.shape({
    labelText: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  field: PropTypes.string.isRequired,
};

export default Radios;
