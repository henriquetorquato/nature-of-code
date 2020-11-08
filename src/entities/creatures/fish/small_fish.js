import EventManager from '@resources/event'
import SwimmingFish from './swimming_fish'
import { FishGenes, FishType } from './fish_genes'

const DEATH_EVENT = 'SmallFish:Death'

export default class SmallFish extends SwimmingFish {

    constructor(position) {
        super(position, new FishGenes(BaseGenes))
        this.type = FishType.Prey
        this.event = new EventManager()
    }

    kill() {
        this.event.publish(DEATH_EVENT, this)
    }

    onKill(callback) {
        this.event.subscribe(DEATH_EVENT, callback)
    }

}

const BaseGenes = {
    width: {
        mean: 5,
        deviation: 1
    },
    height: {
        mean: 10,
        deviation: 2
    }
}