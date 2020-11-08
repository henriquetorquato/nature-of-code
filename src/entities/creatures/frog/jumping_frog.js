const FrogState = {
    Waiting: 0,
    Jumping: 1
}

export default class JumpingFrog {

    constructor(positions) {
        this.date = new Date()
        this.positions = positions

        this.position = this.positions[0]

        this.jumpTo = null
        this.state = FrogState.Waiting
        this.stateChange = this.date.getTime() + 2000
    }

    update() {
        if (this.state === FrogState.Waiting && this.date.getTime() >= this.stateChange) {
            this.state = FrogState.Jumping
            this.jumpTo = Math.randomBetween(0, this.positions.length - 1)
        } else {
            return
        }


    }

    display() {
        push()
        fill(0)
        ellipse(this.position.x, this.position.y, 20)
        pop()
    }

}