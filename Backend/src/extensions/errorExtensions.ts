export class BadRequest extends Error {
    constructor(msg?: string) {
        super(msg);

        Object.setPrototypeOf(this, BadRequest.prototype);
    }
}

export class NotFound extends Error {
    constructor(msg?: string) {
        super(msg);

        Object.setPrototypeOf(this, NotFound.prototype);
    }
}