<template>
    <div class="tooltip" v-bind:class="{ 'is-open': isOpen }">
        <div class="tooltip__inner">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Tooltip extends Vue {
        // Props
        @Prop({
            required: true,
            type: Boolean
        }) isOpen!: boolean;
    };
</script>

<style lang="scss">
    @import '../../scss/components/Tooltip';
</style>