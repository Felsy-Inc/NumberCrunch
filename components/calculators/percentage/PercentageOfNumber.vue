<template>
    <section class="pon-component flex items-center justify-center py-11 lg:py-20 bg-primary-800">
        <div
            class="flex flex-col lg:flex-row container w-full gap-8 lg:gap-24 place-content-center"
        >
            <Card class="w-11/12 max-w-md mx-auto lg:mx-0 overflow-hidden border">
                <template #header>
                    <div class="border-b">
                        <h2 class="text-xl sm:text-3xl font-bold text-center p-4">
                            Percentage of a number
                        </h2>
                    </div>
                </template>
                <template #content>
                    <div class="space-y-4">
                        <div>
                            <label for="percentage" class="block font-semibold">Percentage</label>
                            <InputGroup class="mt-2">
                                <InputNumber
                                    id="percentage"
                                    v-model="percentage"
                                    placeholder="Enter a percentage"
                                    :minFractionDigits="0"
                                    :maxFractionDigits="5"
                                    :useGrouping="false"
                                />
                                <InputGroupAddon>%</InputGroupAddon>
                            </InputGroup>
                        </div>
                        <div>
                            <label for="number" class="block font-semibold">Number</label>
                            <InputGroup class="mt-2">
                                <InputNumber
                                    id="number"
                                    v-model="number"
                                    placeholder="Enter a number"
                                    :minFractionDigits="0"
                                    :maxFractionDigits="5"
                                    :useGrouping="false"
                                />
                            </InputGroup>
                        </div>
                    </div>
                </template>
                <template #footer>
                    <Button
                        class="w-full mt-3"
                        label="Calculate"
                        icon="pi pi-check"
                        size="large"
                        @click="calculatePercentage"
                    />
                </template>
            </Card>
            <Card class="w-11/12 max-w-md mx-auto lg:mx-0 overflow-hidden border">
                <template #header>
                    <div class="border-b">
                        <h2 class="text-xl sm:text-3xl font-bold text-center p-4">Result</h2>
                    </div>
                </template>
                <template #content>
                    <p
                        v-if="result"
                        class="text-2xl md:text-5xl text-primary-500 dark:text-primary-400 font-semibold h-full text-center content-center"
                    >
                        {{ result }}
                    </p>
                </template>
            </Card>
        </div>
    </section>
</template>

<script setup>
import Card from 'primevue/card';
import { ref } from 'vue';

const number = ref(null);
const percentage = ref(null);
const result = ref(null);

const calculatePercentage = () => {
    if (number.value !== null && percentage.value !== null) {
        let _result = (number.value * (percentage.value / 100)).toFixed(2);
        result.value = parseFloat(_result).toString();
    } else {
        result.value = null;
    }
};
</script>

<style lang="scss">
.pon-component {
    .p-card-body,
    .p-card-content {
        height: 100%;
    }
}
</style>
