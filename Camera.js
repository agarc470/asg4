class Camera {
    constructor() {
        this.eye = new Vector3([0, 0, -2]); // position of the camera
        this.at = new Vector3([0, 0, 100]); // where the camera is looking
        this.up = new Vector3([0, 1, 0]); // up direction
        this.rotationAngle = 50; // degrees for rotation
        this.movementScale = .25; // scale factor for movement step size
    }

    setMovementScale(scale) {
        this.movementScale = scale;
    }

    forward() {
        let f = new Vector3(this.at.elements).sub(this.eye).normalize().mul(this.movementScale);
        this.at.add(f);
        this.eye.add(f);
    }

    back() {
        let f = new Vector3(this.eye.elements).sub(this.at).normalize().mul(this.movementScale);
        this.at.add(f);
        this.eye.add(f);
    }

    left() {
        let f = new Vector3(this.at.elements).sub(this.eye).normalize();
        let s = Vector3.cross(this.up, f).normalize().mul(this.movementScale);
        this.at.add(s);
        this.eye.add(s);
    }

    right() {
        let f = new Vector3(this.at.elements).sub(this.eye).normalize();
        let s = Vector3.cross(f, this.up).normalize().mul(this.movementScale);
        this.at.add(s);
        this.eye.add(s);
    }

    panLeft() {
        this.rotate(this.rotationAngle);
    }

    panRight() {
        this.rotate(-this.rotationAngle);
    }

    rotate(angleDegrees) {
        const radians = angleDegrees * Math.PI / 180;
        const direction = new Vector3(this.at.elements).sub(this.eye).normalize();
        const axis = this.up;  

        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(radians, axis.elements[0], axis.elements[1], axis.elements[2]);

        let rotatedDirection = rotationMatrix.multiplyVector3(direction);

        this.at = new Vector3(this.eye.elements).add(rotatedDirection);
    }
    
    getPosition() {
        return {
            x: this.eye.elements[0],
            y: this.eye.elements[1],
            z: this.eye.elements[2]
        };
    }
    getForwardVector() {
        return new Vector3(this.at.elements).sub(this.eye).normalize();
    }
}
