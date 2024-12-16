// js/main.js
import { randomInt, getScreenDimensions } from './utils.js';
import { generateFlowField, generateCircularPattern, generateRecursivePattern } from './patterns.js';
import { createRenderer } from './renderer.js';

// Configuration management (pure)
const createConfig = (width, height, complexity, colorVariation) => ({
    width,
    height,
    complexity: parseInt(complexity),
    colorVariation: parseInt(colorVariation),
    baseHue: randomInt(0, 360)
});

// Pattern selection (pure)
const selectPattern = (config) => {
    const patterns = [
        generateFlowField,
        generateCircularPattern,
        generateRecursivePattern
    ];
    return patterns[randomInt(0, patterns.length - 1)](config);
};

// Application state management
const createApp = (canvas) => {
    const renderer = createRenderer(canvas);
    
    // Canvas setup (side effect isolated)
    const setupCanvas = () => {
        const { width, height, dpr } = getScreenDimensions();
        
        // Set actual pixel dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Scale the context to handle device pixel ratio
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        
        // Set CSS dimensions
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    };
    
    // DOM event handlers (side effects isolated)
    const setupEventListeners = () => {
        const generate = () => {
            const { width, height } = getScreenDimensions();
            const config = createConfig(
                width,
                height,
                document.getElementById('complexity').value,
                document.getElementById('colorVariation').value
            );
            const pattern = selectPattern(config);
            renderer.render(pattern);
        };
        
        document.getElementById('generate').addEventListener('click', generate);
        document.getElementById('save').addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'generative-art.png';
            link.href = canvas.toDataURL();
            link.click();
        });
        
        ['complexity', 'colorVariation'].forEach(id => {
            document.getElementById(id).addEventListener('input', generate);
        });
        
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setupCanvas();
                generate();
            }, 250);
        });
        
        return generate;
    };
    
    const init = () => {
        setupCanvas();
        const generate = setupEventListeners();
        generate(); // Initial generation
    };
    
    return { init };
};

// Initialize application
window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const app = createApp(canvas);
    app.init();
});