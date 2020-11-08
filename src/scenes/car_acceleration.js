import Walker from '@entities/walker'

const ACCELERATION_STEP = 0.001
const CAR_WIDTH = 10
const CAR_HEIGHT = 20

export default class CarAcceleration {

    setup() {
        this.car = new Car(window.canvasCenter)

        textFont(window.font)
        textSize(20)
    }

    draw() {
        clear()
        background(220)
        text(`Position:     ${this.car.position.y}`, 10, 20)
        text(`Velocity:     ${this.car.velocity.y}`, 10, 45)
        text(`Acceleration: ${this.car.acceleration.y}`, 10, 70)

        this.updateAcceleration()

        this.car.update()
        this.car.velocity.limit(10)
        this.car.acceleration.limit(0.05)

        this.car.display()
    }

    updateAcceleration() {
        if (this.car.position.y < 0) {
            this.car.position.y = height
        }

        if (this.car.position.y > window.canvasSize.height) {
            this.car.position.y = 0
        }
        
        if (keyIsPressed && key === 'ArrowUp') {
            this.car.acceleration.y += ACCELERATION_STEP
        } else if (keyIsPressed && key === 'ArrowDown') {
            this.car.acceleration.y -= ACCELERATION_STEP
        }
    }

}

class Car extends Walker {

    display() {
        rect(this.position.x, this.position.y, 10, 20)
    }

}