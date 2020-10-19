import NervousFly from '../entities/creatures/nervous_fly'

export default class Ecosystem {

    setup() {
        this.fly = new NervousFly()
    }

    draw() {
        clear()
        background(220)

        this.fly.update()
        this.fly.display()
    }

}