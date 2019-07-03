import React, {Component} from 'react';
//import moment from 'moment';
const _moment = require('moment');

import Day from './Day.jsx';
import Month from './Month.jsx';
import Year from './Year.jsx';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: this.getCurrentMoment(props),
      panel: props.minPanel || 'day'
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: this.getCurrentMoment(props)
    });

    if (!props.isOpen) {
      this.setState({
        panel: props.minPanel || 'day'
      });
    }
  }

  getCurrentMoment = (props) => {
    const {range, rangeAt} = props;
    const now = this.state ? this.state.moment || _moment() : _moment();
    let result = props.moment;

    if (result) {
      if (range) {
        result = result[rangeAt] || now;
      }
    } else {
      result = now;
    }

    return result;
  }

  handleSelect = (selected) => {
    const {panel} = this.state;
    const {onChange, range, rangeAt, minPanel} = this.props;

    let _selected = this.props.moment;
    let shouldChange = panel === minPanel;

    if (_selected && !shouldChange) {
      if (range) {
        shouldChange = rangeAt === 'start' ? _selected.start : _selected.end;
      } else {
        shouldChange = true;
      }
    }

    if (range) {
      const copyed = _selected ? {..._selected} : {};

      copyed[rangeAt] = selected;
      _selected = copyed;
    } else {
      _selected = selected;
    }

    this.changePanel((panel !== 'time' ? 'day' : 'time'), selected);

    if (shouldChange) {
      onChange && onChange(_selected, panel);
    }
  }

  changePanel = (panel, moment = this.state.moment) => {
    this.setState({
      moment,
      panel
    });
  }

  openDay = () => this.setState({ panel: 'day' });
  openMonth = () => this.setState({ panel: 'month' });
  openYear = () => this.setState({ panel: 'year' });

  prevMonth = () => {
    const _moment = this.state.moment.clone();
    this.props.onChange(_moment.subtract(1, 'month'));
  }

  nextMonth = () => {
    const _moment = this.state.moment.clone();
    this.props.onChange(_moment.add(1, 'month'));
  }

  prevYear = () => {
    const _moment = this.props.moment.clone();
    this.props.onChange(_moment.subtract(1, 'year'));
  }

  nextYear = () => {
    const _moment = this.state.moment.clone();
    this.props.onChange(_moment.add(1, 'year'));
  }

  render() {
    // const {moment} = this.state;
    const {
      moment, weeks, months, dayFormat, locale = 'en',
      style, maxDate, minDate, dateLimit, range, rangeAt,
      timePanel = false
    } = this.props;

    _moment.locale(locale);
    moment.locale(locale);

    const monthsOfYear = _moment.monthsShort();
    const weeksOfYear = _moment.weekdaysMin(true);
    const monthStarts = Math.abs(_moment.localeData(locale).firstDayOfWeek() - 1);

    const props = {
      moment,
      selected: this.props.moment,
      onSelect: this.handleSelect,
      changePanel: this.changePanel,
      weeks,
      months,
      dayFormat,
      maxDate,
      minDate,
      dateLimit,
      range,
      rangeAt,
      timePanel
    };

    const {panel} = this.state;

    return (
      <div style={style}>
        <div className="calendar">
          <div className="calendar-days" style={style}>
            <div className="calendar-nav">
              <div className="control">
                <button type="button" className="arrow prev" onClick={this.prevYear} />
                <span className="current-date" onClick={panel === 'year' ? this.openDay : this.openYear}>{moment.format('YYYY')}</span>
                <button type="button" className="arrow next" onClick={this.nextYear} />
              </div>
              <div className="control">
                <button type="button" className="arrow prev" onClick={this.prevMonth} />
                <span className="current-date" onClick={panel === 'month' ? this.openDay : this.openMonth}>{moment.format('MMMM')}</span>
                <button type="button" className="arrow next" onClick={this.nextMonth} />
              </div>
            </div>

            { panel === 'day' && <Day {...props} weeksOfYear={weeksOfYear} monthStarts={monthStarts} /> }
            { panel === 'month' && <Month {...props} monthsOfYear={monthsOfYear} /> }
            { panel === 'year' && <Year {...props} /> }

          </div>
        </div>
      </div>
    );
  }
}


export default Calendar;
