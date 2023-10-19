<template>
    <div class="c-tooltip absolute duration-500 flex items-center opacity-0 pointer-events-none transition-all w-[350px] z-40"
         v-bind:class="{
            'opacity-100 pointer-events-auto': active,
            'justify-center left-1/2 top-8 -translate-x-1/2' : position === 'bottom',
            'justify-end right-8 top-1/2 -translate-y-1/2' : position === 'left',
            'justify-start left-8 top-1/2 -translate-y-1/2' : position === 'right',
            'bottom-8 justify-center left-1/2 -translate-x-1/2' : position === 'top'
        }"
    >
        <div class="c-tooltip__inner after:absolute after:border-8 after:border-transparent after:content-[''] after:h-0 after:pointer-events-none after:w-0 bg-slate-700 flex items-center min-w-[100px] min-h-[50px] px-1 py-1.5 relative rounded text-sm text-white"
             v-bind:class="{
                'after:border-b-slate-700 after:bottom-full after:left-1/2  after:-translate-x-1/2' : position === 'bottom',
                'after:border-l-slate-700 after:left-full' : position === 'left',
                'after:border-r-slate-700 after:right-full' : position === 'right',
                'after:border-t-slate-700 after:left-1/2 after:top-full after:-translate-x-1/2' : position === 'top'
            }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { PropType } from 'vue';
    import { PositionEnum } from '../enums/PositionEnum';

    const props = defineProps({
        active: {
            required: true,
            type: Boolean,
        },
        position: {
            default: 'bottom',
            type: String as PropType<PositionEnum>,
        },
    });
</script>