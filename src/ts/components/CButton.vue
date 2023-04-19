<template>
    <button class="c-btn cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 duration-300 ease-out font-bold inline-flex items-center justify-center p-2.5 rounded text-xs transition-all uppercase"
            v-bind:class="{ 'is-loading': loading }"
            v-bind:type="submit ? 'submit' : 'button'"
            v-if="!to"
    >
        <slot></slot>
        <svg xmlns="http://www.w3.org/2000/svg"
             class="inline h-6 mx-1 -my-2.5"
             preserveAspectRatio="xMidYMid"
             viewBox="0 0 100 100"
             v-bind:class="loadingColor"
             v-if="loading"
        >
            <circle
                    cx="50" cy="50"
                    fill="none"
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
    <component class="c-btn cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 duration-300 ease-out font-bold inline-flex items-center justify-center p-2.5 rounded text-xs transition-all uppercase"
       v-bind:href="!router ? to : null"
       v-bind:is="type"
       v-bind:to="router ? to : null"
       v-else
    >
        <slot></slot>
        <svg xmlns="http://www.w3.org/2000/svg"
             class="inline h-6 mx-1 -my-2.5"
             preserveAspectRatio="xMidYMid"
             viewBox="0 0 100 100"
             v-bind:class="loadingColor"
             v-if="loading"
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
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps({
        loading: {
            default: false,
            type: Boolean,
        },
        loadingColor: {
            default: 'stroke-white',
            type: String,
        },
        router: {
            type: Boolean,
            default: false,
        },
        submit: {
            default: false,
            type: Boolean,
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