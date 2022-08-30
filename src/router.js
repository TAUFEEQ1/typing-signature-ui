import { Router } from 'silkrouter';
import {operators} from "silkrouter";
const router = new Router({
    hashRouting:true
});

export const addRoute = (views,{path,view})=>{
    router.pipe(operators.route(path)).subscribe(()=>{
        views.active.hide();
        views.active = view;
        views.active.show();
    })
}
export default router;