import React, { Component } from 'react'

export default class Target extends Component {
    constructor(props){
        super()
        this.state = {
            style: {
                ...props.style,
                display: 'block'
            }
        }   
    }

    die(){
        this.setState(
            {style: {
                ...this.state.style,
                display: 'none'
            }}
        )
    }
    
    render() {
        return (
            <h1 style = {this.state.style} ref={this.props.reference} onClick={()=>this.die()}>HELLO</h1>
         )
    }
}


