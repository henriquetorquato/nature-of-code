import Cannon from './cannon'
import RandomObject from './random_object'
import Fluid from '@entities/fluid'
import Rect from '@resources/rect'
import RandomSpawner from '@entities/random_spawner'

export default class ObjectCannon {

    objects = []

    setup() {
        this.air = new Fluid(createVector(0, 0), window.canvasSize, color(0, 0, 0, 0), 0.001)
        this.gravity = createVector(0, 10)

        const cannonPosition = createVector(70, window.canvasHeight - 60)
        this.cannon = new Cannon(cannonPosition)

        this.spawnRect = Rect.from(createVector(10, 0), { width: 80, height: 50 })
        this.spawner = new RandomSpawner(1, 1000, this.spawnObject.bind(this))
    }

    draw() {
        clear()
        background(220)

        this.spawner.check()

        this.objects.forEach(object =>
        {
            if (!this.checkBorder(object))
            {
                return
            }

            const index = this.objects.indexOf(object)
            this.objects.splice(index, 1)
        })

        this.objects.forEach(object =>
        {
            if (Rect.intersects(object.rect, this.cannon.fireRect))
            {
                object.disappear()
                this.cannon.queue(object)
            }
            else
            {
                const drag = this.air.drag(object.velocity, object.area)
                object.applyForce(this.gravity)
                object.applyForce(drag)
            }

            object.update()
            object.display()
        })

        this.cannon.update()
        this.cannon.display()
    }

    spawnObject() {
        const x = Math.randomBetween(this.spawnRect.x, this.spawnRect.x + this.spawnRect.width)
        const y = Math.randomBetween(this.spawnRect.y, this.spawnRect.y + this.spawnRect.height)
        const position = createVector(x, y)

        const object = new RandomObject(position)
        this.objects.push(object)
    }

    checkBorder(object) {
        const left = object.position.x + object.size.width < 0
        const right = object.position.x > window.canvasWidth
        const bottom = object.position.y > window.canvasHeight
        const top = object.position.y + object.size.height < 0

        return left || right || bottom || top
    }

}