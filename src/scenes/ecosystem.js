import NervousFly from '../entities/creatures/nervous_fly'

export default class Ecosystem {

    entities = []

    setup() {
        this.initialize(NervousFly, 5)
    }

    draw() {
        clear()
        background(220)

        this.entities.forEach(e =>
        {
            e.update()
            e.display()
        })
    }

    randomPosition() {
        return createVector(
            Math.randomBetween(0, window.canvasWidth),
            Math.randomBetween(0, window.canvasHeight))
    }

    initialize(type, amount) {
        for (let i = 0; i < amount; i++) {
            const position = this.randomPosition()
            const entity = new type(position)
            this.entities.push(entity)
        }
    }

}