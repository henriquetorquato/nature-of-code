import { Vector } from 'p5'

export default class Sort {

    static byDistance(position, elements) {
        return elements.sort((a, b) =>
        {
            const distanceA = Vector.sub(position, a.position)
            const distanceB = Vector.sub(position, b.position)

            if (distanceA.mag() < distanceB.mag())
            {
                return -1
            }
            else if (distanceA.mag() > distanceB.mag())
            {
                return 1
            }
            else
            {
                return 0
            }
        })
    }

}