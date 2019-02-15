import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      m: 15,
      n: 15,
      cellSize: 20
    }

    this.drawBoxes = this.drawBoxes.bind(this);
    this.colorCell = this.colorCell.bind(this);
    this.locate = this.locate.bind(this);
  }


  locate (x, y) {
    let newX;
    let newY;
    for(let i = 0; i < this.state.m; i++) {
      if((i*this.state.cellSize - x) < 20) {
        newX = i*this.state.cellSize + -19;
      }
    }

    for(let i = 0; i < this.state.n; i++) {
      if((i*this.state.cellSize - y) < 20) {
        newY = i*this.state.cellSize + -19;
      }
    }
    return [newX,newY]
  }

  // draw lines on canvas to represent canvas
  drawBoxes () {

    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = "black";
    for(let i = 1; i < 15; i++) {
      c.fillRect(i * 20, 0, 1, 300);
    }
    for(let i = 1; i < 15; i++) {
      c.fillRect(0, i * 20, 300, 1);
    }
  }

  colorCell (e) {
    let cords = this.locate(e.clientX, e.clientY);
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = "red";
    c.fillRect(cords[0],cords[1],19,19);
  }

  componentDidMount () {
    this.drawBoxes();
  }

  render() {
    return (
      <div style={{margin:'0px',padding:'0px'}}>
        <div style={{margin:'0px',padding:'0px'}}
          onClick={this.colorCell}
        >
          <canvas id="canvas" width="300" height="300" style={{border:'1px solid black'}}>
          </canvas>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))
