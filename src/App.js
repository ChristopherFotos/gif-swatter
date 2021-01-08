
import './App.css';
import Target from './Target'

import React, { Component } from 'react'

export default class App extends Component {

  constructor(){
    super()
    this.targets = [
      {x: 100, y: 400, velocity: {x:3, y:4}, ref:React.createRef(), friction: 0.97},
      {x: 150, y: 90 , velocity: {x:1, y:5}, ref:React.createRef(), friction: 0.97},
      {x: 400, y: 100, velocity: {x:3, y:5}, ref:React.createRef(), friction: 0.97},
      {x: 100, y: 550, velocity: {x:7, y:3}, ref:React.createRef(), friction: 0.97}
    ]
    this.step = this.step.bind(this)
  }

  step(){  
  
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
            return <Target reference = {t.ref} style={style}></Target>}
          )}
      </div>
    );
  }
}












