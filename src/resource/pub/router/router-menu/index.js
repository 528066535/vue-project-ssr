import test from './test';

let component = {};
let router = [];

router = router.concat(test.router);

Object.assign(component, test.component);

export default {
    components: component,
    routers: router
};