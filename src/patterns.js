// patterns.js
import { randomInt, generateColor, Vector, createCircle, createPolygon, generatePoints, createNoiseValue } from './utils/helpers.js';

// Helper for creating drawing instructions
const createDrawingInstructions = (shape, style) => ({
    shape,
    style
});

// Flow Field Pattern Generator
export const generateFlowField = (config) => {
    const { width, height, complexity, baseHue, colorVariation } = config;
    const points = generatePoints(complexity * 20, width, height);
    const scale = Math.min(width, height);
    
    const generateFlowLine = (point) => {
        const linePoints = [point];
        let currentPoint = { ...point };
        const stepSize = scale * 0.002;
        
        for (let i = 0; i < 50; i++) {
            const noise = createNoiseValue(currentPoint.x, currentPoint.y, 0.002);
            const angle = currentPoint.angle + noise * 0.5;
            const movement = Vector.fromAngle(angle, stepSize);
            currentPoint = {
                x: currentPoint.x + movement.x,
                y: currentPoint.y + movement.y,
                angle
            };
            
            if (currentPoint.x < 0 || currentPoint.x > width || 
                currentPoint.y < 0 || currentPoint.y > height) break;
                
            linePoints.push(currentPoint);
        }
        
        return createDrawingInstructions(
            { type: 'flowLine', points: linePoints },
            { 
                strokeStyle: generateColor(baseHue, colorVariation),
                lineWidth: Math.min(width, height) * 0.002
            }
        );
    };
    
    return points.map(generateFlowLine);
};

// Circular Pattern Generator
export const generateCircularPattern = (config) => {
    const { width, height, complexity, baseHue, colorVariation } = config;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.45;
    
    return Array.from({ length: complexity * 2 }, (_, i) => {
        const angle = (i / (complexity * 2)) * Math.PI * 2;
        const radius = maxRadius * Math.sin((i / complexity) * Math.PI);
        const position = Vector.add(
            Vector.create(centerX, centerY),
            Vector.fromAngle(angle, radius)
        );
        
        const color = generateColor(baseHue, colorVariation);
        const circleRadius = Math.min(width, height) * 0.005;
        
        return [
            createDrawingInstructions(
                createCircle(position.x, position.y, circleRadius),
                { fillStyle: color }
            ),
            createDrawingInstructions(
                {
                    type: 'line',
                    start: { x: centerX, y: centerY },
                    end: position
                },
                { 
                    strokeStyle: color,
                    lineWidth: Math.min(width, height) * 0.001
                }
            )
        ];
    }).flat();
};

// Recursive Pattern Generator
export const generateRecursivePattern = (config) => {
    const { width, height, complexity, baseHue, colorVariation } = config;
    const minSize = Math.min(width, height) * 0.02;
    
    const generatePattern = (x, y, size, depth = 0) => {
        if (size < minSize || depth > complexity / 8) return [];
        
        const color = generateColor(baseHue, colorVariation);
        const pattern = [
            createDrawingInstructions(
                createPolygon(x, y, size, randomInt(3, 8)),
                { 
                    strokeStyle: color,
                    lineWidth: Math.min(width, height) * 0.001
                }
            )
        ];
        
        const newSize = size * 0.8;
        const numBranches = randomInt(3, 5);
        
        return pattern.concat(
            Array.from({ length: numBranches }, (_, i) => {
                const angle = (i / numBranches) * Math.PI * 2;
                const position = Vector.add(
                    Vector.create(x, y),
                    Vector.fromAngle(angle, size / 2)
                );
                return generatePattern(position.x, position.y, newSize, depth + 1);
            }).flat()
        );
    };
    
    return generatePattern(width / 2, height / 2, Math.min(width, height) * 0.4);
};