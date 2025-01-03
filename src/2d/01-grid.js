import { canvasSketch } from 'canvas-sketch';
import { lerp } from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';

const settings = {
    dimensions: [2048, 2048],

};

const sketch = () => {
    const createGrid = () => {
        const points = [];
        const count = 70;

        for (let x = 0; x < count; x++) {
            for (let y = 0; y < count; y++) {
                const u = count <= 1 ? 0.5 : x / (count - 1);
                const v = count <= 1 ? 0.5 : y / (count - 1);
                points.push({
                    radius: random.value() * 0.3,
                    position: [u, v]
                });
            }
        }
        return points;
    };

    // random.setSeed('ab'); // This will always return the same random values. It can be a string or number value
    // We can now use our grid to draw points
    const points = createGrid().filter(() => random.value() > 0.5);
    const margin = 400;

    return ({ context, width, height }) => {
        context.fillStyle = 'yellow'; /* Background color */
        context.fillRect(0, 0, width, height);


        points.forEach(data => {
            const { position, radius } = data;
            const [u, v] = position;
            // Using lerp to interpolate between margin and width - margin and margin and height - margin to center our circles
            const x = lerp(margin, width - margin, u);
            const y = lerp(margin, height - margin, v);

            // Draw a circle
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2, false);
            context.strokeStyle = 'salmon';
            context.lineWidth = 20;
            context.stroke();

            // context.beginPath();
            // context.arc(x, y, 11, 0, Math.PI * 2, false);
            // context.strokeStyle = 'salmon';
            // context.lineWidth = 2.9;
            // context.stroke();

            // context.beginPath();
            // context.arc(x, y, 20, 2.20, Math.PI * 2, false);
            // context.strokeStyle = 'gold';
            // context.lineWidth = 3.9;
            // context.stroke();
        })

    };
};

canvasSketch(sketch, settings);