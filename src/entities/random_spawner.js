export default class RandomSpawner {

    constructor(chance, period) {
        this.chance = chance
        this.period = period
    }

    start(callback) {
        this.callback = callback
        setInterval(() =>
        {
            if (this.rollDice) callback()
        },
        this.period)
    }

    rollDice() {
        return Math.random() < this.chance
    }

}