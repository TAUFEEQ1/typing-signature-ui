import PressTime from "./press_time";
import Signature from "./signature";
import UiView from "./ui_view";
class Confidential{
    /**
     * 
     * @param {$<HTMLElement>} el 
     */
    constructor(el){
        this.value = el;
        this.signature = new Signature();
        this.value.on("paste", e => e.preventDefault());
        this.value.on("keydown",(ev)=>{
            this.signature.set(ev.key, new PressTime());
        });
        this.value.on("keyup",(ev)=>{
            this.signature.get(ev.key).stop();
        })
    }
    toValue(){
        return this.value.val();
    }

    toSign(){
        return this.signature.sign(this.toValue());
    }

}
class FormView extends UiView {
    /**
     * 
     * @param {string} id 
     */
    constructor(id){
        super(id);
        this.loader = this.el.find("span[data-content='submit-text']").first();
        const tmp = this.el.find("input[data-confidential='true']").first();
        this.password = new Confidential(tmp);
    }
    load(){
        this.loader.addClass("loading");
    }
    unload(){
        this.loader.removeClass("loading");
    }
    serialize(){
        const data = {};
        this.el.serializeArray().map(function(x){data[x.name] = x.value;});
        data['signature'] = this.password.toSign();
        return data;
    }
    reset(){
        this.el[0].reset()
        this.password.signature.clear();
    }

    submit(callback) {
        this.el.on("submit",(event)=>{
            callback(this);
           event.preventDefault(); 
        });
    }
}
export default FormView;