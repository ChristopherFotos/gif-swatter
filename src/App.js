import Vector from './classes/Vector'
import './App.css';
import Target from './Target'

import React, { Component } from 'react'

export default class App extends Component {

  constructor(){
    super()
    this.targets = []
    this.state = { ready: false }
    this.info = [
      {x: 100, y: 400, velocity: new Vector(3,4), ref:React.createRef(), friction: 0.97},
      {x: 150, y: 90 , velocity: new Vector(1,5), ref:React.createRef(), friction: 0.97},
      {x: 400, y: 100, velocity: new Vector(3,5), ref:React.createRef(), friction: 0.97},
      {x: 100, y: 550, velocity: new Vector(7,3), ref:React.createRef(), friction: 0.97}
    ]

    this.step = this.step.bind(this)
  }

  componentDidMount(){

    /* the axios request will be done here, and target objects will 
    be built out of objects in the response. right now targets are 
    being built out of the objects in this.info, but that's just for 
    testing */

    this.info.forEach(
      t=>{this.targets.push(t)}
    )
    if(!this.state.ready) this.setState({ready: true})
  }

  step(){  
    /* add velocity to position, multiply velocity by friction, adjust styles on ref */
    this.targets.forEach( t => {
        t.x += t.velocity.x
        t.y += t.velocity.y

        t.velocity.x *= t.friction
        t.velocity.y *= t.friction

        if(t.ref.current){
          t.ref.current.style.left = t.x + 'px'
          t.ref.current.style.top  = t.y + 'px'
        }
      }
    )

    requestAnimationFrame(()=>this.step())
  }

  start(){
    let bound = this.step.bind(this)
    requestAnimationFrame(bound)
  }


  render() {

    window.addEventListener('click', ()=>{this.start()})

    return (  
       <div id="id">
          {this.targets.map(t=> {
            let style = {
              position: 'absolute',
              left: t.x + 'px',
              top : t.y + 'px'
            }
            return <Target die = {this.die} reference = {t.ref} style={style}></Target>}
          )}
      </div>
    );
  }
}












