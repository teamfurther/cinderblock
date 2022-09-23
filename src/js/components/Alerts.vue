<template>
    <div class="alert__wrapper">
        <alert
                v-bind:key="key"
                v-bind:message="alert.message"
                v-bind:title="alert.title"
                v-bind:type="alert.type"
                v-for="(alert, key) in alertsArray"
                v-on:alert-closed="alertClosed"
                v-on:close-alert="closeAlert"
        ></alert>
    </div>
</template>

<script lang="ts">
    import Alert from './Alert.vue';

    import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

    @Component({
        components: {
            Alert
        }
    })
    export default class Alerts extends Vue {
        // Data
        private alertsArray: Object[] = [];

        // Emits
        @Emit()
        alertClosed(key: number) {
            return key;
        }

        @Emit()
        closeAlert(key: number) {
            return key;
        }

        // Lifecycle hooks
        mounted() {
            this.alertsArray = this.alerts;
        }

        // Props
        @Prop({
            required: true,
            type: Array
        }) alerts!: Object[];

        // Watchers
        @Watch('alerts')
        alertsChanged() {
            this.alertsArray = this.alerts;
        }
    };
</script>

<style lang="scss">
    @import '../../scss/components/Alerts';
</style>