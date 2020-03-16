<template>
    <div class="navigation__wrapper" v-bind:class="{ 'has-burger': hasBurger }">
        <div class="navigation" v-bind:class="{ 'is-active': isExpanded }">
            <slot></slot>
        </div>
        <a class="navigation__burger"
           v-if="hasBurger"
           v-on:click="toggleNavigation"
        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Navigation extends Vue {
        // Data
        private isExpanded = false;

        // Methods
        private toggleNavigation() {
            this.isExpanded = !this.isExpanded;
        }

        // Props
        @Prop({
            default: false,
            type: Boolean
        }) hasBurger!: Boolean;
    }
</script>

<style lang="scss">
    @import '../../scss/components/Navigation';
</style>