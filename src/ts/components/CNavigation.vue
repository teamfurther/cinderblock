<template>
    <div class="c-navigation__wrapper relative">
        <div class="c-navigation bg-white border-l border-l-slate-200 fixed flex flex-col hidden h-screen lg:bg-transparent lg:border-l-0 lg:flex lg:flex-row lg:h-auto lg:py-0 lg:static py-10 right-0 top-0 w-[75%] z-50"
             v-bind:class="{ '!flex' : open }"
        >
            <slot></slot>

            <a class="c-navigation__close absolute cursor-pointer lg:hidden lg:pointer-events-none right-4 text-slate-800 text-3xl top-2"
               v-on:click="close"
            >&times;</a>
        </div>
        <a class="c-navigation__burger cursor-pointer lg:hidden relative right-0 w-6"
           v-on:click="toggle"
        >
            <span class="bg-slate-500 block h-0.5 w-6" aria-hidden="true"></span>
            <span class="bg-slate-500 block h-0.5 mt-1 w-6" aria-hidden="true"></span>
            <span class="bg-slate-500 block h-0.5 mt-1 w-5" aria-hidden="true"></span>
        </a>
        <div class="c-navigation__backdrop bg-slate-900 bg-opacity-70 fixed h-full left-0 lg:opacity-0 lg:pointer-events-none opacity-0 pointer-events-none po top-0 w-full z-40"
             v-bind:class="{ 'opacity-100 pointer-events-auto': open }"
             v-on:click="close"
        ></div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    let open = ref<boolean>(false);

    function close() {
        open.value = false;
    }

    function toggle() {
        open.value = !open.value;
    }
</script>