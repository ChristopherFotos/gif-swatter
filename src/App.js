import Vector from './classes/Vector'
import randomRange from './helper_functions/randomRange.js'
import './App.scss';
import jonlogo from './images/logo.png'
import axios from 'axios'
import Target from './components/Target'
import ENV from './env.js'
import React, { Component } from 'react'

/* 
 score should be kept in a separate component
 use edge bounce or edge wrap algorithm to keep them from going off screen
 the speeding up big happens because of the event listener. it keeps re-calling requestanimationframe.
*/



export default class App extends Component {

  constructor(){
    super()
    this.targets = []
    this.state = { 
      ready: false,
      going: false,

    }
    this.cursor = React.createRef()
    this.cursorStlye = {
      position: 'absolute',
      top: 0,
      left: 0,
    }

    this.game = {
      score: {
        value:0,
        writeable: true
      },
      time: {
        value: 45,
        writeable: true
      }
    }
    this.timer = React.createRef()
    this.timerId = 0;
    this.step = this.step.bind(this)
  }

  componentDidMount(){

    /* the axios request will be done here, and target objects will 
    be built out of objects in the response. right now targets are 
    being built out of the objects in this.info, but that's just for 
    testing */
    window.addEventListener('click', ()=>{
      if(!this.state.going){
        console.log()

        this.start()
        this.setState(
          {
            ...this.state,
            going: true
          }
        )

        this.timerId = setInterval(()=>{
          if(this.game.time.value > 0) this.game.time.value --

          this.timer.current.innerText = this.game.time.value
          
          if(this.game.time.value === 0 && this.game.score.value < this.targets.length){
            alert('YOU LOSE!')
            this.game.score.value = 0
            this.game.time.value = 45
            this.timer.current.innerText = this.game.time.value
            clearInterval(this.timerId)

            this.setState({
              going: false,
              ready: false
            })
          }
          console.log(this.game.time.value)
        }, 1000)
      }

      

      let html = document.getElementsByTagName('html')[0]

      html.classList.add('open')
      setTimeout(()=>{html.classList.remove('open')}, 300)
    }
  )


    axios.get('https://api.giphy.com/v1/stickers/search?api_key=Mm39RQzhnAXIOTWnCgKG7fv839RUHZxS&q=insect&limit=12&offset=0&rating=g&lang=en')
        .then(res => {
          console.log("DATA", res.data.data)
          res.data.data.forEach(
            b=>{
              console.log(b.images.original.url)
              let bug = {
                x: window.innerWidth/2, 
                y: window.innerHeight/2, 
                velocity: new Vector(3,4), 
                ref:React.createRef(), 
                friction: 0.97,
                updateVector: function(){
                  this.velocity = new Vector(randomRange(-15,15),randomRange(-15,15))
                },
                sticker: b.images.original.url
              }

              console.log('BUG::', bug)

              this.targets.push(bug)
              console.log(this.targets)
              setInterval(()=>bug.updateVector(), randomRange(800, 1200))
            }
          )
          if(!this.state.ready) this.setState({ready: true})
        })
    .catch(err => console.log(err));


  }

  addToScore(){
    this.game.score.value ++
    console.log(this.game.score.value)
    if(this.game.score.value === this.targets.length){
      alert('YOU WIN!!')
      this.game.score.value = 0
      this.game.time.value = 45
      this.timer.current.innerText = this.game.time.value

      clearInterval(this.timerId)

      this.setState({
        going: false,
        ready: false
      })
    }
  }

  step(){  
    /* add velocity to position, multiply velocity by friction, adjust styles on ref */
    this.targets.forEach( t => {
      //do edgebounce/wrap here. perhaps it should be in a helper function. the current code could go in a heper, too.

        if(t.x <= 100){
          t.velocity.x *= -1
          t.velocity.y *= -1
        }
        
        if(t.x + 80 >= window.innerWidth){
          t.velocity.x *= -1
          t.velocity.y *= -1
        }

        if(t.y <= 100){

          t.velocity.x *= -1
          t.velocity.y *= -1
        }

        if(t.y + 80 >= window.innerHeight){
          t.velocity.x *= -1
          t.velocity.y *= -1
        }

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

  displayintro(){
    if(!this.state.going) return
  }

  render() {
    return (  

       <div id="id" >
          <img className='logo' src={jonlogo}></img>
          {!this.state.going && <div className = 'intro' >
            Uh oh! Jon's code is full of bugs...again. Help Jon eat all the bugs before time runs out!  
            Click to start the game.
          </div>}
         <h1 id='timer' ref={this.timer}></h1>

          {this.targets.map(t=> {
            let style = {
              position: 'absolute',
              left: t.x + 'px',
              top : t.y + 'px',
              width: '100px',
              height: '100px',
              'object-fit':'contain'
            }

            return <Target reference = {t.ref} style={style} sticker = {t.sticker} score={()=>this.addToScore()}></Target>

          }
          )}
      </div>
    );
  }
}
