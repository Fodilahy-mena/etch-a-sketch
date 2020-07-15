console.log('it works');
// Select the element on the page-canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shake = document.querySelector('.shake');
const  MOVE_AMOUNT = 50;

// Setup our canvas for drawing

// This is distructuring
// const {width} = canvas; // const width = canvas.width;
// const {height} = canvas; // const height = canvas.height;

// or we distructure it like this
const { width, height } = canvas;

// random x and y between 0 and width / height
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath();//Start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();
// Write a draw function

// ES6 parameter destructuring

// const draw = options => {
//     console.log(options);
// };

const draw = ({ key }) => {

    hue = hue + 10;
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;

    console.log(key);
    // start the path
    ctx.beginPath();
    ctx.moveTo(x, y);

    // change x and y
    // x = x - MOVE_AMOUNT;
    // y = y - MOVE_AMOUNT;
    
    // move our x and y values depending on what the user did
    switch (key) {
        case 'ArrowUp':
        y = y - MOVE_AMOUNT;
            break;
        case 'ArrowDown':
        y = y + MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
        x = x - MOVE_AMOUNT;
            break;
        case 'ArrowRight':
        x = x + MOVE_AMOUNT;
            break;
        default:
            break;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
};

// Write a handler for the keys (swich statement)
const handleKey = e => {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key});
        console.log(e.key);
        console.log('HANDELING KEY');
        // write our logic in here
    }

};
// Clear / shake function 
const clearCanvas = () => {
    canvas.classList.add('shake');
    ctx.clearRect(0,0, width, height);
    canvas.addEventListener('animationend', () => {
        console.log('SHAKED');
        canvas.classList.remove('shake');
    }, { once: true }
    
    );
}
let myMoveButtons = document.querySelectorAll('.arrow');
const handleMoveButtons = event => {
	draw({ key: event.target.dataset.arrow });
};
myMoveButtons.forEach(button => button.addEventListener('click', handleMoveButtons));
// Listen for arrow keys

window.addEventListener('keydown', handleKey);

shake.addEventListener('click', clearCanvas);