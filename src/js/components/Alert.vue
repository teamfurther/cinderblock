<template>
    <div class="alert"
         v-bind:class="[typeClass, { 'is-flying-out': !isFlyingOut }]"
         v-if="isOpen"
    >
        <span class="alert__title" v-if="title">{{ title }}</span>
        <span class="alert__message" v-html="message"></span>
        <a class="alert__close" v-on:click="close">&times;</a>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component
    export default class Alert extends Vue {
        // Computed
        get typeClass(): Object {
            return 'is-' + this.type;
        }

        // Data
        private isOpen: Boolean = true;
        private isFlyingOut: Boolean = true;

        // Lifecycle hooks
        mounted() {
            setTimeout(() => {
                this.close();
            }, this.autoDismiss);
        }

        // Methods
        private close() {
            this.$emit('close-alert', this.$vnode.key);

            this.isFlyingOut = false;

            setTimeout(() => {
                this.isOpen = false;

                this.$emit('alert-closed', this.$vnode.key);
            }, 450);
        }

        // Props
        @Prop({
            default: 8 * 1000, // 8 seconds
            type: Number
        }) autoDismiss!: number;

        @Prop({
            required: true,
            type: String
        }) message!: string;

        @Prop({
            default: null,
            type: String
        }) title!: string;

        @Prop({
            required: true,
            type: String,
            validator: function (value: string) {
                return ['error', 'info', 'success', 'warning'].indexOf(value) !== -1
            }
        }) type!: string;
    };
</script>

<style lang="scss">
    @import '../../scss/components/Alert';
</style>
