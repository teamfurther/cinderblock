<template>
    <a class="tooltip-icon" v-on:mouseout="close" v-on:mouseover="open">
        <tooltip v-bind:class="tooltipClass" v-bind:is-open="isOpen">
            <slot></slot>
        </tooltip>
    </a>
</template>

<script lang="ts">
    import Tooltip from './Tooltip.vue';

    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {
            Tooltip
        }
    })
    export default class TooltipIcon extends Vue {
        // Computed
        get tooltipClass(): string {
            return 'is-at-' + this.position;
        }

        // Data
        private isOpen = false;

        // Methods
        close() {
            this.isOpen = false;
        }

        open() {
            this.isOpen = true;
        }

        // Props
        @Prop({
            default: 'bottom',
            type: String,
            validator: function (value: string) {
                return [
                    'bottom',
                    'left',
                    'right',
                    'top'
                ].indexOf(value) !== -1
            }
        }) position!: string;
    };
</script>

<style lang="scss">
    @import '../../scss/components/TooltipIcon';
</style>