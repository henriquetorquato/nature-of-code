import Cannon from './cannon'
import RandomObject from './random_object'
import Fluid from '@entities/fluid'
import Rect from '@resources/rect'

export default class ObjectCannon {

    setup() {
        this.air = new Fluid(createVector(0, 0), window.canvasSize, color(0, 0, 0, 0), 0.001)
        this.gravity = createVector(0, 10)

        const cannonPosition = createVector(50, window.canvasHeight - 30)
        this.cannon = new Cannon(cannonPosition)

        const objectPosition = createVector(50, 0)
        this.object = new RandomObject(objectPosition)
    }

    draw() {
        clear()
        background(220)

        if (Rect.inside(this.object.rect, this.cannon.fireRect))
        {
            this.object.disappear()
            this.cannon.fire(this.object)
        }
        else
        {
            const drag = this.air.drag(this.object.velocity, this.object.area)
            this.object.applyForce(this.gravity)
            this.object.applyForce(drag)
        }

        this.object.update()
        this.object.display()

        this.cannon.update()
        this.cannon.display()
    }

}