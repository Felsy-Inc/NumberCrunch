export const useCurrencyFormatter = () => {
    const availableCurrencies = [
        { label: 'Euro (EUR)', value: 'EUR' },
        { label: 'US Dollar (USD)', value: 'USD' },
        { label: 'British Pound (GBP)', value: 'GBP' },
        { label: 'Swiss Franc (CHF)', value: 'CHF' },
        { label: 'Japanese Yen (JPY)', value: 'JPY' },
        { label: 'Canadian Dollar (CAD)', value: 'CAD' },
        { label: 'Australian Dollar (AUD)', value: 'AUD' },
        { label: 'Chinese Yuan (CNY)', value: 'CNY' },
        { label: 'Indian Rupee (INR)', value: 'INR' },
        { label: 'Brazilian Real (BRL)', value: 'BRL' },
        { label: 'South African Rand (ZAR)', value: 'ZAR' },
        { label: 'Swedish Krona (SEK)', value: 'SEK' },
        { label: 'Norwegian Krone (NOK)', value: 'NOK' },
        { label: 'Danish Krone (DKK)', value: 'DKK' },
        { label: 'New Zealand Dollar (NZD)', value: 'NZD' },
    ];

    const formatCurrency = (amount: number, currency: string): string => {
        const userLocale = navigator.language || 'en-US';
        return new Intl.NumberFormat(userLocale, {
            style: 'currency',
            currency,
        }).format(amount);
    };

    return {
        formatCurrency,
        availableCurrencies,
    };
};
