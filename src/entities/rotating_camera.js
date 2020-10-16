// Camera that rotates around a point
export default class RotatingCamera {

    constructor(center, distance, step) {
        this.distance = distance
        this.step = step
        this.center = center

        // start at angle 0
        this.angle = 0

        // sum the distance of the camera from the border
        this.radius = this.center.x + this.distance
    }

    update() {
        /*
        x(angle) = radius * cos(angle) + centerX
        y(angle) = radius * sin(angle) + centerY
        */
        const x = this.radius * Math.cos(this.angle) + this.center.x
        const y = this.radius * Math.sin(this.angle) + this.center.y

        camera(
            x, y, this.center.z,
            this.center.x, this.center.y, this.center.z,
            0, 0, -1)

        this.angle = this.angle < 360 ? this.angle + this.step : 0
    }

}