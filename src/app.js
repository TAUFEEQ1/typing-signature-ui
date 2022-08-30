import UiView from "./ui_view";
import FormView from "./form_view";
import router, { addRoute } from "./router";
import $ from "jquery";

const lgIn = new FormView("login-form");
const scQn = new FormView("secret-qn");
const signUp = new FormView("register");
const suclg = new UiView("success-lgn");

const Utils = {
    /**
     * @param {FormView} fm
     */
    onlogin:(fm)=>{
        fm.load();
        $.ajax({
            type:"POST",
            url:process.env.API_URL+"/login",
            data:JSON.stringify(fm.serialize()),
            contentType:'application/json'
        }).done((data)=>{
            fm.unload();
            suclg.el.find("#welcome").html("Welcome ,"+data);
            // fm.reset();
            router.set("/home");
            fm.reset();
        }).fail((xhr)=>{
            fm.unload();
            if (xhr.status == 401) {
                alert("invalid credentials");
                fm.reset();
            }
            if (xhr.status == 433) {
                router.set("/secret");
            }
        });
    },
    /**
     * @param {FormView} fm
     */
    onanswer:(fm)=>{
        fm.load();
        const apidata = {...fm.serialize(),...lgIn.serialize()}
        delete apidata['signature'];
        $.ajax({
            type:"POST",
            url:process.env.API_URL+"/login",
            data:JSON.stringify(apidata),
            contentType:"application/json"
        }).done((data)=>{
            fm.unload();
            suclg.el.find("#welcome").html("Welcome, "+data);
            router.set("/home");
        }).fail(()=>{
            fm.reset();
            fm.unload();
        })
    },
    /**
     * 
     * @param {FormView} fm 
     */
    onregister(fm){
        fm.load();
        $.ajax({
            type:"POST",
            url:process.env.API_URL+"/register",
            data:JSON.stringify(fm.serialize()),
            contentType:"application/json"
        }).done(()=>{
            fm.unload();
            router.set("/");
        })
    }
}

lgIn.submit(Utils.onlogin);
scQn.submit(Utils.onanswer);
signUp.submit(Utils.onregister);
const views = {
    active:lgIn
}
addRoute(views,{path:"/",view:lgIn});
addRoute(views,{path:'/register',view:signUp});
addRoute(views,{path:"/secret",view:scQn});
addRoute(views,{path:"/home",view:suclg});
function toRegister(){
    router.set("/register");
}
function toLogOut(){
    router.set("/");
}
window.toRegister = toRegister;
window.toLogOut = toLogOut;