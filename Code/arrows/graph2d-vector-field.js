let mathbox = mathBox({
  plugins: ["core", "controls", "cursor", "mathbox"],
  controls: { klass: THREE.OrbitControls }
});

if (mathbox.fallback) throw "WebGL not supported";

let three = mathbox.three;
three.renderer.setClearColor(new THREE.Color(0xffffff), 1.0);

let graphData, view;

var f1FuncText = "y";
var f2FuncText = "-x";

var pointText = "(1,1)";
var stepSize = 0.01;
var curveData;

var a = 1.25,
  b = 1.25;

var xMin = -4,
  xMax = 4,
  yMin = -2,
  yMax = 2;

// start of updateGraph function ==============================================================
let updateGraphFunc = function() {
  let f1Func = Parser.parse(f1FuncText).toJSFunction(["x", "y"]);
  let f2Func = Parser.parse(f2FuncText).toJSFunction(["x", "y"]);
  // let deltaT = (tMax - tMin)/256;

  // NOTE: END first, START second
  graphData.set("expr", (emit, x, y, i, j, time, delta) => {
    let vx = f1Func(x, y);
    let vy = f2Func(x, y);
    let len = Math.sqrt(vx * vx + vy * vy);
    vx = (vx / len) * 0.25;
    vy = (vy / len) * 0.25;

    emit(x + vx, y + vy);
    emit(x, y);
  });

  // update starting point

  // use regular expression to trim out "\(" or "\)" globally in the string (replace it with "").
  let tempString = pointText.replace(/\(|\)/g, " ");
  let tempArray = tempString.split(",");
  // number is a global JS function that converts String to Number
  traceX = Number(tempArray[0]);
  traceY = Number(tempArray[1]);
  tracePointData.set("data", [[traceX, traceY]]);

  // NOTE: END first, START second
  let curvePointArray = [];
  let xPrev = traceX;
  let yPrev = traceY;

  for (let i = 0; i < 1024; i++) {
    let vx = f1Func(xPrev, yPrev);
    let vy = f2Func(xPrev, yPrev);

    // Runge-Kutta method
    let k1x = vx * stepSize;
    let k1y = vy * stepSize;

    let v1x = f1Func(xPrev + 0.5 * k1x, yPrev + 0.5 * k1y);
    let v1y = f2Func(xPrev + 0.5 * k1x, yPrev + 0.5 * k1y);

    let k2x = v1x * stepSize;
    let k2y = v1y * stepSize;

    let v2x = f1Func(xPrev + 0.5 * k2x, yPrev + 0.5 * k2y);
    let v2y = f2Func(xPrev + 0.5 * k2x, yPrev + 0.5 * k2y);

    let k3x = v2x * stepSize;
    let k3y = v2y * stepSize;

    let v3x = f1Func(xPrev + 0.5 * k3x, yPrev + 0.5 * k3y);
    let v3y = f2Func(xPrev + 0.5 * k3x, yPrev + 0.5 * k3y);

    let k4x = v3x * stepSize;
    let k4y = v3y * stepSize;

    let xNext = xPrev + (1 / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    let yNext = yPrev + (1 / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);

    /*
    // Euler's method
    let xNext = xPrev + vx * stepSize;
    let yNext = yPrev + vy * stepSize;
    */

    curvePointArray.push([xNext, yNext], [xPrev, yPrev]);
    xPrev = xNext;
    yPrev = yNext;
  }

  curveData.set("data", curvePointArray);

  view.set("range", [
    [xMin, xMax],
    [yMin, yMax]
  ]);
};
// end of updateGraph function ==============================================================

var updateGraph = function() {
  updateGraphFunc();
};

let camera = mathbox.camera({
  proxy: true,
  position: [0, 0, 2]
});

// save as variable to adjust later
view = mathbox.cartesian({
  range: [
    [xMin, xMax],
    [yMin, yMax],
  ],
  scale: [2, 1]
});

// axes
let xAxis = view.axis({
  axis: 1,
  width: 8,
  detail: 40,
  color: "red",
});
let xScale = view.scale({
  axis: 1,
  divide: 10,
  nice: true,
  zero: true
});
let xTicks = view.ticks({
  width: 5,
  size: 15,
  color: "red",
  zBias: 2
});
let xFormat = view.format({
  digits: 2,
  font: "Arial",
  weight: "bold",
  style: "normal",
  source: xScale
});
let xTicksLabel = view.label({
  color: "red",
  zIndex: 0,
  offset: [0, -20],
  points: xScale,
  text: xFormat
});

let yAxis = view.axis({
  axis: 2,
  width: 8,
  detail: 40,
  color: "green",
});
let yScale = view.scale({
  axis: 2,
  divide: 5,
  nice: true,
  zero: false
});
let yTicks = view.ticks({
  width: 5,
  size: 15,
  color: "green",
  zBias: 2
});
let yFormat = view.format({
  digits: 2,
  font: "Arial",
  weight: "bold",
  style: "normal",
  source: yScale
});
let yTicksLabel = view.label({
  color: "green",
  zIndex: 0,
  offset: [0, 0],
  points: yScale,
  text: yFormat
});

view.grid({
  axes: [1, 2],
  width: 2,
  divideX: 20,
  divideY: 20,
  opacity: 0.25
});

graphData = view.area({
  // expr: set later
  width: 20,
  height: 20,
  items: 2,
  channels: 2
});

let graphView = view.vector({
  width: 4,
  color: "#4444FF",
  points: graphData,
  start: true
});

// plot a point on the graph.

let tracePointData = view.array({
  width: 1,
  channels: 2,
  data: [[1, 2]]
});

// TODO (maybe): replace this by a small sphere for easier visibility?
let tracePointView = view.point({
  size: 20,
  color: "black",
  points: tracePointData,
  visible: true
});

// data: will be set later (requires functions to be parsed)
curveData = view.array({
  data: [],
  items: 2,
  channels: 2,
  width: 1024
});

var curveVisible = false;

// start:true  will add arrows to vectors.
// NOTE: vector head (terminal) comes first, followed by tail (initial)
let curveView = view.vector({
  points: curveData,
  color: "purple",
  width: 4,
  visible: curveVisible,
  start: true
});

// GUI controls

let gui = new dat.GUI();

gui.add(this, "f1FuncText").name("f1(x,y) = ");
gui.add(this, "f2FuncText").name("f2(x,y) = ");

gui.add(this, "pointText").name("P = (x,y) = "); // .onChange( updateGraphFunc );
gui
  .add(this, "stepSize")
  .name("step size = ")
  .min(0.001)
  .max(0.501)
  .step(0.001)
  .onChange(updateGraphFunc);
let curveVisibleGUI = gui
  .add(this, "curveVisible")
  .name("view approximate curve")
  .onChange(() => {
    curveView.set("visible", curveVisible);
  });

let folder0 = gui.addFolder("Parameters");
let aGUI = folder0
  .add(this, "a")
  .min(-6)
  .max(6)
  .step(0.01)
  .name("a = ");
let bGUI = folder0
  .add(this, "b")
  .min(-6)
  .max(6)
  .step(0.01)
  .name("b = ");
folder0.open();

let folder1 = gui.addFolder("Window Range");
let xMinGUI = folder1.add(this, "xMin");
let xMaxGUI = folder1.add(this, "xMax");
let yMinGUI = folder1.add(this, "yMin");
let yMaxGUI = folder1.add(this, "yMax");
folder1.close();

gui.add(this, "updateGraph").name("Update Graph");

gui.open();

updateGraphFunc();
