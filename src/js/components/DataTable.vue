<template>
    <div class="data-table__wrapper">
        <table class="data-table">
            <thead v-if="tableData.columnNames && !tableData.hideHeader">
                <tr>
                    <th v-bind:class="alignClass(key)"
                        v-for="(columnName, key) in tableData.columnNames"
                    >
                        <a v-on:click="sort(key)">
                            {{ columnName }}
                            <span class="triangle triangle--up"
                                  v-if="tableData.sortableColumns
                                  && tableData.sortableColumns.includes(key)
                                  && (sortBy === key || (sortBy !== key && sortBy !== '-' + key))"
                            ></span>
                            <span class="triangle triangle--down"
                                  v-if="tableData.sortableColumns
                                  && tableData.sortableColumns.includes(key)
                                  && (sortBy === '-' + key || (sortBy !== key && sortBy !== '-' + key))"
                            ></span>
                        </a>
                    </th>
                    <th class="data-table__actions"></th>
                </tr>
            </thead>
            <tbody v-if="tableData.items">
                <template v-for="(item, index) in tableData.items">
                    <tr>
                        <td v-bind:class="alignClass(column)"
                            v-for="(column, key) in Object.keys(tableData.columnNames)"
                            v-if="tableData.columnNames.hasOwnProperty(column)"
                        >
                            <a class="collapsible-action"
                               v-if="key === 0 && item.childData"
                            >
                                <span class="triangle triangle--up"
                                      v-if="openedChildRows.includes(index)"
                                      v-on:click="toggleChildRow(index)"
                                ></span>
                                <span class="triangle triangle--down"
                                      v-else
                                      v-on:click="toggleChildRow(index)"
                                ></span>
                            </a>
                            <icon icon="corner-down-right" class="is-light-gray data-table__child-icon"
                                  v-if="key === 0"
                            />
                            <span v-html="item.values[column]"></span>
                        </td>
                        <td class="data-table__actions" v-bind:class="{ 'is-visible': tableData.showActions }">
                            <template v-for="action in item.actions">
                                <a class="action"
                                   v-bind:class="action.class ? action.class : ''"
                                   v-bind:href="action.url"
                                   v-if="action.url"
                                >
                                    <icon v-bind:class="action.class ? action.class : ''"
                                          v-bind:icon="action.icon"
                                          v-if="action.icon"
                                    />
                                    <span v-html="action.title"></span>
                                </a>
                                <a class="action"
                                   v-bind:class="action.class ? action.class : ''"
                                   v-on:click="callParentActionMethod(action.method, item.values)"
                                   v-else
                                >
                                    <icon v-bind:class="action.class ? action.class : ''"
                                          v-bind:icon="action.icon" v-if="action.icon"
                                    />
                                    <span v-html="action.title"></span>
                                </a>
                                <control v-bind:icon="action.control.icon"
                                         v-bind:label="action.control.label"
                                         v-bind:name="action.control.name"
                                         v-bind:options="action.control.options"
                                         v-bind:placeholder="action.control.placeholder"
                                         v-bind:tooltip="action.control.tooltip"
                                         v-bind:tooltip-position="action.control.tooltipPosition"
                                         v-bind:type="action.control.type"
                                         v-bind:is-disabled="action.control.isDisabled"
                                         v-bind:is-invalid="action.control.isInvalid"
                                         v-bind:is-required="action.control.isRequired"
                                         v-model="controlValues[index]"
                                         v-if="action.control"
                                         v-on:input="controlValueChanged(index, action)"
                                ></control>
                            </template>
                        </td>
                    </tr>
                        <tr class="data-table__child-row" v-if="item.childData && openedChildRows.includes(index)">
                        <td v-bind:colspan="Object.keys(item.values).length + 1">
                            <data-table v-bind:data="item.childData"></data-table>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
    import Control from './Control';
    import Icon from './Icon';

    import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

    @Component({
        components: {
            Control,
            Icon
        }
    })
    export default class DataTable extends Vue {
        // Data
        private controlValues: any[] = [];
        private sortBy: string = '';
        private openedChildRows: number[] = [];
        private tableData: {[key: string]: any} = {};


        // Emits
        @Emit()
        sort(column: string) {
            if (this.sortBy == column) {
                this.sortBy = '-' + column;
            } else {
                this.sortBy = column;
            }
            return this.sortBy;
        }

        // Lifecycle hooks
        mounted() {
            this.tableData = this.data;
        }

        // Methods
        alignClass(column: string): string {
            return 'is-' + (!this.tableData.hasOwnProperty('columnAligns') || !this.tableData.columnAligns[column]
                ? 'left'
                : this.tableData.columnAligns[column]);
        }

        callParentActionMethod(methodName: string, methodParams: any): void {
            (this.$parent as any)[methodName](methodParams);
        }

        toggleChildRow(index: number): void {
            if (this.openedChildRows.includes(index)) {
                this.openedChildRows.splice(this.openedChildRows.indexOf(index), 1);
            } else {
                this.openedChildRows.push(index);
            }
        }

        controlValueChanged(index: number, action: {[key: string]: any}): void {
            (this.$parent as any)[action.control.method](this.controlValues[index], this.tableData.items[index].values);
        }

        // Props
        @Prop({
            required: true,
            type: Object
        }) data!: Object[];

        // Watchers
        @Watch('data')
        dataChanged() {
            this.tableData = this.data;
        }
    }
</script>

<style lang="scss">
    @import '../../scss/components/DataTable';
</style>