<template>
    <footer class="app-footer">
        <div class="app-footer__container">
            <!-- Services Section -->
            <div class="app-footer__section">
                <h2 class="app-footer__title">Calculators</h2>
                <ul>
                    <li class="mb-2">
                        <router-link to="/calculator/percentage" class="hover:underline"
                            >Percentage Calculator</router-link
                        >
                    </li>
                    <li class="mb-2">
                        <router-link to="/calculator/percentage" class="hover:underline"
                            >BMI Calculator</router-link
                        >
                    </li>
                    <li class="mb-2">
                        <router-link to="/calculator/percentage" class="hover:underline"
                            >Mortgage Calculator</router-link
                        >
                    </li>
                </ul>
            </div>

            <div class="app-footer__section">
                <h2 class="app-footer__title">Randomizers</h2>
                <ul>
                    <li class="mb-2">
                        <router-link to="/calculator/percentage" class="hover:underline"
                            >Percentage Calculator</router-link
                        >
                    </li>
                    <li class="mb-2">
                        <router-link to="/calculator/percentage" class="hover:underline"
                            >BMI Calculator</router-link
                        >
                    </li>
                    <li class="mb-2">
                        <router-link to="/calculator/percentage" class="hover:underline"
                            >Mortgage Calculator</router-link
                        >
                    </li>
                </ul>
            </div>
        </div>

        <!-- Copyright Section -->
        <div class="container mx-auto text-center mt-8">
            <p class="text-sm">&copy; {{ new Date().getFullYear() }} Felsy. All rights reserved.</p>
        </div>
    </footer>
</template>

<style lang="scss">
.app-footer {
    @apply bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-8;

    &__container {
        @apply container mx-auto flex flex-wrap justify-between;
        max-width: 1200px;
        margin: 0 auto;
    }

    &__section {
        @apply w-full sm:w-1/2 lg:w-1/4 p-4;
    }

    &__title {
        @apply text-lg font-bold mb-4;
    }

    &__text {
        @apply text-sm mb-4;
    }

    &__link {
        @apply text-primary-500 hover:text-primary-700;
    }
}
</style>
