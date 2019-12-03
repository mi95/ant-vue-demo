import Vue from 'vue'
/* eslint-disable */

/**权限指令**/
const has = Vue.directive('has', {
    inserted: function (el, binding, vnode) {
        if (!Vue.prototype.$_has(binding.value.id,binding.value.btns)) {
            if(el.parentNode != null){
                el.parentNode.removeChild(el);
            }
        }
    }
});
// 权限检查方法
Vue.prototype.$_has = function (id,btns) {
    let isExist = false;
    let btnIds = []
    if (id && btns) {
        btnIds = btns.split(',')
        btnIds.map(item => {
            if(item === id){
                isExist = true 
            }
        })
    }
    return isExist;
};
export { has }