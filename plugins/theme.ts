export default defineNuxtPlugin((nuxtApp) => {
    const applyTheme = (theme: string) => {
        if (theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', prefersDark);
        } else if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Create a function to update theme
    const updateTheme = (newTheme: 'light' | 'dark' | 'system') => {
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    nuxtApp.hook('app:mounted', () => {
        // Set localStorage if it doesn't exist
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'system');
        }

        // Get theme from localStorage and apply it
        const userTheme = localStorage.getItem('theme');
        if (userTheme) {
            applyTheme(userTheme);
        }
    });

    // Provide the updateTheme function to the rest of the application
    return {
        provide: {
            updateTheme,
        },
    };
});
