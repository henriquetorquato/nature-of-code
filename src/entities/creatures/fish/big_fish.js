import Rect from '../../../resources/rect'
import SwimmingFish from './swimming_fish'
import { Vector } from 'p5'
import { FishGenes, FishType } from './fish_genes'

const TARGET_MIN_DISTANCE = 80
const TARGET_MAX_DISTANCE = 300

export default class BigFish extends SwimmingFish {

    constructor(position) {
        super(position, new FishGenes(BaseGenes))
        this.type = FishType.Predator
        this.target = null
    }

    update() {
        if (this.target && this.targetDistance() > TARGET_MAX_DISTANCE)
        {
            this.target = null
        }

        // If touching the target, kill him
        if (this.target && Rect.intersects(this.rect, this.target.rect))
        {
            this.target.kill()
            this.target = null
        }

        super.update()
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

        // If there is no target, and is close
        if (this.target === null && distance < TARGET_MIN_DISTANCE)
        {
            this.target = target
        }
    }

    targetDistance() {
        const direction = Vector.sub(this.position, this.target.position)
        return direction.mag()
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