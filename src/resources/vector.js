import { Vector } from 'p5'

// Vector.copy = (vector) => {
//     return new Vector(vector.x, vector.y, vector.z)
// }

// Source: https://p5js.org/reference/#/p5.Vector/angleBetween
Vector.drawArrow = (base, vec, myColor) => {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}