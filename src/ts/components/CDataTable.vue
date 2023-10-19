<template>
    <div class="c-data-table w-full"
         v-bind:class="{ 'overflow-auto' : responsiveBehaviour === 'scroll' }"
    >
        <table class="bg-white border-spacing-0 text-slate-800 text-sm"
               v-bind="$attrs"
               v-bind:class="[
                   tableWidthClass[responsiveBreakpoint as keyof typeof tableWidthClass],
                   {
                       [tableDisplayClass[responsiveBreakpoint as keyof typeof tableDisplayClass]] : responsiveBehaviour === 'stack',
                       'w-full' : responsiveBehaviour !== 'scroll'
                   }
               ]"
        >
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
        <div class="c-data-table bg-white border-b-2 border-slate-200 mb-2"
             v-bind="$attrs"
             v-bind:class="[
                 stackDisplayClass[responsiveBreakpoint as keyof typeof stackDisplayClass],
                 { 'hidden' : responsiveBehaviour !== 'stack' }
             ]"
             v-for="item in tableData.items" v-if="tableData.items"
        >
            <div class="border-b border-slate-200 gap-4 grid grid-cols-2 py-1"
                 v-for="(columnName, column) in tableData.columnNames"
            >
                <strong class="flex items-center text-sm">{{ columnName }}</strong>
                <slot v-bind:name="`item.${column}`" v-bind:item="item">
                    <span v-html="item.values[column]"></span>
                </slot>
            </div>

            <div class="bg-slate-100 border-b-2 border-slate-200 pl-2" v-if="item.children">
                <c-data-table class="!border-b" v-bind:data="item.children"></c-data-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, PropType } from 'vue';

    import { DataTableResponsiveBehaviourEnum } from '../enums/DataTableResponsiveBehaviourEnum';
    import { ResponsiveBreakpointsEnum } from '../enums/ResponsiveBreakpointsEnum';

    const stackDisplayClass = {
        md: 'md:hidden',
        lg: 'lg:hidden',
        xl: 'xl:hidden',
        '2xl': '2xl:hidden',
    }

    const tableDisplayClass = {
        md: 'hidden md:table',
        lg: 'hidden lg:table',
        xl: 'hidden xl:table',
        '2xl': 'hidden 2xl:table',
    }

    const tableWidthClass = {
        md: 'md:!w-full',
        lg: 'lg:!w-full',
        xl: 'xl:!w-full',
        '2xl': '2xl:!w-full',
    }

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

    defineOptions({
        inheritAttrs: false
    });

    const props = defineProps({
        data: {
            required: true,
            type: Object,
        },
        responsiveBehaviour: {
            default: 'stack',
            type: String as PropType<DataTableResponsiveBehaviourEnum>,
        },
        responsiveBreakpoint: {
            default: 'md',
            type: String as PropType<ResponsiveBreakpointsEnum>,
        },
    });
</script>