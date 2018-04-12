/* eslint jsx-a11y/label-has-for:0 */
import React from 'react';

import PropTypes from 'prop-types';
import { Text, TextArea } from 'react-form';
import { Tooltip } from '../../../../components';
import './index.scss';

// Normally this is a shared component but since the
// features are limited it's placed here.
class InputGroup extends React.Component {
  render() {
    let content = (<Text className={`inputGroup__input${this.props.error ? '--error' : ''}`}
      field={this.props.field}
      id={this.props.id}
    />);
    if (!this.props.isSmall) {
      content = (<TextArea
        className={`inputGroup__input--big${this.props.error ? '--error' : ''}`}
        field={this.props.field}
        id={this.props.id}
      />);
    }
    return (
      <div className={`inputGroup${this.props.error ? '--error' : ''}`}>
        {
          this.props.error &&
            <Tooltip isHovered={false} isNotVisible={!this.props.error} label={this.props.error}>
              {content}
            </Tooltip>
        }
        {
          !this.props.error &&
          content
        }
        <label htmlFor={this.props.field} className="inputGroup__label">{this.props.labelText}</label>
      </div>
    );
  }
}

InputGroup.propTypes = {
  labelText: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isSmall: PropTypes.bool,
  error: PropTypes.string,
};

InputGroup.defaultProps = {
  isSmall: true,
  error: undefined,
};

export default InputGroup;
