<template>
    <div class="ad-container">
        <ins
            class="adsbygoogle"
            style="display: block"
            data-ad-client="ca-pub-8907205065732865"
            data-ad-slot="xxxxxxxxxx"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    </div>
</template>

<script setup>
// Load ads by reinitializing (required by AdSense to display the ad)
onMounted(() => {
    if (typeof window !== 'undefined') {
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
});
</script>

<style scoped>
.ad-container {
    text-align: center;
    margin: 20px 0;
}
</style>
