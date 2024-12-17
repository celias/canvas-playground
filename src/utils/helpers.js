// js/helpers.js

// Pure random number generators
export const random = (min, max) => Math.random() * (max - min) + min;
export const randomInt = (min, max) => Math.floor(random(min, max + 1));

// Pure color generation functions
export const hslToColor = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;

export const generateColor = (baseHue, variation, saturation = 70, lightness = 60) => {
    const hue = (baseHue + random(-variation, variation)) % 360;
    return hslToColor(hue, saturation, lightness);
};

export const generatePalette = (n, baseHue, variation) => 
    Array.from({ length: n }, () => generateColor(baseHue, variation));

// Pure vector operations
export const Vector = {
    create: (x, y) => ({ x, y }),
    add: (v1, v2) => Vector.create(v1.x + v2.x, v1.y + v2.y),
    scale: (v, scalar) => Vector.create(v.x * scalar, v.y * scalar),
    fromAngle: (angle, magnitude = 1) => 
        Vector.create(
            magnitude * Math.cos(angle),
            magnitude * Math.sin(angle)
        ),
    normalize: (v) => {
        const length = Math.sqrt(v.x * v.x + v.y * v.y);
        return length === 0 ? v : Vector.scale(v, 1 / length);
    }
};

// Pure shape generation
export const createCircle = (x, y, radius) => ({
    type: 'circle',
    x,
    y,
    radius
});

export const createPolygon = (x, y, radius, sides, rotation = 0) => ({
    type: 'polygon',
    x,
    y,
    radius,
    sides,
    rotation
});

// Pure noise generation
export const createNoiseValue = (x, y, scale = 0.005) => {
    const scaled = {
        x: x * scale,
        y: y * scale
    };
    return Math.sin(scaled.x) * Math.cos(scaled.y) * Math.sin(scaled.x + scaled.y);
};

// Pure point generation
export const generatePoints = (count, width, height) =>
    Array.from({ length: count }, () => ({
        x: random(0, width),
        y: random(0, height),
        angle: random(0, Math.PI * 2)
    }));

// Screen dimensions with DPR
export const getScreenDimensions = () => {
    const dpr = window.devicePixelRatio || 1;
    return {
        width: window.innerWidth * dpr,
        height: window.innerHeight * dpr,
        dpr
    };
};