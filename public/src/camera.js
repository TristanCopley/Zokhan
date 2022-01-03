class Camera {

    constructor() {

        this.position = {

            x: 0,
            y: 0

        };

        this.velocity = {

            x: 0,
            y: 0

        };

        this.acceleration = {

            x: 0,
            y: 0

        };

        this.shake = {

            x: 0,
            y: 0,
            amplitude: 0

        };

        this.target = {

            x: 0,
            y: 0

        };

    };

    positionCamera() {

        this.position.current.x = this.target.x;
        this.position.current.y = this.target.y;

    };

}