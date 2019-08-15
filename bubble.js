function Bubble(
    x = random(50, width - 50),
    y = random(50, height - 50),
    d = 35) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.r = d / 2;
    this.sideL = 6;
    this.position = createVector(this.x, this.y);
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.acceleration = createVector(0, 0);
    this.maxspeed = 5;

    this.move = function() {
        this.position.add(this.velocity.x, this.velocity.y);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.acceleration.mult(0);
    }

    this.show = function(r = 0, g = 255, b = 0) {
        var angle = this.velocity.heading() + PI / 2;

        push();
        translate(this.position);
        rotate(angle);

        fill(r, g, b);
        noStroke();
        beginShape();
        vertex(0, -this.sideL * 2);
        vertex(-this.sideL, this.sideL * 2);
        vertex(this.sideL, this.sideL * 2);
        endShape(CLOSE);

        pop();
    }

    // object needs to have diameter, need to be round
    this.bounceBall = function() {
        if (this.position.x >= width - this.r || this.position.x <= 0 + this.r) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.y >= height - this.r || this.position.y <= 0 + this.r) {
            this.velocity.y = -this.velocity.y;
        }
    }

    this.bumpedInto = function(other) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        return (distance < (this.r + other.r));
    }

    this.changeDirection = function() {
        this.velocity.x = -this.velocity.x;
        this.velocity.y = -this.velocity.y;

    }
}