import { Vector } from 'p5'
import Car from './car'
import Fluid from '@entities/fluid'

export default class DrivingCar {

    setup() {
        this.car = new Car(Vector.copy(window.canvasCenter))
        this.road = new Fluid(createVector(0, 0), window.canvasSize, color(0, 0, 0, 0), 0.1)
    }

    draw() {
        clear()
        background(220)

        this.nextThrottle()
        
        // TO-DO: Implement car steering
        const angle = this.nextSteering()

        const friction = this.road.drag(this.car.velocity, this.car.area)
        this.car.applyForce(friction)

        this.car.update()
        this.car.display()
    }

    nextThrottle() {
        if (keyIsDown(UP_ARROW))
        {
            this.car.forward()
        }
        else if (keyIsDown(DOWN_ARROW))
        {
            this.car.backward()
        }
    }

    nextSteering() {
        if (keyIsDown(LEFT_ARROW))
        {
            return 45
        }
        else if (keyIsDown(RIGHT_ARROW))
        {
            return -45
        }
    }

}