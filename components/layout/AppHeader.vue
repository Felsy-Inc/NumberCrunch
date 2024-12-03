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
                    <DarkModeToggle />
                </template>
            </MegaMenu>
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
                            label: 'Investment',
                            icon: 'pi pi-chart-line',
                            route: '/calculator/investment',
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
                            icon: 'pi pi-chart-bar',
                            route: '/calculator/calories',
                            category: 'health',
                        },
                        {
                            label: 'Heart Rate',
                            icon: 'pi pi-heart',
                            route: '/calculator/heart-rate',
                            category: 'health',
                        },
                        {
                            label: 'Body Fat',
                            icon: 'pi pi-percentage',
                            route: '/calculator/body-fat',
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
                            label: 'Statistics',
                            icon: 'pi pi-chart-pie',
                            route: '/calculator/statistics',
                            category: 'math',
                        },
                        {
                            label: 'Basic Math',
                            icon: 'pi pi-calculator',
                            route: '/calculator/basic-math',
                            category: 'math',
                        },
                        {
                            label: 'Geometry',
                            icon: 'pi pi-th-large',
                            route: '/calculator/geometry',
                            category: 'math',
                        },
                        {
                            label: 'Volume',
                            icon: 'pi pi-box',
                            route: '/calculator/volume',
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
                    label: 'Numbers',
                    items: [
                        {
                            label: 'Number Generator',
                            icon: 'pi pi-hashtag',
                            route: '/randomizer/number',
                        },
                        {
                            label: 'Dice Roll',
                            icon: 'pi pi-stop',
                            route: '/randomizer/dice',
                        },
                        {
                            label: 'Coin Flip',
                            icon: 'pi pi-circle',
                            route: '/randomizer/coin',
                        },
                    ],
                },
            ],
            [
                {
                    label: 'Text',
                    items: [
                        {
                            label: 'Password',
                            icon: 'pi pi-key',
                            route: '/randomizer/password',
                        },
                        {
                            label: 'Lorem Ipsum',
                            icon: 'pi pi-align-left',
                            route: '/randomizer/lorem-ipsum',
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
    @apply relative;

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
