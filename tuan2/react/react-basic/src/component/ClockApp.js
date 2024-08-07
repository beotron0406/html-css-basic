// File: ClockApp.js
import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    console.log("Constructor: Khởi tạo component");
  }

  componentDidMount() {
    console.log("componentDidMount: Component đã được render vào DOM");
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate: Component đã được cập nhật");
    console.log("Thời gian trước đó:", prevState.date.toLocaleTimeString());
    console.log("Thời gian hiện tại:", this.state.date.toLocaleTimeString());
  }

  componentWillUnmount() {
    console.log("componentWillUnmount: Component sắp bị gỡ bỏ khỏi DOM");
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    console.log("Render: Component đang được render");
    return (
      <div>
        <h2>Bây giờ là: {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

class AppClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showClock: true };
  }

  toggleClock = () => {
    this.setState((prevState) => ({ showClock: !prevState.showClock }));
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleClock}>
          {this.state.showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
        </button>
        {this.state.showClock && <Clock />}
      </div>
    );
  }
}

export default AppClock;
