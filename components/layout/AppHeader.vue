<template>
    <header class="border-b border-gray-200 dark:border-gray-700">
        <div class="app-header py-3 container mx-auto">
            <Menubar :model="items" class="lg:justify-between">
                <template #start>
                    <RouterLink to="/">
                        <h1
                            class="text-2xl sm:text-3xl font-bold text-primary-500 dark:text-primary-400"
                        >
                            NumberCrunch.io
                        </h1>
                    </RouterLink>
                </template>
                <template #item="{ item, props, hasSubmenu }">
                    <RouterLink
                        v-if="item.route"
                        v-slot="{ href, navigate }"
                        :to="item.route"
                        custom
                    >
                        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </RouterLink>
                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
                    </a>
                </template>
                <template #buttonicon>
                    <i class="pi pi-bars text-xl" />
                </template>
                <template #end>
                    <DarkModeToggle />
                </template>
            </Menubar>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import DarkModeToggle from '../base/DarkModeToggle.vue';

const items = ref([
    {
        label: 'Calculators',
        icon: 'pi pi-calculator',
        items: [
            // {
            //     label: 'Basic',
            //     icon: 'pi pi-dollar',
            //     route: '/calculator/basic',
            // },
            // {
            //     label: 'BMI',
            //     icon: 'pi pi-chart-bar',
            //     route: '/calculator/bmi',
            // },
            // {
            //     label: 'Mortgage',
            //     icon: 'pi pi-home',
            //     route: '/calculator/mortgage',
            // },
            // {
            //     label: 'Currency',
            //     icon: 'pi pi-money-bill',
            //     route: '/currency-converter',
            // },
            {
                label: 'Percentage',
                icon: 'pi pi-percentage',
                route: '/calculator/percentage',
            },
        ],
    },
    {
        label: 'Randomizers',
        icon: 'pi pi-sync',
        items: [
            {
                label: 'Random Number',
                icon: 'pi pi-sort-numeric-down',
                route: '/randomizer/number',
            },
            // {
            //     label: 'Random Letter',
            //     icon: 'pi pi-sort-alpha-down',
            //     route: '/randomizer/letter',
            // },
        ],
    },
]);
</script>

<style lang="scss">
.app-header {
    .p-menubar {
        border: none;
        background-color: transparent;

        &-start {
            width: 100%;
            @media (min-width: 1024px) {
                width: auto;
            }
        }

        &-end {
            margin-left: 0;
        }

        &-button {
            height: 32px;
            width: 38px;
        }
    }
}
</style>
