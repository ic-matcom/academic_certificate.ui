import { createI18n } from 'vue-i18n'
import locales from '@/services/i18n/locales'

/**
 * We export this so we can use it in external JS component with the global configurations
 * https://stackoverflow.com/questions/57049471/problem-to-use-vuei18n-outside-a-component
 */
export const i18n = createI18n({
    // locale: 'en',                                      // set locale
    // fallbackLocale: 'es',                              // set fallback locale

    legacy: false,
    locale: 'es',
    fallbackLocale: 'en',
    messages: locales
})
