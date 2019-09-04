function Food(
    x = random(50, width - 50),
    y = random(50, height - 50),
    d = 10
) {
    this.position = createVector(x, y);
    this.d = d;


    this.show = function(r = 0, g = 0, b = 255) {
        fill(r, g, b);
        noStroke();
        ellipse(this.position.x, this.position.y, this.d, this.d);
    }


}