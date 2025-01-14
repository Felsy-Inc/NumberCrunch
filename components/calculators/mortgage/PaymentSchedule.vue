<template>
    <!-- Add this date input before the Summary Section -->
    <div class="mb-6 max-w-xs">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Start Date
        </label>
        <DatePicker
            v-model="startDate"
            view="month"
            dateFormat="mm/yy"
            :clearable="false"
            :teleport="true"
            class="w-full"
        />
    </div>

    <!-- Summary Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="text-sm text-gray-600 dark:text-gray-400">Principal</div>
            <div class="text-lg font-bold">
                {{ formatCurrency(totalPrincipal, currency) }}
            </div>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="text-sm text-gray-600 dark:text-gray-400">Interest</div>
            <div class="text-lg font-bold">
                {{ formatCurrency(totalInterest, currency) }}
            </div>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Payment</div>
            <div class="text-lg font-bold">
                {{ formatCurrency(totalPayments, currency) }}
            </div>
        </div>
    </div>

    <!-- Schedule Table -->
    <DataTable
        :value="schedule"
        :paginator="true"
        :rows="12"
        :rowsPerPageOptions="[12, 24, 36, 48]"
        striped
        class="p-datatable-sm"
        responsiveLayout="stack"
        breakpoint="960px"
    >
        <Column field="monthDisplay" header="Payment Date" />
        <Column field="totalPayment" header="Total Payment" class="whitespace-nowrap">
            <template #body="{ data }">
                {{ formatCurrency(data.totalPayment, currency) }}
            </template>
        </Column>
        <Column
            field="principal"
            header="Principal"
            :showFilterMenu="false"
            class="hidden md:table-cell"
        >
            <template #body="{ data }">
                {{ formatCurrency(data.principal, currency) }}
            </template>
        </Column>
        <Column
            field="interest"
            header="Interest"
            :showFilterMenu="false"
            class="hidden md:table-cell"
        >
            <template #body="{ data }">
                {{ formatCurrency(data.interest, currency) }}
            </template>
        </Column>
        <Column
            field="additionalCosts"
            header="Additional Costs"
            :showFilterMenu="false"
            class="hidden md:table-cell"
        >
            <template #body="{ data }">
                {{ formatCurrency(data.additionalCosts, currency) }}
            </template>
        </Column>
        <Column field="balance" header="Remaining Balance" class="whitespace-nowrap">
            <template #body="{ data }">
                {{ formatCurrency(data.balance, currency) }}
            </template>
        </Column>
        <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" text />
        </template>
        <template #paginatorend>
            <Button type="button" icon="pi pi-download" text @click="downloadPDF" />
        </template>
    </DataTable>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useCurrencyFormatter } from '~/composables/useCurrencyFormatter';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const props = defineProps({
    loanAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    loanTerm: { type: Number, required: true },
    mortgageType: { type: String, required: true },
    propertyTax: { type: Number, default: 0 },
    insurance: { type: Number, default: 0 },
    currency: { type: String, required: true },
});

defineEmits([]);

const { formatCurrency } = useCurrencyFormatter();
const schedule = ref([]);
const startDate = ref(getDefaultStartDate());

function getDefaultStartDate() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
}

