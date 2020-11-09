// import NervousFly from '@entities/creatures/nervous_fly'
// import SlitheringSnake from '@entities/creatures/slithering_snake'
// import JumpingFrog from '@entities/creatures/jumping_frog'

import RandomSpawner from '@entities/random_spawner'
import { Air, Water } from './fluids'
import { JumpingFrog, generateLilypads } from '@entities/creatures/frog'
import { BigFish, SmallFish } from '@entities/creatures/fish'

export default class Ecosystem {

    entities = []    

    setup() {
        this.air = new Air()
        this.water = new Water()

        // Fishes
        this.spawner = new RandomSpawner(0.4, 5000, () =>
        {
            this.spawn(SmallFish, this.entities, 1)
            console.log('Spawned an small fish')
        })

        this.spawn(BigFish, this.entities, 5)
        this.spawn(SmallFish, this.entities, 10)

        // Frog
        this.lilypads = generateLilypads()
        this.frog = new JumpingFrog(this.lilypads)
    }

    draw() {
        clear()
        background(255)

        this.spawner.check()

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

            const drag = this.water.drag(entity.velocity, entity.area)
            entity.applyForce(drag)

            entity.update()
            entity.display()
        })
        
        this.water.display()
        this.lilypads.forEach(lilypad => lilypad.display())

        const drag = this.air.drag(this.frog.velocity, this.frog.area)
        this.frog.applyForce(drag)

        this.frog.update()
        this.frog.display()
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