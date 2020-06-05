<template>
    <div class="panel">
        <div class="panel__top" v-if="$slots.topleft || $slots.topright || title">
            <div class="panel__top__left" v-if="$slots.topleft || title">
                <slot name="topleft" v-bind:slotProps="slotProps">
                    <div class="panel__title" v-if="title">{{ title }}</div>
                </slot>
            </div>

            <div class="panel__top__right" v-if="$slots.topright">
                <slot name="topright" v-bind:slotProps="slotProps"></slot>
            </div>
        </div>

        <div class="panel__body" v-if="$slots.body">
            <slot name="body" v-bind:slotProps="slotProps"></slot>
        </div>

        <div class="panel__bottom" v-if="$slots.bottomleft || $slots.bottomright">
            <div class="panel__bottom__left" v-if="$slots.bottomleft">
                <slot name="bottomleft" v-bind:slotProps="slotProps"></slot>
            </div>

            <div class="panel__bottom__right" v-if="$slots.bottomright">
                <slot name="bottomright" v-bind:slotProps="slotProps"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Panel extends Vue {
        // Props
        @Prop({
            default: null
        }) slotProps!: any;

        @Prop({
            type: String
        }) title!: string;
    };
</script>

<style lang="scss">
    @import '../../scss/components/Panel';
</style>