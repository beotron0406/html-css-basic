import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  incrementCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Số lần đếm: {this.state.count}</p>
        <button onClick={this.incrementCount}>Tăng</button>
      </div>
    );
  }
}

export default Counter;
