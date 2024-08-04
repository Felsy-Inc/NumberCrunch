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
                    label: 'Mathematical',
                    items: [
                        {
                            label: 'Percentage',
                            icon: 'pi pi-percentage',
                            route: '/calculator/percentage',
                        },
                    ],
                },
            ],
            [
                {
                    label: 'Health',
                    items: [
                        {
                            label: 'BMI',
                            icon: 'pi pi-chart-bar',
                            route: '/calculator/bmi',
                        },
                    ],
                },
            ],
            [
                {
                    label: 'Financial',
                    items: [
                        {
                            label: 'Mortgage',
                            icon: 'pi pi-home',
                            route: '/calculator/mortgage',
                        },
                    ],
                },
            ],
        ],
    },
    // {
    //     label: 'Randomizers',
    //     icon: 'pi pi-sync',
    //     items: [
    //         [
    //             {
    //                 label: 'Basic',
    //                 items: [
    //                     {
    //                         label: 'Addition',
    //                         icon: 'pi pi-plus',
    //                         route: '/calculator/basic/addition',
    //                     },
    //                     {
    //                         label: 'Subtraction',
    //                         icon: 'pi pi-minus',
    //                         route: '/calculator/basic/subtraction',
    //                     },
    //                     {
    //                         label: 'Multiplication',
    //                         icon: 'pi pi-times',
    //                         route: '/calculator/basic/multiplication',
    //                     },
    //                     {
    //                         label: 'Division',
    //                         icon: 'pi pi-divide',
    //                         route: '/calculator/basic/division',
    //                     },
    //                 ],
    //             },
    //         ],
    //         [
    //             {
    //                 label: 'Mathematical',
    //                 items: [
    //                     {
    //                         label: 'Percentage',
    //                         icon: 'pi pi-percentage',
    //                         route: '/calculator/percentage',
    //                     },
    //                     {
    //                         label: 'Square Root',
    //                         icon: 'pi pi-square-root',
    //                         route: '/calculator/square-root',
    //                     },
    //                     {
    //                         label: 'Cube Root',
    //                         icon: 'pi pi-cube',
    //                         route: '/calculator/cube-root',
    //                     },
    //                 ],
    //             },
    //         ],
    //         [
    //             {
    //                 label: 'Health',
    //                 items: [
    //                     {
    //                         label: 'BMI',
    //                         icon: 'pi pi-chart-bar',
    //                         route: '/calculator/bmi',
    //                     },
    //                 ],
    //             },
    //         ],
    //         [
    //             {
    //                 label: 'Utility',
    //                 items: [
    //                     {
    //                         label: 'Mortgage',
    //                         icon: 'pi pi-home',
    //                         route: '/calculator/mortgage',
    //                     },
    //                 ],
    //             },
    //         ],
    //     ],
    // },
]);
</script>

<style lang="scss">
.app-header {
    @apply bg-white dark:bg-black relative;

    &-container {
        @apply py-3 container mx-auto;
    }

    &-nav {
        @apply lg:justify-between;
    }

    &__title {
        @apply text-2xl sm:text-3xl font-bold text-primary-500 dark:text-primary-400;
    }

    .p-megamenu-horizontal .p-megamenu,
    .p-megamenu {
        @apply border-none bg-transparent;

        &-start {
            @apply w-full;
            @media (min-width: 961px) {
                @apply w-auto;
            }
        }

        &-end {
            @apply flex ml-0 gap-4;
        }

        &-button {
            @apply h-[32px] w-[38px];
        }
    }
}
</style>
