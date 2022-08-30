
class Signature {
    constructor() {
        this.data = {};
    }
    set(key, value) {
        this.data[key] = value;
    }
    get(key) {
        return this.data[key];
    }
    /**
     * 
     * @param {string} value 
     * @returns 
     */
    sign(value) {
        return value.split("").map(k => {
            return this.get(k).duration();
        });
    }
    clear() {
        this.data = {};
    }
}
export default Signature;