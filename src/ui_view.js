import $ from "jquery";
class UiView {
    /**
     * 
     * @param {string} id 
     */
    constructor(id) {
        this.el = $('#' + id);
    }
    show() {
        this.el.show(400);
    }
    hide() {
        this.el.hide(400);
    }
}
export default UiView;