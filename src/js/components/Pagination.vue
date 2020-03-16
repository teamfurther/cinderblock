<template>
    <nav class="pagination">
        <ul class="pagination__list">
            <li>
                <a class="pagination__previous" v-on:click="updateCurrentPage(activePage - 1)"><icon icon="chevron-left" class="is-light-gray has-blue-hover" /></a>
            </li>
            <template v-if="!this.$slots.default">
                <li v-if="beforeDots">
                    <span class="pagination__ellipsis">&hellip;</span>
                </li>

                <li v-for="(item, index) in items">
                    <a class="pagination__link" v-bind:class="{'is-active': activePage == item}" v-on:click="updateCurrentPage(item)">
                        {{ item }}
                    </a>
                </li>

                <li v-if="afterDots">
                    <span class="pagination__ellipsis">&hellip;</span>
                </li>
            </template>
            <template v-if="this.$slots.default">
                <li><slot></slot></li>
            </template>
            <li>
                <a class="pagination__next" v-on:click="updateCurrentPage(activePage + 1)"><icon icon="chevron-right" class="is-light-gray has-blue-hover" /></a>
            </li>
        </ul>

    </nav>
</template>

<script lang="ts">
    import Icon from './Icon';

    import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {
            Icon
        }
    })
    export default class Pagination extends Vue {
        // Data
        private limit: number = 5;
        private activePage: number = 1;

        // Computed
        get afterDots(): boolean {
            return this.activePage < this.pages - this.maxNextItems;
        }

        get beforeDots(): boolean {
            return this.activePage > this.maxPrevItems + 1;
        }

        get computedLimit(): number {
            return this.limit - (this.afterDots ? 1 : 0) - (this.beforeDots ? 1 : 0);
        }

        get items(): number[] {
            if (this.activePage - this.maxPrevItems <= 1 ) {
                return Array.from({ length: this.itemsAmount }, (v, i) => i + 1 );
            } else {
                return Array.from({length: this.itemsAmount}, (v, i) => {
                    return this.lastItem - i;
                }).reverse();
            }
        }

        get itemsAmount(): number {
            return this.pages < this.computedLimit ? this.pages : this.computedLimit;
        }

        get lastItem(): number {
            return this.range >= this.pages ? this.pages : this.range - (this.afterDots ? 1 : 0);
        }

        get maxPrevItems(): number {
            return Math.floor((this.limit - 1) / 2);
        }

        get maxNextItems(): number {
            return Math.ceil((this.limit - 1) / 2);
        }

        get range(): number {
            return this.activePage + this.maxNextItems;
        }

        // Emits
        @Emit()
        updateCurrentPage(page: number) {
            if (page !== this.activePage && page > 0 && page <= this.pages) {
                this.activePage = page;
            }

            return this.activePage;
        }

        // Lifecycle hooks
        mounted() {
            this.activePage = this.currentPage;
        }

        // Props
        @Prop({
            required: true,
            type: Number
        }) currentPage!: number;

        @Prop({
            required: true,
            type: Number
        }) pages!: number;
    };
</script>

<style lang="scss">
    @import '../../scss/components/Pagination';
</style>