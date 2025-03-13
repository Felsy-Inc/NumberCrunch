<template>
    <div class="calculator">
        <div class="calculator__container">
            <div class="calculator__search">
                <div class="calculator__search-wrapper">
                    <i class="pi pi-search calculator__search-icon"></i>
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Search calculators..."
                        class="calculator__search-input"
                    />
                    <button
                        v-if="searchQuery"
                        @click="clearSearch"
                        class="calculator__search-clear"
                        aria-label="Clear search"
                    >
                        <i class="pi pi-times"></i>
                    </button>
                </div>
            </div>

            <template v-if="hasResults">
                <div
                    v-for="(category, categoryIndex) in filteredCategories"
                    :key="categoryIndex"
                    class="calculator__category-container"
                >
                    <div class="calculator__category-header">
                        <div class="calculator__category-info">
                            <h2 class="calculator__category-title">
                                {{ category.name }}
                            </h2>
                            <p class="calculator__category-description">
                                {{ category.description }}
                            </p>
                        </div>
                    </div>

                    <div class="calculator__grid">
                        <router-link
                            v-for="calc in getFilteredCalculators(category)"
                            :key="calc.title"
                            :to="
                                calc.enabled
                                    ? `/${category.type}/${calc.title
                                          .toLowerCase()
                                          .replace(/\s+/g, '-')}`
                                    : ''
                            "
                            class="calculator__card"
                            :class="[
                                `calculator__card--${category.color}`,
                                { 'calculator__card--disabled': !calc.enabled },
                            ]"
                            @click.prevent="!calc.enabled && $event.preventDefault()"
                        >
                            <div class="calculator__card-content">
                                <div
                                    class="calculator__icon-wrapper"
                                    :class="`calculator__icon-wrapper--${category.color}`"
                                >
                                    <i :class="['calculator__icon', calc.icon]"></i>
                                </div>
                                <div class="calculator__text">
                                    <h3 class="calculator__card-title">
                                        {{ calc.title }}
                                    </h3>
                                    <p class="calculator__card-description">
                                        {{ calc.description }}
                                    </p>
                                </div>
                            </div>
                            <div v-if="!calc.enabled" class="calculator__overlay">
                                <span>Coming Soon</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </template>

            <div v-else class="calculator__no-results">
                <i class="pi pi-search calculator__no-results-icon"></i>
                <p>No calculators found for "{{ searchQuery }}"</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

const categories = [
    {
        name: 'Finance & Money',
        color: 'emerald',
        description:
            'Calculate your financial future with our comprehensive money management tools',
        type: 'calculator',
        calculators: [
            {
                title: 'Percentage',
                icon: 'pi pi-percentage',
                description: 'Find percentages, calculate tips, and determine ratios easily',
                enabled: true,
            },
            {
                title: 'Loan',
                icon: 'pi pi-credit-card',
                description: 'Calculate monthly payments, interest rates, and loan terms',
                enabled: true,
            },
            {
                title: 'Mortgage',
                icon: 'pi pi-home',
                description: 'Estimate mortgage payments and compare different loan options',
                enabled: true,
            },
            {
                title: 'Currency',
                icon: 'pi pi-dollar',
                description: 'Convert between different currencies with live rates',
                enabled: true,
            },
        ],
    },
    {
        name: 'Health & Fitness',
        color: 'rose',
        description: 'Track your wellness journey with our health and fitness calculators',
        type: 'calculator',
        calculators: [
            {
                title: 'BMI',
                icon: 'pi pi-user',
                description: 'Calculate Body Mass Index and ideal weight range',
                enabled: true,
            },
            {
                title: 'Calories',
                icon: 'pi pi-apple',
                description: 'Track daily calories and calculate meal portions',
                enabled: true,
            },
        ],
    },
    {
        name: 'Math & Science',
        color: 'primary',
        description: 'Solve complex calculations with our mathematical and scientific tools',
        type: 'calculator',
        calculators: [
            {
                title: 'Basic Math',
                icon: 'pi pi-calculator',
                description: 'Perform basic arithmetic and mathematical operations',
                enabled: true,
            },
            {
                title: 'Area',
                icon: 'pi pi-stop',
                description: 'Find areas of different geometric shapes and figures',
                enabled: true,
            },
            {
                title: 'Volume',
                icon: 'pi pi-box',
                description: 'Calculate volumes of 3D shapes and containers',
                enabled: true,
            },
            {
                title: 'Conversion',
                icon: 'pi pi-sync',
                description: 'Convert between different units of measurement',
                enabled: true,
            },
        ],
    },
    {
        name: 'Randomizers',
        color: 'purple',
        description: 'Generate random numbers and data with our randomizer tools',
        type: 'randomizer',
        calculators: [
            {
                title: 'Random Number',
                icon: 'pi pi-question',
                description: 'Generate random numbers',
                enabled: true,
            },
            {
                title: 'Coin Flip',
                icon: 'pi pi-question-circle',
                description: 'Flip a coin',
                enabled: true,
            },
            {
                title: 'Dice Roll',
                icon: 'pi pi-stop',
                description: 'Roll a die',
                enabled: true,
            },
            {
                title: 'Team Generator',
                icon: 'pi pi-users',
                description: 'Generate a random team',
                enabled: true,
            },
        ],
    },
];

