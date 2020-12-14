import FireworkEmmiter from './fireworks'

const SPAWN_TIMEOUT = 5000

export default class SystemSpawner {

    systems = []

    setup() {
        this.timer = Date.now()
    }

    draw() {
        clear()
        background(0)

        if (this.shouldSpawn())
            this.spawn()

        this.systems.forEach((emmiter, index, emmiters) =>
        {
            if (emmiter.isDead)
            {
                emmiters.splice(index, 1)
                return
            }

            emmiter.add()
            emmiter.run()
        })
    }

    shouldSpawn() {
        return Date.now() > this.timer
    }

    spawn() {
        const position = Math.randomPosition()
        const fireworks = new FireworkEmmiter(position)
        this.systems.push(fireworks)
        this.timer = Date.now() + SPAWN_TIMEOUT
    }

}