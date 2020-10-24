import NervousFly from '../entities/creatures/nervous_fly'
import SlitheringSnake from '../entities/creatures/slithering_snake'
import SwimmingFish from '../entities/creatures/swimming_fish'

export default class Ecosystem {

    entities = []

    setup() {
        this.spawn(NervousFly, 10)
        this.spawn(SlitheringSnake, 3)
        this.spawn(SwimmingFish, 5)
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

    spawn(type, amount) {
        for (let i = 0; i < amount; i++) {
            const position = this.randomPosition()
            const entity = new type(position)
            this.entities.push(entity)
        }
    }

}