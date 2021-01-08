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

        this.props.score()
    }
    
    render() {
        console.log('PROPS ::::: ',this.props.sticker);
        return (
            <img src = {this.props.sticker} style = {this.state.style} ref={this.props.reference} onClick={()=>this.die()}></img>
         )
    }
}


