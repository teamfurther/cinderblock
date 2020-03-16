<template>
    <div class="modal" role="dialog"
         v-bind:class="{ 'is-open': isOpen }"
    >
        <div class="modal__content">
            <a class="modal__close" v-if="!isCloseDisabled" v-on:click="close">&times;</a>

            <div class="modal__header" v-if="$slots.header || title">
                <slot name="header" v-bind:slotProps="slotProps">
                    <div class="modal__title" v-if="title">{{ title }}</div>
                </slot>
            </div>

            <div class="modal__body" v-if="$slots.body">
                <slot name="body" v-bind:slotProps="slotProps"></slot>
            </div>

            <div class="modal__footer" v-if="$slots.footer">
                <slot name="footer" v-bind:slotProps="slotProps"></slot>
            </div>
        </div>
        <div class="modal__backdrop" v-on:click="close"></div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    @Component
    export default class Modal extends Vue {
        // Methods
        private close() {
            if (!this.isCloseDisabled) {
                this.$emit('close-modal');
            }
        }

        // Props
        @Prop({
            default: false,
            type: Boolean
        }) isCloseDisabled!: boolean;

        @Prop({
            required: true,
            type: Boolean
        }) isOpen!: boolean;

        @Prop({
            default: null
        }) slotProps!: any;

        @Prop({
                type: String
        }) title!: string;

        // Watchers
        @Watch('isOpen')
        isOpenChanged() {
            if (this.isOpen) {
                document.querySelector('body')?.classList.add('has-open-modal');
            } else {
                document.querySelector('body')?.classList.remove('has-open-modal');
            }
        }
    };
</script>

<style lang="scss">
    @import '../../scss/components/Modal';
</style>