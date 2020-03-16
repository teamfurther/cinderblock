<template>
    <div class="brand">
        <a v-bind:href="href"
           v-if="href"
        >
            <slot></slot>
        </a>
        <slot v-else></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Brand extends Vue {
        // Props
        @Prop({
            default: null,
            type: String
        }) href!: string;

    };
</script>

<style lang="scss">
    @import '../../scss/components/Brand';
</style>