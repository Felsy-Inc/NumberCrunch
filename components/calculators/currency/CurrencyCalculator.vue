<template>
    <CalculatorBase
        color="emerald"
        icon="pi pi-dollar"
        title="Currency Converter"
        :can-calculate="isFormValid"
        :explanation="explanation"
        :history="history"
        :result="result"
        :result-formula="resultFormula"
        @calculate="calculate"
        @clear="resetForm"
    >
        <template #content>
            <form @submit.prevent="calculate" class="calculator-base__form">
                <div class="form-group">
                    <label class="form__label">Amount</label>
                    <InputNumber
                        v-model="formData.amount"
                        class="form__input"
                        placeholder="Enter amount"
                        mode="currency"
                        :currency="formData.fromCurrency"
                        :min="0"
                        @input="(e) => (formData.amount = Number(e.value))"
                    />
                </div>

                <div class="form-group">
                    <label class="form__label">From Currency</label>
                    <Dropdown
                        v-model="formData.fromCurrency"
                        :options="availableCurrencies"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select currency"
                        class="form__input"
                    />
                </div>

                <div class="form-group">
                    <label class="form__label">To Currency</label>
                    <Dropdown
                        v-model="formData.toCurrency"
                        :options="availableCurrencies"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select currency"
                        class="form__input"
                    />
                </div>
            </form>
        </template>
    </CalculatorBase>
</template>

<script setup lang="ts">
import CalculatorBase from '~/components/calculators/CalculatorBase.vue';
import { ref, computed, watch } from 'vue';
import { useCurrencyFormatter } from '~/composables/useCurrencyFormatter';
import { useFormValidation } from '~/composables/useFormValidation';
import { useUserPreferencesStore } from '~/stores/userPreferences';
import { AVAILABLE_CURRENCIES } from '~/constants/currencies';

// Types
interface CurrencyFormData {
    amount: number | null;
    fromCurrency: string;
    toCurrency: string;
}

interface Currency {
    label: string;
    value: string;
    symbol: string;
}

// Meta
const explanation = `
<p>This calculator converts between different currencies using real-time exchange rates.</p>
<p>The exchange rates are updated regularly from a reliable source.</p>
`;

// Refs
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);
const exchangeRates = ref<Record<string, number>>({});

// Composables and store
const userPreferences = useUserPreferencesStore();
const { formatCurrency } = useCurrencyFormatter();
const { validateForm } = useFormValidation();

// Initial form state
const formData = ref<CurrencyFormData>({
    amount: null,
    fromCurrency: userPreferences.currency,
    toCurrency: '',
});

// Watch for changes in user preferences
watch(
    () => userPreferences.currency,
    (newCurrency) => {
        formData.value.fromCurrency = newCurrency;
    },
    { immediate: true }
);

// Available currencies
const availableCurrencies = ref<Currency[]>([...AVAILABLE_CURRENCIES]);

// Computed
const isFormValid = computed(() => {
    return validateForm({
        amount: (formData.value.amount ?? 0) > 0,
        fromCurrency: !!formData.value.fromCurrency,
        toCurrency: !!formData.value.toCurrency,
    });
});

// Methods
const fetchExchangeRates = async (baseCurrency: string) => {
    try {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${
                useRuntimeConfig().public.exchangeRateApiKey
            }/latest/${baseCurrency}`
        );
        const data = await response.json();
        exchangeRates.value = data.conversion_rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
};

const calculate = async () => {
    if (!isFormValid.value) return;

    await fetchExchangeRates(formData.value.fromCurrency);

    const { amount, fromCurrency, toCurrency } = formData.value;
    const rate = exchangeRates.value[toCurrency];
    const convertedAmount = (amount as number) * rate;

    result.value = formatCurrency(convertedAmount, toCurrency);
    resultFormula.value = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;

    history.value = [
        `${formatCurrency(amount as number, fromCurrency)} = ${formatCurrency(
            convertedAmount,
            toCurrency
        )}`,
        ...history.value.slice(0, 4),
    ];
};

const resetForm = () => {
    formData.value = {
        amount: null,
        fromCurrency: userPreferences.currency,
        toCurrency: '',
    };
    result.value = undefined;
    resultFormula.value = undefined;
};
</script>
