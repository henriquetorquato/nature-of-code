const MAX_SPLATTER_SIZE = 2000
const MIN_SPLATTER_SIZE = 1000
const SPLATTER_POSITION_DEVIATION = 200

export default class PaintSplatter {

    setup() {
        const amount = Math.randomBetween(2, 5)
        const splatters = []

        for (let i = 0; i < amount; i++) {
            const center = this.getRandomGaussianPosition(window.center, SPLATTER_POSITION_DEVIATION)
            const size = Math.randomBetween(MAX_SPLATTER_SIZE, MIN_SPLATTER_SIZE)

            const dots = []
            for (let d = 0; d < size; d++) {
                dots.push(
                    this.getRandomGaussianPosition(center, 40))
            }

            splatters.push({
                dots: dots,
                color: Math.randomColor()
            })
        }

        this.splatters = splatters
    }

    draw() {
        noStroke()
        for (let s = 0; s < this.splatters.length; s++) {
            const splatter = this.splatters[s]
            const { r, g, b } = splatter.color

            fill(r, g, b)
            for (let d = 0; d < splatter.dots.length; d++) {
                const dot = splatter.dots[d]
                ellipse(dot.x, dot.y, 10)
            }
        }
    }

    getRandomGaussianPosition(position, distance) {
        return {
            x: randomGaussian(position.x, distance),
            y: randomGaussian(position.y, distance)
        }
    }

}