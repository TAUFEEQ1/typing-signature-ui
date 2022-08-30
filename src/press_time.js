class PressTime {
    constructor() {
        this.start = new Date().getTime();
    }
    stop() {
        this.end = new Date().getTime();
    }
    duration() {
        return this.end - this.start;
    }
}
export default PressTime;