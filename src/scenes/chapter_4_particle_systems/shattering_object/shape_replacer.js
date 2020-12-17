import SolidShape from './solid_shape'
import ShatteredShape from './shattered_shape'

export default class ShapeReplacer {

    constructor(position, size, color) {
        this.position = position
        this.size = size
        this.color = color

        this.instance = new SolidShape(this.position, this.size, this.color)
        this.instance.onShatter(this.replace.bind(this))
    }

    replace() {
        this.instance.unsubscribe(this.replace.bind(this))
        this.instance = new ShatteredShape(this.position, this.size, this.color, this.instance.angle)
    }

    update() {
        this.instance.update()
    }

    display() {
        this.instance.display()
    }

    applyAngularForce(force) {
        if (this.instance.applyAngularForce)
            this.instance.applyAngularForce(force)
    }

    applyForce(force) {
        this.instance.applyForce(force)
    }

    isDead() {
        if (this.instance.isDead)
            return this.instance.isDead()
        else
            return false
    }

}