// runs once
function setup() {
    createCanvas(canvasParams.x, canvasParams.y);
    for (let i = 0; i < numOfBubbles; i++) {
        bubbles[i] = new Bubble();
    }

    for (let i = 0; i < numOfFood; i++) {
        foods[i] = new Food();
    }
}

// draw is infinite loop
function draw() {
    background(255, 255, 255);
    for (let j of foods) {
        j.show();
    }
    for (let i of bubbles) {
        i.move();
        i.show();
        i.bounceBall();
        for (let other of bubbles) {
            if (i !== other && i.bumpedInto(other)) {
                i.changeDirection();
                other.changeDirection();
            }
        }
    }
}