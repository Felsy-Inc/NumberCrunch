interface ValidationRules {
    [key: string]: boolean;
}

export const useFormValidation = () => {
    const validateForm = (rules: ValidationRules): boolean => {
        return Object.values(rules).every((rule) => rule === true);
    };

    return {
        validateForm,
    };
};
