<template>
    <div class="c-panel bg-white border border-slate-200 p-3 rounded shadow-sm">
        <div class="c-panel__top mb-4" v-if="$slots.top || title">
            <slot name="top">
                <div class="c-panel__title text-center text-slate-800 text-xl" v-if="title">{{ title }}</div>
            </slot>
        </div>

        <div class="c-panel__body" v-if="$slots.body">
            <slot name="body"></slot>
        </div>

        <div class="c-panel__bottom mt-4" v-if="$slots.bottom">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
        },
    });
</script>