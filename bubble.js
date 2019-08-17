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
    this.maxforce = 0.1;

    this.avoidRange = 150;

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
        // this.avoid(toAvoid);
        for (let i = 0; i < toPursue.length; i++) {
            // this.pursue(toPursue[i]);
            var undesiredDist = this.position.dist(toAvoid);
            var desiredDist = this.position.dist(toPursue[i].position);
            var objectDist = toAvoid.dist(toPursue[i].position);

            var desired = p5.Vector.sub(toPursue[i].position, this.position);
            desired.setMag(this.maxspeed);
            //map(desired, 0, this.maxforce, desiredDist, 0) as setMag();
            var undesired = p5.Vector.sub(this.position, toAvoid);
            undesired.setMag(this.maxspeed);

            if (
                (desiredDist < undesiredDist) &&
                (objectDist > desiredDist)) {
                // steering = desired - velocity
                var steer = p5.Vector.sub(desired, this.velocity);
                steer.limit(this.maxforce);

                this.applyForce(steer);
            } else if (
                (desiredDist < undesiredDist && undesiredDist < this.avoidRange) ||
                (undesiredDist < this.avoidRange)) {
                var steer = p5.Vector.sub(undesired, this.velocity);
                steer.limit(this.maxforce);

                this.applyForce(steer);
            }
        }

        // for (let j = 0; j < toAvoid.length; j++{
        //     this.avoid(toAvoid[j]);
        // }
    }

    // this.avoid = function(object) {
    //     var undesiredDist = this.position.dist(object);
    //     if (undesiredDist < 200) {
    //         var undesired = p5.Vector.sub(this.position, object);
    //         undesired.setMag(this.maxspeed);
    //         var steer = p5.Vector.sub(undesired, this.velocity);
    //         steer.limit(this.maxforce);

    //         this.applyForce(steer);
    //     }
    // }
    // this.pursue = function(object) {
    //     var desiredDist = this.position.dist(object.position);
    //     if (desiredDist < 100) {
    //         var desired = p5.Vector.sub(object.position, this.position);
    //         desired.setMag(this.maxspeed);
    //         // steering = desired - velocity
    //         var steer = p5.Vector.sub(desired, this.velocity);
    //         steer.limit(this.maxforce);

    //         this.applyForce(steer);
    //     }
    // }

    this.bounce = function() {
        if (this.position.x >= width - this.sideL * 2 || this.position.x <= 0 + this.sideL * 2) {
            this.velocity.x *= -1;
        }
        if (this.position.y >= height - this.sideL * 2 || this.position.y <= 0 + this.sideL * 2) {
            this.velocity.y *= -1;
        }
    }

    this.avoidBoundaries = function() {
        boundaries = [createVector(0, this.position.y),
            createVector(width, this.position.y),
            createVector(this.position.x, 0),
            createVector(this.position.x, height)
        ];
        for (i = 0; i < boundaries.length; i++) {
            var undesiredDist = this.position.dist(boundaries[i]);
            var avoidRange = this.sideL * 4;
            if (undesiredDist < avoidRange) {
                var undesired = p5.Vector.sub(this.position, boundaries[i]);
                undesired.setMag(this.maxspeed);
                var steer = p5.Vector.sub(undesired, this.velocity);
                steer.limit(this.maxforce);

                this.applyForce(steer);
            }
        }
    }

    this.bumpedInto = function(other) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        return (distance < (this.sideL * 2 + other.sideL * 2));
    }

    this.changeDirection = function() {
        this.velocity.x *= -1;
        this.velocity.y *= -1;

    }

    this.applyForce = function(force) {
        this.acceleration.add(force);
    }
}