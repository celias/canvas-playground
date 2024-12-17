// js/renderer.js
export const createRenderer = (canvas) => {
    const ctx = canvas.getContext('2d');
    
    const render = (instructions) => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Apply each drawing instruction
        instructions.forEach(({ shape, style }) => {
            // Save context state
            ctx.save();
            
            // Apply styles
            Object.assign(ctx, style);
            
            // Draw based on shape type
            switch (shape.type) {
                case 'circle':
                    drawCircle(ctx, shape);
                    break;
                case 'polygon':
                    drawPolygon(ctx, shape);
                    break;
                case 'flowLine':
                    drawFlowLine(ctx, shape);
                    break;
                case 'line':
                    drawLine(ctx, shape);
                    break;
            }
            
            // Restore context state
            ctx.restore();
        });
    };
    
    return { render };
};

// Pure drawing functions
const drawCircle = (ctx, { x, y, radius }) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
};

const drawPolygon = (ctx, { x, y, radius, sides, rotation = 0 }) => {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * 2 * Math.PI / sides);
        const pointX = x + radius * Math.cos(angle);
        const pointY = y + radius * Math.sin(angle);
        i === 0 ? ctx.moveTo(pointX, pointY) : ctx.lineTo(pointX, pointY);
    }
    ctx.closePath();
    ctx.stroke();
};

const drawFlowLine = (ctx, { points }) => {
    if (points.length < 2) return;
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
};

const drawLine = (ctx, { start, end }) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
};