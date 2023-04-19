<template>
    <div class="c-alert animate-fly-in before:absolute before:-left-4 before:-top-4 bg-white border-l-4 border-l-slate-200 flex flex-col justify-center leading-none mb-1.5 min-h-[50px] overflow-hidden px-4 py-1 relative shadow-cinderblock text-sm"
         v-bind:class="[{ 'animate-fly-out': !isFlyingOut }, typeClasses[type]]"
         v-if="isOpen"
    >
        <span class="c-alert__title font-medium mb-1 text-slate-800" v-if="title">{{ title }}</span>
        <span class="c-alert__message text-slate-400" v-html="message"></span>
        <a class="c-alert__close absolute cursor-pointer right-4 text-lg text-slate-400 top-1/2 -translate-y-1/2" v-on:click="close">&times;</a>
    </div>
</template>

<script setup lang="ts">
    import { getCurrentInstance, onMounted, ref } from 'vue';

    import { AlertTypeEnum } from "../enums/AlertTypeEnum";

    const emits = defineEmits(['alertClosed', 'closeAlert']);

    let isFlyingOut = ref(true);
    let isOpen = ref(true);

    const typeClasses = {
        error: 'before:content-icon-alert-error !border-l-error pl-20',
        info: 'before:content-icon-alert-info !border-l-info pl-20',
        success: 'before:content-icon-alert-success !border-l-success pl-20',
        warning: 'before:content-icon-alert-warning !border-l-warning pl-20',
    }

    const props = defineProps({
        autoDismiss: {
            default: 8 * 1000, // 8 seconds
            type: Number,
        },
        message: {
            required: true,
            type: String,
        },
        title: {
            default: '',
            type: String,
        },
        type: {
            required: true,
            type: String as () => AlertTypeEnum,
        },
    });

    onMounted(() => {
        setTimeout(() => {
            close();
        }, props.autoDismiss);
    });

    function close() {
        emits('closeAlert', getCurrentInstance()?.vnode.key);

        isFlyingOut.value = false;

        setTimeout(() => {
            isOpen.value = false;

            emits('alertClosed', getCurrentInstance()?.vnode.key);
        }, 500);
    }
</script>
