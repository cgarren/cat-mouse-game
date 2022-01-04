import React from 'react';
import { Space, Button, DatePicker } from 'antd';

function DateButton(props) {
  const text = props.theDate
  return <Button type="primary" onClick={props.handler}>Confirm {text}</Button>
}

class DateController extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {theDate: ""};
  }

  handleDateChange(date, dateString) {
    //console.log(dateString);
    this.setState({theDate: dateString});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (this.state.theDate === "") {
      button = <div />
    } else {
      console.log("Rendering datebutton");
      button = <DateButton theDate={this.state.theDate} handler={this.props.handler}/>
    }

    return (
      <div>
        <Space direction="vertical">
          <DatePicker onChange={this.handleDateChange}/>
          {button}
        </Space>
      </div>
    );
  }
}

export default DateController;