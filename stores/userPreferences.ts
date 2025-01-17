import { defineStore } from 'pinia';
import type { CurrencyType } from '@/constants/currencies';
import { ref, computed, onMounted } from 'vue';

export const useUserPreferencesStore = defineStore('userPreferences', () => {
    const currency = ref<CurrencyType>('USD');

    function setCurrency(newCurrency: CurrencyType) {
        currency.value = newCurrency;
        localStorage.setItem('currency', newCurrency);
    }

    function detectUserCurrency(): CurrencyType {
        const userLocale = navigator.language;
        const currencyMap: Record<string, CurrencyType> = {
            // North America
            'en-US': 'USD',
            'en-CA': 'CAD',
            'fr-CA': 'CAD',

            // Europe
            'en-GB': 'GBP',
            'de-CH': 'CHF',
            'fr-CH': 'CHF',
            'it-CH': 'CHF',
            de: 'EUR',
            fr: 'EUR',
            it: 'EUR',
            es: 'EUR',
            nl: 'EUR',
            pt: 'EUR',
            el: 'EUR',
            fi: 'EUR',
            'sv-SE': 'SEK',
            'nb-NO': 'NOK',
            'nn-NO': 'NOK',
            'da-DK': 'DKK',

            // Asia Pacific
            'ja-JP': 'JPY',
            'zh-CN': 'CNY',
            'zh-Hans': 'CNY',
            'en-AU': 'AUD',
            'en-NZ': 'NZD',
            'en-IN': 'INR',
            'hi-IN': 'INR',

            // South America
            'pt-BR': 'BRL',

            // Africa
            'en-ZA': 'ZAR',
            'af-ZA': 'ZAR',

            // Default fallbacks for language-only codes
            en: 'USD',
            zh: 'CNY',
            ja: 'JPY',
            hi: 'INR',
            af: 'ZAR',
        };

        return currencyMap[userLocale] || currencyMap[userLocale.split('-')[0]] || 'USD';
    }

    function initializePreferences() {
        const savedCurrency = localStorage.getItem('currency') as CurrencyType;

        if (savedCurrency) {
            currency.value = savedCurrency;
        } else {
            currency.value = detectUserCurrency();
        }
    }

    onMounted(() => {
        initializePreferences();
    });

    return {
        currency,
        setCurrency,
    };
});
