// https://www.w3resource.com/javascript-exercises/javascript-object-exercise-9.php
// http://people.wku.edu/tom.richmond/Pir2b.html

// Calculate the area and perimeter (circumference) of a circle
function Circle(radius) {
  this.radius = radius;

  // area method
  this.area = function() {
    // pi times the square of the radius
    return Math.PI * this.radius * this.radius;
  };

  // perimeter method
  this.perimeter = function() {
    return 2 * Math.PI * this.radius;
  };
}

const c = new Circle(3);
console.log("Area =", c.area().toFixed(2));
console.log("Perimeter =", c.perimeter().toFixed(2));
