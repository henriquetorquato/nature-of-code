export default class RandomSpawner {

    constructor(chance, period, callback) {
        this.chance = chance
        this.period = period
        this.callback = callback

        this.time = this.nextTime()
    }

    check() {
        if (this.shouldRun())
        {
            if (this.rollDice()) this.callback()
            this.time = this.nextTime()
        }
    }

    rollDice() {
        return Math.random() < this.chance
    }

    nextTime() {
        return Date.now() + this.period
    }

    shouldRun() {
        return Date.now() > this.time
    }

}