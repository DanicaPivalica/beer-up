import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = { isVisible: false || !props.isNotVisible };
  }

  handleMouseLeave() {
    clearTimeout(this.timer);
    this.setState({
      isVisible: false,
    });
  }

  handleMouseEnter() {
    this.timer = setTimeout(() => {
      this.setState({
        isVisible: true,
      });
    }, this.props.delayTime);
  }

  render() {
    const isVisible = this.state.isVisible ? '--visible' : '--hidden';
    const className = `tooltip${isVisible}`;

    return (
      <div
        className={className}
        onMouseEnter={this.props.isHovered ? this.handleMouseEnter : undefined}
        onMouseLeave={this.props.isHovered ? this.handleMouseLeave : undefined}
      >
        <span className="tooltip-label">{this.props.label}</span>
        {this.props.children}
      </div>
    );
  }
}

Tooltip.propTypes = {
  label: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  isHovered: PropTypes.bool,
  isNotVisible: PropTypes.bool,
  delayTime: PropTypes.number,
};

Tooltip.defaultProps = {
  label: 'I\'m a demo label woo hoo!',
  delayTime: 500,
  isHovered: true,
  isNotVisible: true,
};

export default Tooltip;
