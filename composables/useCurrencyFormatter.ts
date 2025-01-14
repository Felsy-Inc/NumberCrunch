export const useCurrencyFormatter = () => {
    const formatCurrency = (amount: number, currency: string): string => {
        const userLocale = navigator.language || 'en-US';
        return new Intl.NumberFormat(userLocale, {
            style: 'currency',
            currency,
        }).format(amount);
    };

    return {
        formatCurrency,
    };
};
