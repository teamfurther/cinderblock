<template>
    <nav class="c-pagination flex items-center justify-center text-center">
        <ul class="c-pagination__list flex flex-wrap grow items-center justify-center order-2 shrink text-center">
            <li>
                <a class="c-pagination__previous align-top cursor-pointer h-10 inline-flex items-center justify-center m-1 min-w-10 pl-2 relative text-center text-slate-800"
                   v-bind:class="{ 'cursor-not-allowed opacity-30 pointer-events-none' : activePage === 1 }"
                   v-on:click="updateCurrentPage(activePage - 1)"
                >
                    <c-icon class="h-6 hover:stroke-highlight stroke-slate-800 w-6" icon="chevron-left" />
                </a>
            </li>
            <template v-if="!$slots.default">
                <li v-if="beforeDots">
                    <span class="c-pagination__ellipsis align-top h-10 inline-flex items-center justify-center m-1 min-w-10 px-2 relative text-center text-slate-800">&hellip;</span>
                </li>

                <li v-for="(item, index) in items">
                    <a class="c-pagination__link align-top border-slate-200 cursor-pointer h-10 hover:bg-slate-300 inline-flex items-center justify-center m-1 min-w-[2.5rem] px-2 relative rounded text-center text-slate-800"
                       v-bind:class="{'!bg-highlight text-white': activePage === item}" v-on:click="updateCurrentPage(item)"
                    >
                        {{ item }}
                    </a>
                </li>

                <li v-if="afterDots">
                    <span class="c-pagination__ellipsis align-top cursor-pointer h-10 inline-flex items-center justify-center m-1 min-w-10 px-2 relative text-center text-slate-800">&hellip;</span>
                </li>
            </template>
            <template v-if="$slots.default">
                <li><slot></slot></li>
            </template>
            <li>
                <a class="c-pagination__next align-top cursor-pointer h-10 inline-flex items-center justify-center m-1 min-w-10 pr-2 relative text-center text-slate-800"
                   v-bind:class="{ 'cursor-not-allowed opacity-30 pointer-events-none' : activePage === pages }"
                   v-on:click="updateCurrentPage(activePage + 1)">
                    <c-icon class="h-6 hover:stroke-highlight stroke-slate-800 w-6" icon="chevron-right" />
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';

    import CIcon from './CIcon.vue';

    const emits = defineEmits(['updatePage']);
    const limit: number = 5;
    let activePage = ref<number>(1);

    const afterDots = computed(() => {
        return activePage.value < (props.pages - maxNextItems.value);
    });

    const beforeDots = computed(() => {
        return activePage.value > (maxPrevItems.value + 1);
    });

    const computedLimit = computed(() => {
        return limit - (afterDots.value ? 1 : 0) - (beforeDots.value ? 1 : 0);
    });

    const items = computed(() => {
        if (activePage.value - maxPrevItems.value <= 1 ) {
            return Array.from({ length: itemsAmount.value }, (v, i) => i + 1 );
        } else {
            return Array.from({ length: itemsAmount.value }, (v, i) => {
                return lastItem.value - i;
            }).reverse();
        }
    });

    const itemsAmount = computed(() => {
        return (props.pages < computedLimit.value) ? props.pages : computedLimit.value;
    });

    const lastItem = computed(() => {
        return range.value >= props.pages ? props.pages : range.value - (afterDots ? 1 : 0);
    });

    const maxNextItems = computed(() => {
        return Math.ceil((limit - 1) / 2);
    });

    const maxPrevItems = computed(() => {
        return Math.floor((limit - 1) / 2);
    });

    const range = computed(() => {
        return activePage.value + maxNextItems.value;
    });

    const props = defineProps({
        currentPage: {
            required: true,
            type: Number,
        },
        pages: {
            required: true,
            type: Number,
        },
    });

    onMounted(() => {
        activePage.value = props.currentPage;
    });

    function updateCurrentPage(page: number) {
        if (page !== activePage.value && page > 0 && page <= props.pages) {
            activePage.value = page;
        }

        emits('updatePage', activePage.value);

        return activePage.value;
    }
</script>