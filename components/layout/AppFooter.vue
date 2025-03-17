<template>
    <footer class="app-footer">
        <div class="app-footer__container">
            <!-- Services Section -->
            <div class="app-footer__section">
                <h2 class="app-footer__title">Calculators</h2>
                <ul class="app-footer__list">
                    <li>
                        <router-link to="/calculator/loan"> Loan Calculator </router-link>
                    </li>
                    <li>
                        <router-link to="/calculator/currency"> Currency Converter </router-link>
                    </li>
                    <li>
                        <router-link to="/calculator/bmi"> BMI Calculator </router-link>
                    </li>
                    <li>
                        <router-link to="/calculator/calories"> Calories Suggestion </router-link>
                    </li>
                </ul>
            </div>

            <div class="app-footer__section">
                <h2 class="app-footer__title">Randomizers</h2>
                <ul class="app-footer__list">
                    <li>
                        <router-link to="/randomizer/random-number"> Random Number </router-link>
                    </li>
                    <li>
                        <router-link to="/randomizer/coin-flip"> Coin Flip </router-link>
                    </li>
                    <li>
                        <router-link to="/randomizer/dice-roll"> Dice Roll </router-link>
                    </li>
                    <li>
                        <router-link to="/randomizer/team-generator"> Team Generator </router-link>
                    </li>
                </ul>
            </div>

            <!-- <div class="app-footer__section">
                <h2 class="app-footer__title">Help</h2>
                <ul class="app-footer__list">
                    <li>
                        <router-link to="/about">Suggestions & Requests</router-link>
                    </li>
                </ul>
            </div> -->
        </div>

        <!-- Copyright Section -->
        <div class="app-footer__copyright">
            <p>&copy; {{ new Date().getFullYear() }} Felsy. All rights reserved.</p>
        </div>
    </footer>
</template>

<style lang="scss">
.app-footer {
    @apply bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 py-12 mt-auto;

    &__container {
        @apply container mx-auto flex flex-wrap justify-between px-4;
        max-width: 1200px;
    }

    &__section {
        @apply w-full sm:w-1/2 lg:w-1/4 mb-8 lg:mb-0;
    }

    &__title {
        @apply text-lg font-bold mb-4 text-gray-900 dark:text-gray-100;
    }

    &__list {
        @apply space-y-3;

        li a {
            @apply text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200;
        }
    }

    &__copyright {
        @apply container mx-auto text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700;

        p {
            @apply text-sm text-gray-500 dark:text-gray-400;
        }
    }
}
</style>
