// Calculate the area and perimeter of a circle
function Circle(radius) {
  this.radius = radius;
  // area method
  this.area = function() {
    return Math.PI * this.radius * this.radius;
  };
  // perimeter method
  this.perimeter = function() {
    return 2 * Math.PI * this.radius;
  };
}

const c = new Circle(3);
console.log('Area =', c.area().toFixed(2));
console.log('Perimeter =', c.perimeter().toFixed(2));
