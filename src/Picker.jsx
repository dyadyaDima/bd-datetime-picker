import React, {Component} from 'react';
import classNames from 'classnames/bind';
import blacklist from 'blacklist';

import Calendar from './panels/Calendar.jsx';

class Picker extends Component {

  render() {
    const {
      isOpen = true,
    } = this.props;

    const className = classNames('datetime-picker', this.props.className);
    const props = blacklist(this.props, 'className', 'splitPanel', 'isOpen');

    console.log(this.props); // eslint-disable-line

    return (
      <div ref={this.props.ref || null} className={className} style={{display: isOpen ? 'block' : 'none'}} onClick={(evt) => evt.stopPropagation()}>
        <Calendar {...props} isOpen={isOpen} />
      </div>
    );
  }
}


export default Picker;
