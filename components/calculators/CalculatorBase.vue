<template>
    <section class="calculator-component">
        <div
            class="flex flex-col lg:flex-row container w-full gap-8 lg:gap-24 place-content-center"
        >
            <Card
                class="w-11/12 max-w-md mx-auto lg:mx-0 overflow-hidden dark:bg-[rgb(15,15,15)] border border-primary-400"
            >
                <template #header>
                    <div class="border-b border-primary-400">
                        <h2 class="text-xl sm:text-3xl font-bold text-center p-4">
                            {{ title }}
                        </h2>
                    </div>
                </template>
                <template #content>
                    <div class="space-y-4">
                        <slot></slot>
                    </div>
                </template>
                <template #footer>
                    <Button
                        class="w-full mt-3"
                        label="Calculate"
                        icon="pi pi-check"
                        size="large"
                        @click="$emit('calculate')"
                    />
                </template>
            </Card>
            <Card
                class="w-11/12 max-w-md mx-auto lg:mx-0 overflow-hidden border border-primary-400"
            >
                <template #header>
                    <div class="border-b border-primary-400">
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
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    result: {
        type: String,
    },
});
</script>

<style lang="scss">
.calculator-component {
    @apply flex items-center justify-center py-4 lg:py-8;

    .p-card-body,
    .p-card-content {
        height: 100%;
    }
}
</style>