const clearSearch = () => {
    searchQuery.value = '';
};

const getFilteredCalculators = (category) => {
    if (!searchQuery.value) return category.calculators;

    const query = searchQuery.value.toLowerCase();
    return category.calculators.filter(
        (calc) =>
            calc.title.toLowerCase().includes(query) ||
            calc.description.toLowerCase().includes(query)
    );
};

const filteredCategories = computed(() => {
    if (!searchQuery.value) return categories;
    return categories.filter((category) => getFilteredCalculators(category).length > 0);
});

const hasResults = computed(() => {
    return filteredCategories.value.some((category) => getFilteredCalculators(category).length > 0);
});
</script>

<style lang="scss">
.calculator {
    @apply w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 
         dark:from-gray-900 dark:to-gray-800;

    &__container {
        @apply max-w-7xl mx-auto px-4 space-y-8;
    }

    &__search {
        @apply mb-8 px-4;
    }

    &__search-wrapper {
        @apply relative max-w-2xl mx-auto 
           bg-white rounded-2xl
           shadow-sm
           transition-shadow duration-300
           hover:shadow-md
           dark:bg-gray-800;

        &:focus-within {
            @apply shadow-md ring-2 ring-blue-100
             dark:ring-blue-900/30;
        }
    }

    &__search-input {
        @apply w-full h-14 pl-12 pr-12
           rounded-2xl
           bg-transparent
           border border-gray-200
           text-gray-900 text-sm
           placeholder-gray-400
           outline-none transition-all duration-300
           dark:border-gray-700 
           dark:text-gray-100
           dark:placeholder-gray-500;

        &:focus {
            @apply border-blue-400
             dark:border-blue-500;
        }
    }

    &__search-icon {
        @apply absolute left-4 top-1/2 -translate-y-1/2 
           text-lg text-gray-400
           pointer-events-none
           dark:text-gray-500;
    }

    &__search-clear {
        @apply absolute right-4 top-1/2 -translate-y-1/2
           w-8 h-8 flex items-center justify-center
           rounded-full text-gray-400 
           transition-colors duration-200
           hover:bg-gray-100 hover:text-gray-600
           dark:hover:bg-gray-700 dark:text-gray-500 dark:hover:text-gray-300;
    }

    // Category container styles
    &__category-container {
        @apply bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm mb-8
           dark:from-gray-800 dark:to-gray-800/80;
    }

    &__category-header {
        @apply mb-6;
    }

    &__category-info {
        @apply flex-grow;
    }

    &__category-title {
        @apply text-xl font-bold text-gray-900 mb-1
           dark:text-gray-100;
    }

    &__category-description {
        @apply text-sm text-gray-600
           dark:text-gray-400;
    }

    // Grid styles
    &__grid {
        @apply grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4;
    }

    // Updated card styles with category-specific focus states
    &__card {
        @apply block w-full rounded-lg p-6
           relative overflow-hidden
           bg-white border border-gray-200
           transition-all duration-300
           no-underline outline-none
           dark:bg-gray-800 dark:border-gray-700;
        min-height: 180px;

        &::before {
            content: '';
            @apply absolute inset-0 opacity-0 transition-opacity duration-300;
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.1) 100%
            );
        }

        &:hover {
            @apply transform -translate-y-0.5;

            &::before {
                @apply opacity-100;
            }
        }

        // Color-specific hover and focus states
        &--emerald:not(&--disabled) {
            &:hover {
                @apply border-emerald-200 bg-emerald-50/50
             dark:bg-emerald-900/10 dark:border-emerald-700/50;

                .calculator__icon-wrapper {
                    @apply shadow-md shadow-emerald-200/50
               dark:shadow-emerald-900/30;
                }
            }

            &:focus {
                @apply ring-2 ring-emerald-400/50 border-emerald-400
             dark:ring-emerald-500/50 dark:border-emerald-500;
            }
        }

        &--rose:not(&--disabled) {
            &:hover {
                @apply border-rose-200 bg-rose-50/50
             dark:bg-rose-900/10 dark:border-rose-700/50;

                .calculator__icon-wrapper {
                    @apply shadow-md shadow-rose-200/50
               dark:shadow-rose-900/30;
                }
            }

            &:focus {
                @apply ring-2 ring-rose-400/50 border-rose-400
             dark:ring-rose-500/50 dark:border-rose-500;
            }
        }

        &--primary:not(&--disabled) {
            &:hover {
                @apply border-blue-200 bg-blue-50/50
             dark:bg-blue-900/10 dark:border-blue-700/50;

                .calculator__icon-wrapper {
                    @apply shadow-md shadow-blue-200/50
               dark:shadow-blue-900/30;
                }
            }

            &:focus {
                @apply ring-2 ring-blue-400/50 border-blue-400
             dark:ring-blue-500/50 dark:border-blue-500;
            }
        }

        &--purple:not(&--disabled) {
            &:hover {
                @apply border-purple-200 bg-purple-50/50
             dark:bg-purple-900/10 dark:border-purple-700/50;

                .calculator__icon-wrapper {
                    @apply shadow-md shadow-purple-200/50
               dark:shadow-purple-900/30;
                }
            }

            &:focus {
                @apply ring-2 ring-purple-400/50 border-purple-400
             dark:ring-purple-500/50 dark:border-purple-500;
            }
        }

        &--disabled {
            @apply cursor-not-allowed;

            &:hover {
                @apply transform-none;

                &::before {
                    @apply opacity-0;
                }
            }

            .calculator__card-content {
                @apply opacity-50 dark:opacity-10;
            }
        }
    }

    &__card-content {
        @apply h-full flex flex-col items-center justify-between relative z-10;
    }

    &__icon-wrapper {
        @apply w-10 h-10 rounded-lg flex items-center justify-center
           transition-all duration-300 bg-gradient-to-br;

        &--emerald {
            @apply from-emerald-500 to-emerald-600
             dark:from-emerald-600 dark:to-emerald-700;
        }

        &--rose {
            @apply from-rose-500 to-rose-600
             dark:from-rose-600 dark:to-rose-700;
        }

        &--primary {
            @apply from-blue-500 to-blue-600
             dark:from-blue-600 dark:to-blue-700;
        }

        &--purple {
            @apply from-purple-500 to-purple-600
             dark:from-purple-600 dark:to-purple-700;
        }
    }

    &__icon {
        @apply text-base text-white;
    }

    &__text {
        @apply w-full text-center mt-4;
    }

    &__card-title {
        @apply font-medium text-gray-900 text-sm mb-1
           transition-all duration-300
           dark:text-gray-100;
    }

    &__card-description {
        @apply text-xs text-gray-500 line-clamp-2
           transition-all duration-300
           dark:text-gray-400;
    }

    // No results styles
    &__no-results {
        @apply text-center py-12;
    }

    &__no-results-icon {
        @apply text-3xl text-gray-400 mb-2
           dark:text-gray-600;
    }

    &__no-results p {
        @apply text-gray-600 dark:text-gray-400;
    }

    &__overlay {
        @apply absolute inset-0 bg-gray-900/60 flex items-center justify-center
               backdrop-blur-[2px] rounded-lg;

        span {
            @apply bg-gray-900/80 text-white px-4 py-2 rounded-lg text-sm font-medium;
        }
    }
}
</style>
