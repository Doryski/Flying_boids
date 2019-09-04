function Boid(
    x = random(50, width - 50),
    y = random(50, height - 50)) {
    this.x = x;
    this.y = y;
    this.sideL = 6;
    this.position = createVector(this.x, this.y);
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.acceleration = createVector(0, 0);
    this.maxspeed = 3;
    this.maxforce = this.maxspeed / 6;

    this.avoidRange = 50;
    this.center = createVector(width / 2, height / 2);

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

        // stroke(255);
        // line(0, 0, 0, 30);

        pop();
    }

    this.move = function(toPursue, toAvoid, pursueRange = 50, avoidRange = 60) {
        this.position.add(this.velocity.x, this.velocity.y);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.acceleration.mult(0);
        this.avoidBoundaries();

        for (let i = 0; i < toPursue.length; i++) {
            for (let j = 0; j < toAvoid.length; j++) {
                var undesiredDist = this.position.dist(toAvoid[j]);
                var desiredDist = this.position.dist(toPursue[i].position);
                var objectDist = toAvoid[j].dist(toPursue[i].position);

                var desired = p5.Vector.sub(toPursue[i].position, this.position);
                desired.setMag(this.maxspeed);
                var undesired = p5.Vector.sub(this.position, toAvoid[j]);
                undesired.setMag(this.maxspeed);

                if (
                    (desiredDist < undesiredDist) &&
                    (desiredDist < pursueRange) &&
                    (objectDist > desiredDist)) {
                    // steering = desired - velocity
                    var steer = p5.Vector.sub(desired, this.velocity);
                    steer.limit(this.maxforce);

                    this.applyForce(steer);
                } else if (
                    undesiredDist < avoidRange) {
                    var steer = p5.Vector.sub(undesired, this.velocity);
                    steer.limit(this.maxforce);

                    this.applyForce(steer);
                }
            }
        }
    }

    // avoidboids avoid each other
    this.avoid = function(object, avoidRange = this.sideL * 5) {
        var undesiredDist = this.position.dist(object.position);
        if (undesiredDist < avoidRange) {
            var undesired = p5.Vector.sub(this.position, object.position);
            undesired.setMag(this.maxspeed);
            var steer = p5.Vector.sub(undesired, -this.velocity);
            steer.limit(this.maxforce);

            this.applyForce(steer);
        }
    }

    // boids avoid canvas boundaries
    this.avoidBoundaries = function(avoidRange = this.sideL * 4) {
        if (height - this.position.y < avoidRange && this.position.y < height) {
            let undesired = p5.Vector.sub(this.position,
                createVector(this.position.x, height));
            undesired.setMag(this.maxspeed);
            var steer = p5.Vector.sub(undesired, -this.velocity);
            steer.limit(this.maxforce);

            this.applyForce(steer);
        } else if (width - this.position.x < avoidRange && this.position.x < width) {
            let undesired = p5.Vector.sub(this.position,
                createVector(width, this.position.y));
            undesired.setMag(this.maxspeed);
            var steer = p5.Vector.sub(undesired, -this.velocity);
            steer.limit(this.maxforce);

            this.applyForce(steer);
        } else if (this.position.y - 0 < avoidRange && this.position.y > 0) {
            let undesired = p5.Vector.sub(this.position,
                createVector(this.position.x, 0));
            undesired.setMag(this.maxspeed);
            var steer = p5.Vector.sub(undesired, -this.velocity);
            steer.limit(this.maxforce);

            this.applyForce(steer);
        } else if (this.position.x - 0 < avoidRange && this.position.x > 0) {
            let undesired = p5.Vector.sub(this.position,
                createVector(0, this.position.y));
            undesired.setMag(this.maxspeed);
            var steer = p5.Vector.sub(undesired, -this.velocity);
            steer.limit(this.maxforce);

            this.applyForce(steer);
        } else { this.comeBack() }
    }


    // boids can come back to canvas if went out
    this.comeBack = function() {
        if (this.position.x < 0 || this.position.x > width ||
            this.position.y < 0 || this.position.y > height) {
            var toCenter = p5.Vector.sub(this.center, this.position);
            toCenter.setMag(this.maxspeed);
            var steer = p5.Vector.sub(toCenter, this.velocity);
            steer.limit(this.maxforce);

            this.applyForce(steer);
        }
    }

    // true if boids bumped into each other
    this.bumpedInto = function(other) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        return (distance < (this.sideL * 4 + other.sideL * 4));
    }

    this.changeDirection = function() {
        this.velocity.x *= -1;
        this.velocity.y *= -1;

    }

    this.applyForce = function(force) {
        this.acceleration.add(force);
    }
}