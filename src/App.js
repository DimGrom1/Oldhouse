import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arrowAngle:0,
      catcher:"",
      arrowTransition:1,
      boy: 1,
      degs:0,
      ghost: 1,
    }
  }
  startGame(event) {
    console.log("старт");
    let randomAngle = Math.floor(Math.random() * 6840+360);
    let transition = randomAngle/360
    
    setTimeout( () => {
      this.setState(function(state){
        let catcher = state.catcher
        if (state.degs <180){
          console.log("призрак победил");
          // ghost = 5;
          catcher = "ghost"
        }
        else{
          console.log("мальчик победил");
          // boy = 5;
          catcher = "boy"
        }
        return{
          catcher: catcher,

        }
      })
    },transition)
    event.preventDefault();
    this.setState(function(state){
      // рассчетать транзишен
      let boy = 1;
      let ghost = 1;
      let degs = randomAngle-Math.floor(randomAngle/360)*360
      console.log(degs);
      

      return {
        arrowAngle:state.arrowAngle + randomAngle,
        arrowTransition: transition,
        degs:degs
        // boy: boy,
        // ghost: ghost,
      }
    })
    

  }
  render() {
    const arrowStyle = {
      transform: "translateX(-50%) rotate(" + this.state.arrowAngle + "deg)",
      transition:  this.state.arrowTransition + "s",
    }
    const boy = {
      transform: "scale(" + this.state.boy + ") ",
    }
    const ghost = {
      transform: "scale(" + this.state.ghost + ") ",
    }
    return (
      <div className="App">
        <form action="">
          <h1>Old House</h1>
          <img style={boy} className={"boy" + (this.state.catcher == "boy"?" selectedHero":"")} src="boy.png" alt="" />
          <div className="circle">
            <img style={arrowStyle} src="arrow2.png" alt="" />
          </div>
          <img style={ghost} className={"ghost" + (this.state.catcher == "ghost"?" selectedHero":"")} src="ghost.png" alt="" />
          <button disabled = {this.state.arrowAngle==0?false:true} onClick={(event) => this.startGame(event)}>Start</button>
        </form>
      </div>
    );
  }
}

export default App;
