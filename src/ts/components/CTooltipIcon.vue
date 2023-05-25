<template>
    <span class="c-tooltip-icon cursor-pointer flex h-5 mx-2 relative rounded-full shrink-0 w-5" v-on:mouseout="close" v-on:mouseover="open">
        <c-icon class="h-5 mr-2 stroke-highlight stroke-2 w-5" icon="info" />
        <c-tooltip v-bind:active="active as boolean" v-bind:position="position">
            <slot></slot>
        </c-tooltip>
    </span>
</template>

<script setup lang="ts">
    import CIcon from './CIcon.vue';
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