function calculatePaymentSchedule({
    loanAmount,
    interestRate,
    loanTerm,
    mortgageType,
    propertyTax = 0,
    insurance = 0,
}) {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;
    const additionalCosts = propertyTax + insurance;
    const scheduleData = [];

    let remainingBalance = loanAmount;
    const monthlyPrincipal = loanAmount / totalMonths; // Used for linear mortgage

    // Calculate base monthly payment for annuity
    const monthlyPayment =
        mortgageType === 'annuity'
            ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
              (Math.pow(1 + monthlyRate, totalMonths) - 1)
            : monthlyPrincipal;

    const startDateObj = new Date(startDate.value);

    for (let month = 1; month <= totalMonths; month++) {
        const interest = remainingBalance * monthlyRate;
        let principal;
        let payment;

        if (mortgageType === 'annuity') {
            payment = monthlyPayment;
            principal = payment - interest;
        } else {
            // linear
            principal = monthlyPrincipal;
            payment = principal + interest;
        }

        remainingBalance -= principal;

        // Ensure the final payment handles any rounding issues
        if (month === totalMonths) {
            principal += remainingBalance;
            payment = principal + interest;
            remainingBalance = 0;
        }

        const paymentDate = new Date(startDateObj);
        paymentDate.setMonth(startDateObj.getMonth() + (month - 1));
        const monthDisplay = paymentDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        });

        scheduleData.push({
            month,
            monthDisplay,
            payment: payment + additionalCosts,
            principal,
            interest,
            balance: remainingBalance,
            totalPayment: payment + additionalCosts,
            additionalCosts,
        });
    }

    return scheduleData;
}

watch(
    [
        () => props.loanAmount,
        () => props.interestRate,
        () => props.loanTerm,
        () => props.mortgageType,
        () => props.propertyTax,
        () => props.insurance,
        startDate,
    ],
    () => {
        schedule.value = calculatePaymentSchedule({
            loanAmount: props.loanAmount,
            interestRate: props.interestRate,
            loanTerm: props.loanTerm,
            mortgageType: props.mortgageType,
            propertyTax: props.propertyTax,
            insurance: props.insurance,
        });
    }
);

// Computed properties for summary
const totalInterest = computed(() =>
    schedule.value.reduce((sum, payment) => sum + payment.interest, 0)
);

const totalPayments = computed(() =>
    schedule.value.reduce((sum, payment) => sum + payment.totalPayment, 0)
);

const totalPrincipal = computed(() =>
    schedule.value.reduce((sum, payment) => sum + payment.principal, 0)
);

function downloadPDF() {
    const doc = new jsPDF();

    // Add branding with updated styling and position
    doc.setFontSize(24);
    doc.setTextColor(14, 165, 233);
    doc.setFont(undefined, 'bold');
    doc.text('Numbercrunch.io', 14, 20);

    // Add subtitle aligned to the right
    doc.setTextColor(0);
    doc.setFontSize(16);
    doc.setFont(undefined, 'normal');
    const pageWidth = doc.internal.pageSize.width;
    doc.text('Mortgage payment schedule', pageWidth - 14, 20, { align: 'right' });

    // Add summary section horizontally
    doc.setFontSize(12);
    const summaryX = [14, 75, 136];
    doc.text(`Principal: ${formatCurrency(totalPrincipal.value, props.currency)}`, summaryX[0], 30);
    doc.text(`Interest: ${formatCurrency(totalInterest.value, props.currency)}`, summaryX[1], 30);
    doc.text(
        `Total Payment: ${formatCurrency(totalPayments.value, props.currency)}`,
        summaryX[2],
        30
    );

    // Add table with adjusted starting Y position
    doc.autoTable({
        startY: 36,
        head: [
            [
                'Payment Date',
                'Total Payment',
                'Principal',
                'Interest',
                'Additional Costs',
                'Remaining Balance',
            ],
        ],
        body: schedule.value.map((row) => [
            row.monthDisplay,
            formatCurrency(row.totalPayment, props.currency),
            formatCurrency(row.principal, props.currency),
            formatCurrency(row.interest, props.currency),
            formatCurrency(row.additionalCosts, props.currency),
            formatCurrency(row.balance, props.currency),
        ]),
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [66, 66, 66] },
    });

    // Download PDF
    doc.save('mortgage-schedule.pdf');
}

onMounted(() => {
    schedule.value = calculatePaymentSchedule({
        loanAmount: props.loanAmount,
        interestRate: props.interestRate,
        loanTerm: props.loanTerm,
        mortgageType: props.mortgageType,
        propertyTax: props.propertyTax,
        insurance: props.insurance,
    });
});

// Make downloadPDF function available to parent
defineExpose({ downloadPDF });
</script>
