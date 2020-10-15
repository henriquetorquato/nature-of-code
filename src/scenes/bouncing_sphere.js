import { Vector } from 'p5'
import CircularCamera from '../entities/circular_camera'

const CUBE_SIZE = 100
const SPHERE_RADIUS = 10
const CAMERA_STEP = 0.01
const CAMERA_DISTANCE = 50

/*
* This is the smallest possible number of vertices to build a cube:
* https://stackoverflow.com/questions/25195363/draw-cube-vertices-with-fewest-number-of-steps
*/
const CUBE = [
    0, 0, 0,
    0, 0, 1,
    0, 1, 1,
    1, 1, 1,
    1, 1, 0,
    0, 1, 0,
    0, 0, 0,
    1, 0, 0,
    1, 0, 1,
    0, 0, 1,
    0, 1, 1,
    0, 1, 0,
    1, 1, 0,
    1, 0, 0,
    1, 0, 1,
    1, 1, 1
]

export default class BouncingSphere {

    renderer = WEBGL

    setup() {
        this.cube = this.buildCubeStructure()
        this.center = createVector(CUBE_SIZE / 2, CUBE_SIZE / 2, CUBE_SIZE / 2)
        this.camera = new CircularCamera(this.center, CUBE_SIZE + CAMERA_DISTANCE, CAMERA_STEP)

        this.position = createVector(this.center.x, this.center.y, this.center.z)
        this.direction = Vector.random3D()
    }

    draw() {
        clear()
        background(220)

        this.drawCube()

        this.stepSphere()
        this.drawSphere()
        
        this.camera.update()
    }

    buildCubeStructure() {
        let vertices = []
        for (let i = 0; i < CUBE.length; i += 3) {
            const x = CUBE[i] * CUBE_SIZE
            const y = CUBE[i + 1] * CUBE_SIZE
            const z = CUBE[i + 2] * CUBE_SIZE

            vertices.push(
                createVector(x, y, z))
        }

        return vertices
    }

    drawCube() {
        noFill()
        beginShape()
        for (let i = 0; i < this.cube.length; i++) {
            const vert = this.cube[i]
            vertex(vert.x, vert.y, vert.z)
        }
        endShape()
    }

    drawSphere() {
        fill(0)
        translate(this.position.x, this.position.y, this.position.z)
        sphere(SPHERE_RADIUS, 10, 10)
    }

    stepSphere() {
        // Create a next position to avoid modifying the position
        let nextPosition = createVector(this.position.x, this.position.y, this.position.z)
        nextPosition.add(this.direction)

        // Check if moving the sphere will collide with any dimentions
        let bounce = createVector(
            this.checkDimention(nextPosition.x) ? -1 : 1,
            this.checkDimention(nextPosition.y) ? -1 : 1,
            this.checkDimention(nextPosition.z) ? -1 : 1)

        this.direction.mult(bounce)
        this.position.add(this.direction)
    }

    checkDimention(value) {
        return value < 0 || value > CUBE_SIZE
    }
    
}