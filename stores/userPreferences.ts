import { defineStore } from 'pinia';
import type { CurrencyType } from '@/constants/currencies';
import { ref, computed, onMounted } from 'vue';

export const useUserPreferencesStore = defineStore('userPreferences', () => {
    const currency = ref<CurrencyType>('USD');
    const theme = ref<'dark' | 'light' | 'system'>('system');

    function setCurrency(newCurrency: CurrencyType) {
        currency.value = newCurrency;
        localStorage.setItem('currency', newCurrency);
    }

    function setTheme(newTheme: 'dark' | 'light' | 'system') {
        theme.value = newTheme;
        localStorage.setItem('theme', newTheme);
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
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | 'system';

        if (savedCurrency) {
            currency.value = savedCurrency;
        } else {
            currency.value = detectUserCurrency();
        }

        if (savedTheme) theme.value = savedTheme;
    }

    const isDarkMode = computed(() =>
        theme.value === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
            : theme.value === 'dark'
    );

    onMounted(() => {
        initializePreferences();
    });

    return {
        currency,
        theme,
        setCurrency,
        setTheme,
        isDarkMode,
    };
});
