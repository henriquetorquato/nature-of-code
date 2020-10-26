import NervousFly from '../entities/creatures/nervous_fly'
import SlitheringSnake from '../entities/creatures/slithering_snake'
import SwimmingFish from '../entities/creatures/swimming_fish'
import JumpingFrog from '../entities/creatures/jumping_frog'

export default class Ecosystem {

    airEntities = []
    waterEntities = []    

    setup() {
        this.spawn(NervousFly, this.airEntities, 10)
        this.spawn(SlitheringSnake, this.waterEntities, 3)
        this.spawn(SwimmingFish, this.waterEntities, 5)

        this.lilypads = new Lilypads()
        this.lilypads.setup()

        this.frog = new JumpingFrog(this.lilypads.positions)
    }

    draw() {
        clear()
        background(220)

        this.drawEntities(this.waterEntities)
        this.drawWater()
        this.lilypads.draw()

        this.frog.update()
        this.frog.display()
        
        this.drawEntities(this.airEntities)
    }

    drawWater() {
        push()
        noStroke()
        fill(color(0, 126, 255, 102))
        rect(0, 0, window.canvasWidth, window.canvasHeight)
        pop()
    }

    drawEntities(entities) {
        if (entities === []) return;

        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i]
            entity.update()
            entity.display()
        }
    }

    spawn(type, entities, amount) {
        for (let i = 0; i < amount; i++) {
            const position = Math.randomPosition()
            const entity = new type(position)
            entities.push(entity)
        }
    }

}

class Lilypads {

    lilypads = []

    get positions() {
        return this.lilypads.map(l => l.position)   
    }

    setup() {
        const amount = Math.randomBetween(4, 8)

        for (let i = 0; i < amount; i++) {
            const lilypad = {
                size : randomGaussian(20, 3),
                position: Math.randomPosition(),
                color: color(
                    randomGaussian(20, 10),
                    randomGaussian(180, 40),
                    randomGaussian(30, 10)
                )
            }

            this.lilypads.push(lilypad)
        }
    }

    draw() {
        push()
        rectMode(CENTER)
        for (let i = 0; i < this.lilypads.length; i++) {
            this.drawLily(this.lilypads[i])    
        }
        pop()
    }

    drawLily(lily) {
        fill(lily.color)
        ellipse(lily.position.x, lily.position.y, lily.size)
    }

}