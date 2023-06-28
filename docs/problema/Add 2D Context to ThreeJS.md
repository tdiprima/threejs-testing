## Free Drawing 🎨

The important part is the event listeners.

During mousemove, you calculate the coordinates and you set `needsUpdate`.

On mousedown, set the start coordinates and the `isDrawing` flag.

On mouseup, the drawing is closed.  Set `isDrawing` flag.

```js
function onCanvasMouseMove(event) {
  if (isDrawing) {
    let x = event.clientX - canvas.offsetLeft;
    let y = event.clientY - canvas.offsetTop;
    context.lineTo(x, y);
    context.stroke();
    texture.needsUpdate = true;
  }
}

function onCanvasMouseDown(event) {
  isDrawing = true;
  let x = event.clientX - canvas.offsetLeft;
  let y = event.clientY - canvas.offsetTop;
  context.beginPath();
  context.moveTo(x, y);
}

function onCanvasMouseUp(event) {
  isDrawing = false;
  context.closePath();
  context.stroke();
}

element.addEventListener("mousedown", onCanvasMouseDown);
element.addEventListener("mousemove", onCanvasMouseMove);
element.addEventListener("mouseup", onCanvasMouseUp);
```

<br>
