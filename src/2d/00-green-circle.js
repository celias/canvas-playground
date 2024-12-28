import { canvasSketch } from 'canvas-sketch';

const settings = {
  // dimensions: [ 2048, 2048 ],// These units would be cm since we set our units to cm on line 7
  dimensions: 'A4',
  // orientation: 'landscape',
  units: 'cm', 
  pixelsPerInch: 300 // Common size for print design
};

const sketch = () => {
  return (props) => {
    props.context.fillStyle = 'violet';
    props.context.fillRect(0, 0, props.width, props.height);
    props.context.beginPath();

    // `props.width * 0.2` is relative to the width of the screen across the web AND works for print
    props.context.arc(props.width / 2, props.height / 2, 2, 0, Math.PI * 2,  false); 

    props.context.fillStyle = 'green';
    props.context.fill();

    // props.context.lineWidth = 40; // In Pixels
    // Can be relative to the width of the screen so that our art works for Print and across the web
    props.context.lineWidth = props.width * 0.008; 

    props.context.strokeStyle = 'black';
    props.context.stroke();
  };
};

canvasSketch(sketch, settings);
