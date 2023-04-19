<template>
    <div class="c-modal pointer-events-none" role="dialog"
         v-bind:class="{ 'pointer-events-auto': open }"
    >
        <div class="c-modal__content bg-white delay-100 duration-200 fixed left-1/2 max-h-[calc(100vh-6rem)] max-w-[600px] opacity-0 overflow-y-auto p-4 rounded top-0 transition-all -translate-x-1/2 w-[calc(100%-1rem)] z-50"
             v-bind="$attrs"
             v-bind:class="{ 'opacity-100 top-12': open }"
        >
            <a class="c-modal__close absolute cursor-pointer right-4 text-slate-800 text-xl top-3"
               v-if="!hideClose" v-on:click="close"
            >&times;</a>

            <div class="c-modal__header mb-4" v-if="$slots.header || title">
                <slot name="header">
                    <div class="c-modal__title text-center text-slate-800 text-xl" v-if="title">{{ title }}</div>
                </slot>
            </div>

            <div class="c-modal__body" v-if="$slots.body">
                <slot name="body"></slot>
            </div>

            <div class="c-modal__footer mt-4" v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="c-modal__backdrop bg-slate-900 bg-opacity-70 duration-200 fixed h-full left-0 opacity-0 pointer-events-none top-0 transition-all w-full z-40"
             v-bind:class="{ 'opacity-100 pointer-events-auto': open }"
             v-on:click="close"
        ></div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, watch } from 'vue';

    const emits = defineEmits(['closeModal']);

    const props = defineProps({
        hideClose: {
            required: false,
            type: Boolean,
        },
        open: {
            required: true,
            type: Boolean,
        },
        title: {
            type: String,
        },
    });

    function close() {
        if (!props.hideClose) {
            emits('closeModal');
        }
    }

    function toggleOverflow() {
        if (props.open) {
            document.querySelector('body')?.classList.add('!overflow-hidden');
        } else {
            document.querySelector('body')?.classList.remove('!overflow-hidden');
        }
    }

    onMounted(() => {
        toggleOverflow();
    });

    watch(() => props.open, () => {
        toggleOverflow();
    });
</script>