import clickOutside from './click-outside'


export default {
    install (app: any) {
        app.directive('click-outside', clickOutside)
    }
}
