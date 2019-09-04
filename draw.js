// runs once
function setup() {
    createCanvas(canvasParams.x, canvasParams.y);
    for (let i = 0; i < numOfBoids; i++) {
        boids[i] = new Boid();
    }

    for (let i = 0; i < numOfFood; i++) {
        foods[i] = new Food();
    }
}

// draw is infinite loop
function draw() {
    background(0, 0, 0);

    for (let j of foods) {
        j.show();
        for (let i = 0; i < boids.length; i++) {
            var targets = [
                createVector(mouseX, mouseY)
            ];
            boids[i].move(foods, targets);
            boids[i].show();
            for (let other of boids) {
                if (boids[i] !== other) {
                    if (boids[i].position.dist(j.position) < 50) {
                        other.avoid(j, avoidRange = 100);
                    } else {
                        boids[i].avoid(other);
                    }
                }
            }
        }
    }
}