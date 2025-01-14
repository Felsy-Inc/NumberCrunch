export const AVAILABLE_CURRENCIES = [
    { label: 'Euro (EUR)', value: 'EUR', symbol: '€' },
    { label: 'US Dollar (USD)', value: 'USD', symbol: '$' },
    { label: 'British Pound (GBP)', value: 'GBP', symbol: '£' },
    { label: 'Swiss Franc (CHF)', value: 'CHF', symbol: 'CHF' },
    { label: 'Japanese Yen (JPY)', value: 'JPY', symbol: '¥' },
    { label: 'Canadian Dollar (CAD)', value: 'CAD', symbol: 'CA$' },
    { label: 'Australian Dollar (AUD)', value: 'AUD', symbol: 'A$' },
    { label: 'Chinese Yuan (CNY)', value: 'CNY', symbol: '¥' },
    { label: 'Indian Rupee (INR)', value: 'INR', symbol: '₹' },
    { label: 'Brazilian Real (BRL)', value: 'BRL', symbol: 'R$' },
    { label: 'South African Rand (ZAR)', value: 'ZAR', symbol: 'R' },
    { label: 'Swedish Krona (SEK)', value: 'SEK', symbol: 'kr' },
    { label: 'Norwegian Krone (NOK)', value: 'NOK', symbol: 'kr' },
    { label: 'Danish Krone (DKK)', value: 'DKK', symbol: 'kr' },
    { label: 'New Zealand Dollar (NZD)', value: 'NZD', symbol: 'NZ$' },
] as const;

export type CurrencyType = (typeof AVAILABLE_CURRENCIES)[number]['value'];
