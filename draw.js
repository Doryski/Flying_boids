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
    background(0, 0, 0);

    // if (random(1) < 0.05) {
    //     foods.push(new Food());
    // }
    // if (random(1) < 0.05) {
    //     foods.shift();
    // }
    for (let j of foods) {
        j.show();
    }
    // since then
    for (let i = 0; i < bubbles.length; i++) {
        var targets = [
            createVector(mouseX, mouseY)
        ];
        bubbles[i].move(foods, targets);
        bubbles[i].show();
        for (let other of bubbles) {
            if (bubbles[i] !== other) {
                bubbles[i].avoidOthers(other);
            }
        }
        //     //         bubbles[i].changeDirection();
        //     //         other.changeDirection();
        //     //     }
        //     // }
        // }
    }
}