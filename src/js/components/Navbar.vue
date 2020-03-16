<template>
    <nav class="navbar">
        <slot></slot>
    </nav>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Navbar extends Vue {};
</script>

<style lang="scss">
    @import '../../scss/components/Navbar';
</style>