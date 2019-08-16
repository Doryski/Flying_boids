function Bubble(
    x = random(50, width - 50),
    y = random(50, height - 50)) {
    this.x = x;
    this.y = y;
    this.sideL = 6;
    this.position = createVector(this.x, this.y);
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.acceleration = createVector(0, 0);
    this.maxspeed = 5;
    this.maxforce = 0.2;

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

    this.move = function(toPursue, toAvoid) { //make toAvoid as a list
        this.position.add(this.velocity.x, this.velocity.y);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.acceleration.mult(0);

        for (let i = 0; i < toPursue.length; i++) {
            var desiredDist = this.position.dist(toPursue[i].position);
            var undesiredDist = this.position.dist(toAvoid);
            if (desiredDist >= undesiredDist) {
                this.avoid(toAvoid);
            } else {
                this.pursue(toPursue[i]);
            }
        }
    }

    this.pursue = function(object) {
        var desired = p5.Vector.sub(object.position, this.position);
        desired.setMag(this.maxspeed);
        // steering = desired - velocity
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);

        this.applyForce(steer);

    }

    this.avoid = function(object) {
        var undesired = p5.Vector.sub(this.position, object);
        undesired.setMag(this.maxspeed);

        var steer = p5.Vector.sub(undesired, this.velocity);
        steer.limit(this.maxforce);

        this.applyForce(steer);
    }


    // object needs to have diameter, needs to be round
    this.bounceBall = function() {
        if (this.position.x >= width - this.sideL * 2 || this.position.x <= 0 + this.sideL * 2) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.y >= height - this.sideL * 2 || this.position.y <= 0 + this.sideL * 2) {
            this.velocity.y = -this.velocity.y;
        }
    }

    this.bumpedInto = function(other) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        return (distance < (this.sideL * 2 + other.sideL * 2));
    }

    this.changeDirection = function() {
        this.velocity.x = -this.velocity.x;
        this.velocity.y = -this.velocity.y;

    }

    this.applyForce = function(force) {
        this.acceleration.add(force);
    }
}