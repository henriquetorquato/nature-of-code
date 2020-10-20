import { Vector } from 'p5'

Vector.copy = (vector) => {
    return new Vector(vector.x, vector.y, vector.z)
}