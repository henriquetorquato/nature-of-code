export default class Pendulum {

    angularVelocity = 0
    angularAcceleration = 0
    position = null

    constructor(origin, length, size, angle = 1) {
        this.origin = origin
        this.length = length
        this.size = size
        this.angle = angle
    }

    update(gravity = 1) {
        this.angularAcceleration = (-1 * gravity / this.length) * Math.sin(this.angle)
        this.angularVelocity += this.angularAcceleration
        this.angle += this.angularVelocity

        const x = this.length * Math.sin(this.angle)
        const y = this.length * Math.cos(this.angle)
        this.position = createVector(x, y)
        this.position.add(this.origin)
    }

}