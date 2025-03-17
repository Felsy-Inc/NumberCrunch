<template>
    <CalculatorBase
        color="violet"
        icon="pi pi-users"
        title="Team Generator"
        type="randomizer"
        :can-calculate="canCalculate"
        :explanation="explanation"
        :history="history"
        :result="result"
        :result-formula="resultFormula"
        @calculate="calculate"
        @clear="resetForm"
    >
        <template #content>
            <form @submit.prevent="calculate" class="calculator-base__form">
                <!-- Names Input -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Player Names</label>
                    <div
                        v-for="(name, index) in formData.names"
                        :key="index"
                        class="name-input-row"
                    >
                        <InputText
                            v-model="formData.names[index]"
                            class="form__input"
                            placeholder="Enter player name"
                        />
                        <Button
                            type="button"
                            icon="pi pi-times"
                            @click="removeName(index)"
                            class="p-button-danger p-button-sm"
                        />
                    </div>
                    <Button
                        type="button"
                        icon="pi pi-plus"
                        label="Add Player"
                        @click="addName"
                        class="p-button-secondary mt-2"
                    />
                </div>

                <!-- Number of Teams Input -->
                <div class="calculator-base__form-group">
                    <label class="form__label">Number of Teams</label>
                    <div class="teams-input-container">
                        <Button
                            type="button"
                            icon="pi pi-minus"
                            @click="decrementTeams"
                            :disabled="!canDecrement"
                            class="p-button-secondary p-button-sm"
                        />
                        <InputNumber
                            v-model="formData.numberOfTeams"
                            class="form__input teams-input"
                            placeholder="How many teams?"
                            :min="2"
                            :max="Math.floor(formData.names.length / 2)"
                            :showButtons="false"
                            @input="(e) => (formData.numberOfTeams = Number(e.value))"
                        />
                        <Button
                            type="button"
                            icon="pi pi-plus"
                            @click="incrementTeams"
                            :disabled="!canIncrement"
                            class="p-button-secondary p-button-sm"
                        />
                    </div>
                </div>
            </form>
        </template>
    </CalculatorBase>
</template>

<script setup lang="ts">
import CalculatorBase from '~/components/calculators/CalculatorBase.vue';
import { ref, computed } from 'vue';
import { useFormValidation } from '~/composables/useFormValidation';

// Types
interface TeamGeneratorFormData {
    names: string[];
    numberOfTeams: number | null;
}

const explanation = `
<p>Generate random teams with this calculator:</p>
<ul>
    <li>Add player names (minimum 4 players)</li>
    <li>Choose number of teams (2 or more)</li>
    <li>Click generate to create random teams!</li>
</ul>
`;

// Composables
const { validateForm } = useFormValidation();

// State
const result = ref<string | undefined>(undefined);
const resultFormula = ref<string | undefined>(undefined);
const history = ref<string[]>([]);

// Initial form state
const formData = ref<TeamGeneratorFormData>({
    names: ['', ''],
    numberOfTeams: 2,
});

// Computed
const canCalculate = computed(() => {
    const validNames = formData.value.names.filter((name) => name.trim().length > 0);
    return (
        validNames.length >= 4 &&
        formData.value.numberOfTeams !== null &&
        formData.value.numberOfTeams >= 2 &&
        formData.value.numberOfTeams <= Math.floor(validNames.length / 2)
    );
});

const canDecrement = computed(() => {
    return formData.value.numberOfTeams && formData.value.numberOfTeams > 2;
});

const canIncrement = computed(() => {
    const maxTeams = Math.floor(
        formData.value.names.filter((name) => name.trim().length > 0).length / 2
    );
    return formData.value.numberOfTeams && formData.value.numberOfTeams < maxTeams;
});

// Methods
const addName = () => {
    formData.value.names.push('');
};

const removeName = (index: number) => {
    formData.value.names.splice(index, 1);
};

const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const calculate = () => {
    if (!formData.value.numberOfTeams) return;

    try {
        // Filter out empty names and shuffle the array
        const validNames = formData.value.names.filter((name) => name.trim().length > 0);
        const shuffledNames = shuffleArray(validNames);

        // Create teams
        const teams: string[][] = Array.from({ length: formData.value.numberOfTeams }, () => []);
        shuffledNames.forEach((name, index) => {
            const teamIndex = index % formData.value.numberOfTeams!;
            teams[teamIndex].push(name);
        });

        // Format result as HTML with styling
        const resultText = teams
            .map((team, index) => {
                const teamMembers = team
                    .map(
                        (name, i) => `
                        <div class="team-member">
                            <span class="team-member-number">${i + 1}.</span>
                            <span class="team-member-name">${name}</span>
                        </div>
                    `
                    )
                    .join('');

                return `
                    <div class="team-container">
                        <div class="team-header">
                            <span class="team-icon">📋</span>
                            <span class="team-title">Team ${index + 1}</span>
                        </div>
                        <div class="team-members">
                            ${teamMembers}
                        </div>
                    </div>
                `;
            })
            .join('');

        // Wrap the entire result in a container with styles
        result.value = `
            <div class="teams-result">
                <style>
                    .teams-result {
                        font-family: var(--font-family);
                    }
                    .team-container {
                        background: var(--surface-card);
                        border-radius: 8px;
                        padding: 1rem;
                        margin-bottom: 1rem;
                    }
                    .team-container:last-child {
                        margin-bottom: 0;
                    }
                    .team-header {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        margin-bottom: 0.75rem;
                        font-weight: 600;
                        font-size: 1.1rem;
                        color: var(--primary-color);
                    }
                    .team-members {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                        padding-left: 1rem;
                    }
                    .team-member {
                        display: flex;
                        gap: 0.5rem;
                        align-items: center;
                    }
                    .team-member-number {
                        color: var(--text-color-secondary);
                        min-width: 1.5rem;
                    }
                    .team-member-name {
                        color: var(--text-color);
                    }
                </style>
                ${resultText}
            </div>
        `;

        resultFormula.value = `${validNames.length} players into ${formData.value.numberOfTeams} teams`;

        // Add to history with more detail
        const historyEntry = `Created ${formData.value.numberOfTeams} teams with ${
            validNames.length
        } players (${Math.ceil(validNames.length / formData.value.numberOfTeams)} per team)`;
        history.value = [historyEntry, ...history.value.slice(0, 4)];
    } catch (err) {
        result.value = undefined;
        resultFormula.value = undefined;
    }
};

const resetForm = () => {
    formData.value = {
        names: ['', ''],
        numberOfTeams: 2,
    };
    result.value = undefined;
    resultFormula.value = undefined;
};

const incrementTeams = () => {
    if (formData.value.numberOfTeams) {
        const maxTeams = Math.floor(
            formData.value.names.filter((name) => name.trim().length > 0).length / 2
        );
        formData.value.numberOfTeams = Math.min(formData.value.numberOfTeams + 1, maxTeams);
    }
};

const decrementTeams = () => {
    if (formData.value.numberOfTeams && formData.value.numberOfTeams > 2) {
        formData.value.numberOfTeams--;
    }
};
</script>

<style scoped>
.form__operation-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.name-input-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.form__input {
    flex: 1;
}

.mt-2 {
    margin-top: 0.5rem;
}

.teams-input-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.teams-input {
    width: 100px;
    text-align: center;
}

.teams-input :deep(.p-inputnumber-input) {
    text-align: center;
}
</style>
