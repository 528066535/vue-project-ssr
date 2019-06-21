import test from './test';
import home from './home';

let component = {};
let router = [];

router = router.concat(test.router);
router = router.concat(home.router);

Object.assign(component, test.component);
Object.assign(component, home.component);

export default {
    components: component,
    routers: router
};