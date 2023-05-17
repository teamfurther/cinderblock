<template>
    <component class="c-navigation__item border-b border-b-slate-200 cursor-pointer hover:bg-slate-50 last:border-b-0 lg:border-b-0 lg:hover:bg-transparent lg:text-sm p-2"
       v-bind:class="{ 'text-highlight': active, 'text-slate-800': !active }"
       v-bind:href="!router ? to : null"
       v-bind:is="type"
       v-bind:to="router ? to : null"
       v-if="!hasDropdown"
    >
        <slot></slot>
    </component>
    <div class="c-navigation__item cursor-pointer group lg:hover:bg-transparent lg:text-sm p-2 relative"
         v-else
    >
        <component
           v-bind:class="{ 'text-highlight': active, 'text-slate-800': !active, 'lg:after:absolute lg:after:border-[5px] lg:after:border-transparent lg:after:border-t-slate-700 lg:after:content-[\'\'] lg:after:h-0 lg:after:mt-1 lg:after:right-0 lg:after:pointer-events-none lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:w-0 lg:pr-4 relative' : hasArrows }"
           v-bind:href="!router ? to : null"
           v-bind:is="type"
           v-bind:to="router ? to : null"
           v-if="hasDropdown"
        >
            <slot></slot>
        </component>

        <div class="c-navigation__dropdown flex flex-col lg:absolute lg:bg-white lg:border lg:border-slate-200 lg:hidden lg:group-hover:flex lg:min-w-[150px] lg:ml-0 lg:shadow-sm lg lg:z-20 -mb-2 ml-5 mt-2 rounded"
             v-bind:class="{ 'right-0' : dropdownPosition === 'right' }"
             v-if="$slots.dropdown"
        >
            <slot name="dropdown"></slot>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { computed, PropType } from 'vue';
    import { PositionXEnum } from '../enums/PositionXEnum';

    const props = defineProps({
        active: {
            default: false,
            type: Boolean
        },
        dropdownPosition: {
            default: 'left',
            type: String as PropType<PositionXEnum>,
        },
        hasArrows: {
            default: true,
            type: Boolean,
        },
        hasDropdown: {
            default: false,
            type: Boolean,
        },
        router: {
            type: Boolean,
            default: false,
        },
        to: {
            default: null,
            type: [Object, String],
        },
    });

    const type = computed(() => {
        return props.router ? 'router-link' : 'a';
    });
</script>