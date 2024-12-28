import { canvasSketch } from 'canvas-sketch';
import { lerp } from 'canvas-sketch-util/math';

const settings = {
    dimensions: [2048, 2048],// These units would be cm since we set our units to cm on line 7

};

const sketch = () => {
    // Before we return our render function, we can manage local state in createGrid()
    const createGrid = () => {
        const points = [];
        const count = 5;

        for (let x = 0; x < count; x++) {
            for (let y = 0; y < count; y++) {
                // count <= 1 ? 0.5 safe guards against division by zero
                const u = count <= 1 ? 0.5 : x / (count - 1);
                const v = count <= 1 ? 0.5 : y / (count - 1);
                points.push([u, v]);
            }
        }
        return points;
    };

    // We can now use our grid to draw points
    const points = createGrid();
    const margin = 400;

    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);


        points.forEach(([u, v]) => {
            // Using lerp to interpolate between margin and width - margin and margin and height - margin to center our circles
            const x = lerp(margin, width - margin, u);
            const y = lerp(margin, height - margin, v);

            // Draw a circle
            context.beginPath();
            context.arc(x, y, 100, 0, Math.PI * 2, false);
            context.strokeStyle = 'black';
            context.lineWidth = 20;
            context.stroke();
        })

    };
};

canvasSketch(sketch, settings);