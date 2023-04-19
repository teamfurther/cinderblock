<template>
    <table class="c-data-table bg-white border-spacing-0 text-slate-800 text-sm w-full">
        <thead v-if="tableData.columnNames && !tableData.hideHeader">
            <tr>
                <th class="bg-slate-100 border-y border-slate-200 p-2.5 text-left text-sm"
                    v-bind:class="{
                        'text-center' : tableData.columnAligns && tableData.columnAligns[key] === 'center',
                        'text-right' : tableData.columnAligns && tableData.columnAligns[key] === 'right'
                    }"
                    v-for="(columnName, key) in tableData.columnNames"
                >
                    <a class="inline-block relative"
                       v-bind:class="{ 'cursor-pointer' : tableData.sortableColumns && tableData.sortableColumns.includes(key) }"
                       v-on:click="sort(key)"
                    >
                        {{ columnName }}
                        <span class="absolute border-4 border-b-slate-700 border-transparent cursor-pointer h-0 ml-2 -mt-2.5 top-1/2 w-0"
                              v-if="tableData.sortableColumns
                              && tableData.sortableColumns.includes(key)
                              && (sortBy === '+' + key || (sortBy !== '+' + key && sortBy !== '-' + key))"
                        ></span>
                        <span class="absolute border-4 border-t-slate-700 border-transparent cursor-pointer h-0 ml-2 mt-0.5 top-1/2 w-0"
                              v-if="tableData.sortableColumns
                              && tableData.sortableColumns.includes(key)
                              && (sortBy === '-' + key || (sortBy !== '+' + key && sortBy !== '-' + key))"
                        ></span>
                    </a>
                </th>
            </tr>
        </thead>
        <tbody v-if="tableData.items">
            <template v-for="(item, index) in tableData.items">
                <tr class="group">
                    <td class="border-y border-slate-200 group-hover:bg-slate-50 p-2"
                        v-bind:class="{
                            'text-center' : tableData.columnAligns && tableData.columnAligns[column] === 'center',
                            'text-right' : tableData.columnAligns && tableData.columnAligns[column] === 'right'
                        }"
                        v-for="(column, key) in Object.keys(tableData.columnNames)"
                    >
                        <a class="inline-block relative pr-4"
                           v-if="key === 0 && item.children"
                        >
                            <span class="absolute border-[5px] border-t-slate-700 border-transparent cursor-pointer h-0 -mt-1.5 top-1/2 w-0"
                                  v-if="openedChildRows.includes(index)"
                                  v-on:click="toggleChildRow(index)"
                            ></span>
                            <span class="absolute border-[5px] border-l-slate-700 border-transparent cursor-pointer h-0 top-1/2 -translate-y-full w-0"
                                  v-else
                                  v-on:click="toggleChildRow(index)"
                            ></span>
                        </a>
                        <slot v-bind:name="`item.${column}`" v-bind:item="item">
                            <span v-html="item.values[column]"></span>
                        </slot>
                    </td>
                </tr>
                <tr class="c-data-table__child-row" v-if="item.children && openedChildRows.includes(index)">
                    <td class="p-0" v-bind:colspan="Object.keys(item.values).length + 1">
                        <c-data-table v-bind:data="item.children"></c-data-table>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    const emits = defineEmits(['sortTable']);
    const openedChildRows = ref<number[]>([]);
    const sortBy = ref<string>('');
    const tableData = ref<{[key: string]: any}>({});

    function sort(column: string|number) {
        if (sortBy.value === '+' + column) {
            sortBy.value = '-' + column;
        } else {
            sortBy.value = '+' + column;
        }

        emits('sortTable', sortBy.value);
    }

    function toggleChildRow(index: number): void {
        if (openedChildRows.value.includes(index)) {
            openedChildRows.value.splice(openedChildRows.value.indexOf(index), 1);
        } else {
            openedChildRows.value.push(index);
        }
    }

    onMounted(() => {
        tableData.value = props.data;

        sortBy.value = tableData.value.defaultSort;
    });

    const props = defineProps({
        data: {
            required: true,
            type: Object,
        },
    });
</script>