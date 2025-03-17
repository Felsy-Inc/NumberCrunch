<template>
    <header class="app-header">
        <div class="app-header-container">
            <MegaMenu :model="items" class="app-header-nav">
                <template #start>
                    <RouterLink to="/">
                        <h1 class="app-header__title">NumberCrunch.io</h1>
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
                    <SettingsButton />
                </template>
            </MegaMenu>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import SettingsButton from '../base/SettingsButton.vue';

const items = ref([
    {
        label: 'Calculators',
        icon: 'pi pi-calculator',
        items: [
            [
                {
                    label: 'Finance & Money',
                    category: 'finance',
                    items: [
                        {
                            label: 'Percentage',
                            icon: 'pi pi-percentage',
                            route: '/calculator/percentage',
                            category: 'finance',
                        },
                        {
                            label: 'Loan',
                            icon: 'pi pi-credit-card',
                            route: '/calculator/loan',
                            category: 'finance',
                        },
                        {
                            label: 'Mortgage',
                            icon: 'pi pi-home',
                            route: '/calculator/mortgage',
                            category: 'finance',
                        },
                        {
                            label: 'Currency',
                            icon: 'pi pi-dollar',
                            route: '/calculator/currency',
                            category: 'finance',
                        },
                    ],
                },
            ],
            [
                {
                    label: 'Health & Fitness',
                    category: 'health',
                    items: [
                        {
                            label: 'BMI',
                            icon: 'pi pi-user',
                            route: '/calculator/bmi',
                            category: 'health',
                        },
                        {
                            label: 'Calories',
                            icon: 'pi pi-apple',
                            route: '/calculator/calories',
                            category: 'health',
                        },
                    ],
                },
            ],
            [
                {
                    label: 'Math & Science',
                    category: 'math',
                    items: [
                        {
                            label: 'Basic Math',
                            icon: 'pi pi-calculator',
                            route: '/calculator/basic-math',
                            category: 'math',
                        },
                        {
                            label: 'Area',
                            icon: 'pi pi-stop',
                            route: '/calculator/area',
                            category: 'math',
                        },
                        {
                            label: 'Volume',
                            icon: 'pi pi-box',
                            route: '/calculator/volume',
                            category: 'math',
                        },
                        {
                            label: 'Conversion',
                            icon: 'pi pi-sync',
                            route: '/calculator/conversion',
                            category: 'math',
                        },
                    ],
                },
            ],
        ],
    },
    {
        label: 'Randomizers',
        icon: 'pi pi-sync',
        items: [
            [
                {
                    label: 'General',
                    items: [
                        {
                            label: 'Random Number',
                            icon: 'pi pi-question',
                            route: '/randomizer/random-number',
                        },
                        {
                            label: 'Coin Flip',
                            icon: 'pi pi-question-circle',
                            route: '/randomizer/coin-flip',
                        },
                        {
                            label: 'Dice Roll',
                            icon: 'pi pi-stop',
                            route: '/randomizer/dice-roll',
                        },
                        {
                            label: 'Team Generator',
                            icon: 'pi pi-users',
                            route: '/randomizer/team-generator',
                        },
                    ],
                },
            ],
        ],
    },
]);
</script>

<style lang="scss">
.app-header {
    @apply relative bg-gradient-to-t from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700;

    &-container {
        @apply py-3 container mx-auto;
    }

    &-nav {
        @apply lg:justify-between gap-8;
    }

    &__title {
        @apply text-2xl sm:text-3xl font-bold text-primary-500 dark:text-primary-400;
    }

    .p-megamenu-horizontal .p-megamenu,
    .p-megamenu {
        @apply border-none bg-transparent;

        .p-megamenu-root-list {
            @media (min-width: 961px) {
                @apply w-full gap-4;
            }
        }

        &-start {
            @apply w-full;
            @media (min-width: 961px) {
                @apply w-auto;
            }
        }

        &-end {
            @apply hidden ml-0 gap-4;
            @media (min-width: 961px) {
                @apply flex;
            }
        }

        &-button {
            @apply h-[32px] w-[38px];
        }
    }
}
</style>
