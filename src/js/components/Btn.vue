<template>
    <button class="btn"
            v-bind:class="[typeClass, { 'is-loading': isLoading }]"
            v-bind:disabled="isDisabled"
            v-bind:type="[ isSubmit ? 'submit' : 'button']"
            v-if="!href"
            v-on:click="$emit('click')"
    >
        <span class="btn__content">
            <slot></slot>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg"
             height="24px"
             preserveAspectRatio="xMidYMid"
             style="display: block; margin: auto; shape-rendering: auto;"
             viewBox="0 0 100 100"
             width="24px"
             v-if="isLoading"
        >
            <circle
                    cx="50" cy="50"
                    fill="none"
                    stroke="white"
                    stroke-width="10"
                    r="35"
                    stroke-dasharray="164.93361431346415 56.97787143782138"
                    transform="rotate(96.2557 50 50)"
            >
                <animateTransform
                        attributeName="transform"
                        dur="1s"
                        keyTimes="0;1"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 50 50;360 50 50"
                ></animateTransform>
            </circle>
        </svg>
    </button>
    <a class="btn"
       v-bind:class="[typeClass, { 'is-block': isBlock }]"
       v-bind:disabled="isDisabled"
       v-bind:href="href"
       v-else
    >
        <span class="btn__content">
            <slot></slot>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg"
             height="24px"
             preserveAspectRatio="xMidYMid"
             style="display: block; margin: auto; shape-rendering: auto;"
             viewBox="0 0 100 100"
             width="24px"
             v-if="isLoading"
        >
            <circle
                    cx="50" cy="50"
                    fill="none"
                    stroke="white"
                    stroke-width="10"
                    r="35"
                    stroke-dasharray="164.93361431346415 56.97787143782138"
                    transform="rotate(96.2557 50 50)"
            >
                <animateTransform
                        attributeName="transform"
                        dur="1s"
                        keyTimes="0;1"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 50 50;360 50 50"
                ></animateTransform>
            </circle>
        </svg>
    </a>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Button extends Vue {
        // Computed
        get typeClass(): Object {
            return 'is-' + this.type;
        }

        // Props
        @Prop({
            default: null,
            type: String
        }) href!: string;

        @Prop({
            default: false,
            type: Boolean
        }) isDisabled!: boolean;

        @Prop({
            default: false,
            type: Boolean
        }) isLoading!: boolean;

        @Prop({
            default: false,
            type: Boolean
        }) isSubmit!: boolean;

        @Prop({
            default: 'default',
            type: String,
            validator: function (value: string) {
                return ['cancel', 'default', 'error', 'success', 'warning'].indexOf(value) !== -1
            }
        }) type!: string;
    };
</script>

<style lang="scss">
    @import '../../scss/components/Btn';
</style>
