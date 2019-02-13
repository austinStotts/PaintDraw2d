import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class App extends PureComponent {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>hello</h1>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))
