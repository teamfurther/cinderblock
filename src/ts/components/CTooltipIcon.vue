<template>
    <a class="c-tooltip-icon after:absolute after:content-['i'] after:font-bold after:font-mono after:leading-none after:left-1/2 after:text-xs after:text-white after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 bg-highlight cursor-pointer flex h-5 mx-2 relative rounded-full shrink-0 w-5" v-on:mouseout="close" v-on:mouseover="open">
        <c-tooltip v-bind:active="active as boolean" v-bind:position="position">
            <slot></slot>
        </c-tooltip>
    </a>
</template>

<script setup lang="ts">
    import CTooltip from './CTooltip.vue';
    import { PropType, ref } from 'vue';
    import { PositionEnum } from '../enums/PositionEnum';

    // Data
    let active = ref<Boolean>(false);

    function close() {
        active.value = false;
    }

    function open() {
        active.value = true;
    }

    const props = defineProps({
        position: {
            default: 'bottom',
            type: String as PropType<PositionEnum>,
        },
    });
</script>