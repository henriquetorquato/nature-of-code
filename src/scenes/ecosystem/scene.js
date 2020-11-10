import RandomSpawner from '@entities/random_spawner'
import NervousFly from '@entities/creatures/nervous_fly'
import { Air, Water } from './fluids'
import { JumpingFrog, generateLilypads } from '@entities/creatures/frog'
import { BigFish, SmallFish } from '@entities/creatures/fish'

export default class Ecosystem {

    fishes = []
    flies = []

    setup() {
        this.air = new Air()
        this.water = new Water()

        // Fishes
        this.spawner = new RandomSpawner(0.4, 5000, () =>
        {
            this.spawn(SmallFish, 1, this.fishes, this.fishKilled.bind(this))
            console.log('Spawned an small fish')
        })

        this.spawn(BigFish, 5, this.fishes, this.fishKilled.bind(this))
        this.spawn(SmallFish, 10, this.fishes, this.fishKilled.bind(this))

        // Frog
        this.lilypads = generateLilypads()
        this.frog = new JumpingFrog(this.lilypads)

        // Flies
        this.spawn(NervousFly, 10, this.flies, this.flyKilled.bind(this))
    }

    draw() {
        clear()
        background(255)

        this.spawner.check()

        this.fishes.forEach(entity =>
        {
            if (entity.checkTarget)
            {
                for (let i = 0; i < this.fishes.length; i++)
                {
                    const target = this.fishes[i]
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

        this.frog.checkFlies(this.flies)
        const drag = this.air.drag(this.frog.velocity, this.frog.area)
        this.frog.applyForce(drag)

        this.frog.update()
        this.frog.display()

        this.flies.forEach(fly =>
        {
            fly.update()
            fly.display()
        })
    }

    spawn(type, amount, list, deathEvent = null) {
        for (let i = 0; i < amount; i++) {
            const position = Math.randomPosition()
            const entity = new type(position)

            if (entity.onKill && deathEvent) entity.onKill(deathEvent)
            list.push(entity)
        }
    }

    fishKilled(fish) {
        const index = this.fishes.indexOf(fish)

        /*
        * If any fish also had the killed as target,
        * then forget about it.
        */
        this.fishes.forEach(entity =>
        {
            if (entity.target === fish) entity.target = null
        })

        this.fishes.splice(index, 1)
    }

    flyKilled(fly) {
        const index = this.flies.indexOf(fly)
        this.flies.splice(index, 1)
    }

}