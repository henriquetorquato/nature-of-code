// import NervousFly from '../entities/creatures/nervous_fly'
// import SlitheringSnake from '../entities/creatures/slithering_snake'
// import JumpingFrog from '../entities/creatures/jumping_frog'

import { BigFish, SmallFish } from '../entities/creatures/fish'

export default class Ecosystem {

    entities = []    

    setup() {
        this.spawn(BigFish, this.entities, 5)
        this.spawn(SmallFish, this.entities, 5)
    }

    draw() {
        clear()
        background(255)

        this.entities.forEach(entity =>
        {
            if (entity.checkTarget)
            {
                for (let i = 0; i < this.entities.length; i++)
                {
                    const target = this.entities[i]
                    entity.checkTarget(target)
                }
            }

            entity.update()
            entity.display()
        })

        // TO-DO: Add drag force to water entities
        this.drawWater()
    }

    drawWater() {
        push()
        noStroke()
        fill(color(0, 126, 255, 102))
        rect(0, 0, window.canvasWidth, window.canvasHeight)
        pop()
    }

    spawn(type, entities, amount) {
        for (let i = 0; i < amount; i++) {
            const position = Math.randomPosition()
            const entity = new type(position)

            if (entity.onKill) entity.onKill(this.entityKilled.bind(this))
            entities.push(entity)
        }
    }

    entityKilled(target) {
        const index = this.entities.indexOf(target)

        /*
        * If any fish also had the killed as target,
        * then forget about it.
        */
        this.entities.forEach(entity =>
        {
            if (entity.target === target) entity.target = null
        })

        this.entities.splice(index, 1)
    }

}

// class Lilypads {

//     lilypads = []

//     get positions() {
//         return this.lilypads.map(l => l.position)   
//     }

//     setup() {
//         const amount = Math.randomBetween(4, 8)

//         for (let i = 0; i < amount; i++) {
//             const lilypad = {
//                 size : randomGaussian(20, 3),
//                 position: Math.randomPosition(),
//                 color: color(
//                     randomGaussian(20, 10),
//                     randomGaussian(180, 40),
//                     randomGaussian(30, 10)
//                 )
//             }

//             this.lilypads.push(lilypad)
//         }
//     }

//     draw() {
//         push()
//         rectMode(CENTER)
//         for (let i = 0; i < this.lilypads.length; i++) {
//             this.drawLily(this.lilypads[i])    
//         }
//         pop()
//     }

//     drawLily(lily) {
//         fill(lily.color)
//         ellipse(lily.position.x, lily.position.y, lily.size)
//     }

// }