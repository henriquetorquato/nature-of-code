export default class Oscillator {

    constructor(angle, amplitude) {
        this.angle = angle
        this.amplitude = amplitude
        this.velocity = createVector(0, 0)
    }

    oscillate() {
        this.angle.add(this.velocity)
    }

    oscillation() {
        const x = Math.sin(this.angle.x) * this.amplitude.x
        const y = Math.sin(this.angle.y) * this.amplitude.y
        return createVector(x, y)
    }

}