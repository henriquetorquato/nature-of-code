import { Vector } from 'p5'
import { FishGenes, FishType } from './fish_genes'
import Rect from '../../../resources/rect'
import SwimmingFish from './swimming_fish'

const MAX_DISTANCE = 200

export default class BigFish extends SwimmingFish {

    constructor(position) {
        super(position, new FishGenes(BaseGenes))
        this.type = FishType.Predator
        this.target = null
    }

    nextDirection() {
        this.directionOffset.add(0.01)       

        let direction
        if (this.target == null)
        {
            direction = createVector(
                map(noise(this.directionOffset.x), 0, 1, -1, 1),
                map(noise(this.directionOffset.y), 0, 1, -1, 1))
                .normalize()    
        }
        else
        {
            const targetDirection = Vector.sub(this.position, this.target.position)
            targetDirection.normalize()

            direction = targetDirection
        }

        this.flip = this.flipVector()
        return Vector.mult(direction, this.flip)
    }

    checkTarget(target) {
        // Only hunt if target is a prey
        if (target.type !== FishType.Prey) return

        const direction = Vector.sub(this.position, target.position)
        const distance = direction.mag()

        // If target is too far, ignore it
        if (distance > MAX_DISTANCE) return

        // If touching the target, kill it
        if (Rect.intersects(this.rect, target.rect))
        {
            target.kill()
            this.target = null
            return
        }

        // Go to the target
        this.target = target
    }

}

const BaseGenes = {
    width: {
        mean: 10,
        deviation: 1
    },
    height: {
        mean: 20,
        deviation: 2
    }
}