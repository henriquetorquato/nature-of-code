export default class Slithering {

    angle = 0

    constructor(genes) {
        this.amplitude = genes.length / 2
        this.length = genes.length
        this.angleVelocity = genes.maxVelocity / 20

        this.circleSize = genes.size
        this.circleDistance = Math.floor(genes.size / 2)
        this.circleAngleVelocity = this.angleVelocity / 2
    }

    update() {
        this.angle += this.angleVelocity
    }

    display() {
        for (let x = 0; x <= this.length; x += this.circleDistance)
        {
            const amplitude = this.amplitude * this.amplitudeScaleFunction(x)
            const angle = this.angle + (x * this.circleAngleVelocity)
            const y = map(Math.sin(angle), -1, 1, -amplitude, amplitude)

            circle(x, y, this.circleSize)
        }
    }

    amplitudeScaleFunction(x) {
        const normalX = map(x, 0, this.length, 0, 1)
        return -Math.pow(normalX, 2) + normalX
    }

}