import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      paint: false,
      color: "orange",
      m: 15,
      n: 15,
      cellSize: 20,
      canvasWidth: 300,
      canvasHeight: 300,
      matrix: '',
    }

    this.drawBoxes = this.drawBoxes.bind(this);
    this.colorCell = this.colorCell.bind(this);
    this.locate = this.locate.bind(this);
    this.paintWhite = this.paintWhite.bind(this);
    this.doubleClick = this.doubleClick.bind(this);
    this.turnOn = this.turnOn.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.paint= this.paint.bind(this);
    this.createMatrix = this.createMatrix.bind(this);
    this.updateMatrix = this.updateMatrix.bind(this);
  }






  createMatrix (x, y) {
    let array = new Array(y).fill(0);
    let matrix = new Array(x).fill(array);
    this.setState({ matrix });
  }


  updateMatrix (y, x) {
    console.log('y ->', y, '\nx ->', x);
    this.state.matrix[y][x] = this.state.color;
    console.log(this.state.matrix);
  }










  locate (x, y) {
    let newX;
    let newY;
    for(let i = 0; i < this.state.m + 1; i++) {
      if((i*this.state.cellSize - x) < 20) {
        newX = i*this.state.cellSize + -19;
      }
    }

    for(let i = 0; i < this.state.n + 1; i++) {
      if((i*this.state.cellSize - y) < 20) {
        newY = i*this.state.cellSize + -19;
      }
    }

    if(newX === 1) newX = 0;
    if(newY === 1) newY = 0;
    this.updateMatrix(Math.floor(newY / this.state.cellSize), Math.floor(newX / this.state.cellSize));
    return [newX,newY]
  }







  paintWhite () {
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = "white";
    c.fillRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
    this.drawBoxes();
  }

  // draw lines on canvas to represent canvas
  drawBoxes () {
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = "black";
    for(let i = 1; i < this.state.m; i++) {
      c.fillRect(i * 20, 0, 1, this.state.canvasHeight);
    }
    for(let i = 1; i < this.state.n; i++) {
      c.fillRect(0, i * 20, this.state.canvasWidth, 1);
    }
  }

  paint (e) {
    if(this.state.paint) this.colorCell(e);
  }

  colorCell (e) {
    let cords = this.locate(e.clientX, e.clientY);
    let xW = 19;
    let yW = 19;
    if(cords[0] === 0) xW = 20;
    if(cords[1] === 0) yW = 20;
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = this.state.color;
    c.fillRect(cords[0],cords[1],xW,yW);
  }

  doubleClick (e) {
    let cords = this.locate(e.clientX, e.clientY);
    let xW = 19;
    let yW = 19;
    if(cords[0] === 0) xW = 20;
    if(cords[1] === 0) yW = 20;
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = "white";
    c.fillRect(cords[0],cords[1],xW,yW);
  }

  turnOn () {
    this.setState({paint:true});
  }

  turnOff () {
    this.setState({paint:false});
  }

  componentDidMount () {
    this.paintWhite();
    this.createMatrix(this.state.m, this.state.n);
  }

  render() {
    return (
      <div style={{margin:'0px',padding:'0px'}}>
        <div style={{margin:'0px',padding:'0px'}}
          onMouseDown={this.turnOn}
          onClick={this.colorCell}
          onDoubleClick={this.doubleClick}
          onMouseUp={this.turnOff}
          onMouseMove={this.paint}
        >
          <canvas id="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight} style={{border:'1px solid black'}}></canvas>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))
