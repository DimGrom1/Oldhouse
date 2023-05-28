import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arrowAngle: 0,
      catcher: "",
      arrowTransition: 1,
      boy: 1,
      degs: 0,
      ghost: 1,
      firstFormClass: "",
      gameHeight: window.innerHeight - 50,
      canvas: "",
      ctx: "",
      timer: 10,
      boyStyle: {
        left: 2,
        top:2,
      },
      ghostStyle:{
        left: 2,
        top:2,
      },
    }
    this.gameInterval = "";
  }
  startGame(event) {
    console.log("старт");
    let randomAngle = Math.floor(Math.random() * 6840 + 360);
    let transition = randomAngle / 360
    console.log(transition);

    setTimeout(() => {
      this.setState(function (state) {
        let catcher = state.catcher
        if (state.degs < 180) {
          console.log("призрак победил");
          // ghost = 5;
          catcher = "ghost"
        }
        else {
          console.log("мальчик победил");
          // boy = 5;
          catcher = "boy"
        }

        return {
          catcher: catcher,

        }
      })
    }, transition * 1000)
    setTimeout(() => {
      this.setState({
        firstFormClass: "hideForm",

      })
    }, transition * 1000 + 3000)
    event.preventDefault();
    this.setState(function (state) {
      // рассчетать транзишен
      let boy = 1;
      let ghost = 1;
      let degs = randomAngle - Math.floor(randomAngle / 360) * 360
      console.log(degs);


      return {
        arrowAngle: state.arrowAngle + randomAngle,
        arrowTransition: transition,
        degs: degs
        // boy: boy,
        // ghost: ghost,
      }
    })


  }
  mazeLoad() {
    let canvas = document.getElementsByTagName("canvas")[0]
    let ctx = canvas.getContext("2d");
    let gameForm = document.getElementById("gameForm")
    let img = document.getElementById("mazeImage")
    gameForm.style.height = this.state.gameHeight + "px"
    gameForm.style.width = this.state.gameHeight + "px"
    canvas.width = this.state.gameHeight
    canvas.height = this.state.gameHeight
    this.setState({
      canvas: canvas,
      ctx: ctx,
    })
    ctx.drawImage(img, 0, 0, this.state.gameHeight, this.state.gameHeight)

  }
  timer() {
    // timer= timer + 1
    this.gameInterval = setInterval(() => {
      console.log(91);
      this.setState((state) => {
        return {
          timer: state.timer - 1,

        }

      }, () => {
        if (this.state.timer == 0) {
          clearInterval(this.gameInterval)
        }
      })

    }, 1000)
  }
  componentDidMount() {
    this.timer()
  }
  render() {
    const arrowStyle = {
      transform: "translateX(-50%) rotate(" + this.state.arrowAngle + "deg)",
      transition: this.state.arrowTransition + "s",
    }
    const boy = {
      transform: "scale(" + this.state.boy + ") ",
    }
    const ghost = {
      transform: "scale(" + this.state.ghost + ") ",
    }
    const boyStyle = {
        top:this.state.boyStyle.top + "%",
        left:this.state.boyStyle.left + "%",
    }
    const ghostStyle = {
      top:this.state.boyStyle.top + "%",
      left:this.state.boyStyle.left + "%",
  }

    return (
      <div className="App">
        <form className={this.state.firstFormClass} style={{ display: "none" }} action="">
          <h1>Old House</h1>
          <img style={boy} className={"boy" + (this.state.catcher == "boy" ? " selectedHero" : "")} src="boy.png" alt="" />
          <div className="circle">
            <img style={arrowStyle} src="arrow2.png" alt="" />
          </div>
          <img style={ghost} className={"ghost" + (this.state.catcher == "ghost" ? " selectedHero" : "")} src="ghost.png" alt="" />
          <button disabled={this.state.arrowAngle == 0 ? false : true} onClick={(event) => this.startGame(event)}>Start</button>
        </form>
        <form action="" id="gameForm">
          <div>
            <h1 className="timer" >time: {this.state.timer}</h1>
            <img style={boyStyle} id="boy" src="boy.png" alt="" />
            <img style={ghostStyle} id="ghost" src="ghost.png" alt="" />
          </div>
          <canvas></canvas>
          <img src="maze.png" alt="" onLoad={() => this.mazeLoad()} id="mazeImage" />
          <img src="boy.png" alt="" />
          <img src="ghost.png" alt="" />
        </form>
      </div>
    );
  }
}

export default App;
