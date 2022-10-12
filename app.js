const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const linewidth = document.querySelector('#line_width');
const linecolor = document.querySelector('#line_color');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const modeBtn = document.querySelector('#mode_btn');
const destroyBtn = document.querySelector('#destroy_btn');
const eraserBtn = document.querySelector('#eraser_btn');
const imageFile = document.querySelector('#file');
const textInput = document.querySelector('#text');
const saveBtn = document.querySelector('#save');
const textSize = document.querySelector('#text_size');
const font1 = document.querySelector('#font1');
const font2 = document.querySelector('#font2');
const font3 = document.querySelector('#font3');
const ratio1 = document.querySelector('#ratio1');
const ratio2 = document.querySelector('#ratio2');
const ratio3 = document.querySelector('#ratio3');

let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = linewidth.value;
ctx.lineCap = 'round';
let isPainting = false;
let isFilling = false;
let size = textSize.value;
let nowFont = 'serif';

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return
    };
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
    isPainting = true;
}

function stopPainting() {
    isPainting = false;
    ctx.beginPath();
}

function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onLineColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    linecolor.value = colorValue;
}

function onRatioChange1() {
    CANVAS_WIDTH = 880;
    CANVAS_HEIGHT = 660;
}

function onRatioChange2() {
    CANVAS_WIDTH = 960;
    CANVAS_HEIGHT = 540;
}

function onRatioChange3() {
    CANVAS_WIDTH = 800;
    CANVAS_HEIGHT = 800;
}

function onRatioChange() {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.style.width = `${CANVAS_WIDTH}px`;
    canvas.style.height = `${CANVAS_HEIGHT}px`;
    ctx.strokeStyle = linecolor.value;
    ctx.fillStyle = linecolor.value;
    ctx.lineWidth = linewidth.value;
    ctx.lineCap = 'round';
}

function onModeClick() {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerHTML = 'Fill';
    } else {
        isFilling = true;
        modeBtn.innerHTML = 'Draw';
    }
}

function onDestroyBtn() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserBtn() {
    ctx.strokeStyle = 'white';
    linecolor.value = '#ffffff';
    isFilling = false;
    modeBtn.innerHTML = 'Fill';
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        imageFile.value = null;
    };
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== '') {
        // save()를하면 restore() 사이의 코드가 실행되기전에 현재 상태와 선택들을 저장한다.
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = `${size}px ${nowFont}`;
        // offsetX, offsetY는 마우스가 클릭한 canvas내의 좌표
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = 'myDrawing.png';
    a.click();
}

function onTextSizeChange(event) {
    size = event.target.value;
}

function onFontChange1() {
    nowFont = 'Arial';
}

function onFontChange2() {
    nowFont = 'italic';
}

function onFontChange3() {
    nowFont = 'Courier New';
}

// canvas.onmousemove = onMove;
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousedown', onCanvasClick);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('dblclick', onDoubleClick);

linecolor.addEventListener('change', onLineColorChange);
linewidth.addEventListener('change', onLineWidthChange);
colorOptions.forEach(color => color.addEventListener('click', onColorClick));

ratio1.addEventListener('click', onRatioChange1);
ratio1.addEventListener('click', onRatioChange);
ratio2.addEventListener('click', onRatioChange2);
ratio2.addEventListener('click', onRatioChange);
ratio3.addEventListener('click', onRatioChange3);
ratio3.addEventListener('click', onRatioChange);
modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyBtn);
eraserBtn.addEventListener('click', onEraserBtn);

imageFile.addEventListener('change', onFileChange);
textSize.addEventListener('change', onTextSizeChange);
saveBtn.addEventListener('click', onSaveClick);

font1.addEventListener('click', onFontChange1);
font2.addEventListener('click', onFontChange2);
font3.addEventListener('click', onFontChange3);