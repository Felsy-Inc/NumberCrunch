<template>
    <main class="error-page">
        <div class="error-container">
            <h1 class="error-title">
                {{ error.statusCode === 404 ? '404' : error.statusCode }}
            </h1>
            <h2 class="error-subtitle">
                {{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}
            </h2>
            <p class="error-message">{{ error.message }}</p>
            <Button class="error-button" @click="handleError">
                <span class="icon">←</span> Return Home
            </Button>
        </div>
    </main>
</template>

<script setup>
const error = useError();
const { setMeta } = usePageMeta();

setMeta({
    title: error.value?.statusCode === 404 ? 'Page Not Found' : 'Error',
    description: 'An error occurred while loading the page.',
    path: '/error',
});

const handleError = () => {
    clearError();
    navigateTo('/');
};
</script>

<style scoped>
.error-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #f8f9fa;
}

.error-container {
    text-align: center;
    max-width: 600px;
    padding: 3rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-title {
    font-size: 6rem;
    font-weight: 700;
    color: #dc3545;
    margin: 0;
    line-height: 1;
}

.error-subtitle {
    font-size: 2rem;
    color: #343a40;
    margin: 1rem 0;
}

.error-message {
    color: #6c757d;
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.error-button {
    background-color: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.error-button:hover {
    background-color: #0056b3;
}

.icon {
    font-size: 1.2rem;
}
</style>
