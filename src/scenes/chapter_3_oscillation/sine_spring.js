const PERIOD = 120
const INITIAL_AMPLITUDE = 100
const CIRCLE_SIZE = 30
const ELASTIC_WIDTH = 5

export default class SineSpring {

    setup() {
        this.center = window.canvasCenter
        this.amplitude = INITIAL_AMPLITUDE
    }

    draw() {
        clear()
        background(220)

        let y = this.amplitude * Math.sin(TWO_PI * frameCount / PERIOD)
        const lowerBound = this.center.y + this.amplitude
        const upperBound = this.center.y - this.amplitude
        
        // Map breaks when mapping 0
        y = this.amplitude > 0
            ? map(y, -this.amplitude, this.amplitude, lowerBound, upperBound)
            : this.center.y

        push()
        noStroke()
        fill(150)
        rect(this.center.x - ELASTIC_WIDTH / 2, 0, ELASTIC_WIDTH, y)
        fill(100)
        circle(this.center.x, y, CIRCLE_SIZE)
        pop()

        this.amplitude = this.amplitude > 0 ? this.amplitude - 0.1 : 0
    }

}