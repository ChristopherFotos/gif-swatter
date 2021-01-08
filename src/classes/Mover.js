import Vector from './Vector'

export default class Mover {
    constructor(x, y, velocity, friction, ref){
        this.x = x;
        this.y = y
        this.velocity = new Vector(velocity.x, velocity.y)
        this.friction = friction
        this.ref = ref
    }

    update(){
        this.x += this.velocity.x
        this.y += this.velocity.y

        this.velocity.x *= this.friction
        this.velocity.y *= this.friction

        if(this.ref.current){
            this.ref.currenthis.style.left = this.x + 'px'
            this.ref.current.style.top  = this.y + 'px'
        }
    }
}