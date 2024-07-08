<template>
  <div>
    <AppHeader />
    <slot />
  </div>
</template>

<script setup>
import AppHeader from "~/components/layout/AppHeader.vue";
</script>
