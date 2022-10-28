declare var require: any                    // actual solution https://stackoverflow.com/questions/31173738/typescript-getting-error-ts2304-cannot-find-name-require

import esp from './es.json'
import espPlus from './_es'                 // we separate this sections of translations so
// import engPlus from './_en'

export default {
    // es: Object.assign({}, espPlus, require('./es.json')),
    // en: Object.assign({}, engPlus, require('./en.json')),

    es: Object.assign({}, esp, espPlus),
}
