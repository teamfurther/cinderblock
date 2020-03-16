<template>
    <div class="foot">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Foot extends Vue {};
</script>

<style lang="scss">
    @import '../../scss/components/Foot';
</style>
