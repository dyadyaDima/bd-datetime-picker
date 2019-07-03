import React, {Component} from 'react';
import {render} from 'react-dom';
import moment from 'moment';

import {DatetimePicker, DatetimePickerTrigger} from '../src';
import './app.less';


class InlinePicker extends Component {
  constructor() {
    super();
    this.state = {
      moment: moment()
    };
  }

  handleChange = (moment) => {
    this.setState({
      moment
    });
  }

  render() {
    const {moment} = this.state;

    return (
      <div>
        <span className="text">Datetime: {moment.format('YYYY/MM/DD HH:mm')}</span>
        <DatetimePicker
          moment={moment}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class PopupPicker extends Component {
  constructor(props) {
    super(props);

    const datetime = props.value ? moment(props.value): moment();
    const format = props.format || 'YYYY/MM/DD HH:mm';
    const value = props.value ? datetime.format(format) : '';

    this.state = {
      datetime,
      value,
      format,
    };
  }

  handleChange = (moment) => {
    this.setState({
      datetime: moment,
      value: moment.format(this.state.format),
    });
  }

  render() {
    const {datetime, value} = this.state;

    return (
      <DatetimePickerTrigger
        locale="ru"
        timePanel
        moment={datetime}
        onChange={this.handleChange}
      >
        <input type="text" value={value} readOnly />
      </DatetimePickerTrigger>
    );
  }
}

render(
  <InlinePicker />,
  document.getElementById('inline-picker')
);

render(
  <PopupPicker />,
  document.getElementById('popup-picker')
);

