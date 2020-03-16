<template>
    <a class="navigation__item"
       v-bind:class="{ 'is-active': isActive, 'is-tab': isTab, 'has-cursor-default': !href}"
       v-bind:href="href"
       v-if="!hasDropdown"
    >
        <slot></slot>
    </a>
    <div class="navigation__item has-dropdown"
         v-else
    >
        <a v-bind:class="{ 'is-active': isActive, 'is-arrowless': isArrowless, 'is-tab': isTab }"
           v-bind:href="href"
           v-if="hasDropdown"
        >
            <slot></slot>
        </a>

        <div class="navigation__dropdown" v-if="$slots.dropdown">
            <slot name="dropdown"></slot>
        </div>

    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Item extends Vue {
        // Props
        @Prop({
            default: null,
            type: String
        }) href!: Object[];

        @Prop({
            default: false,
            type: Boolean
        }) hasDropdown!: Boolean;

        @Prop({
            default: false,
            type: Boolean
        }) isActive!: Boolean;

        @Prop({
            default: false,
            type: Boolean
        }) isArrowless!: Boolean;

        @Prop({
            default: false,
            type: Boolean
        }) isTab!: Boolean;
    }

</script>

<style lang="scss">
    @import '../../scss/components/NavigationItem';
</style>