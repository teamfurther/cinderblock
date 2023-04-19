<template>
    <div class="c-alerts bottom-3 container left-1/2 fixed px-1 -translate-x-1/2 z-40">
        <c-alert
            v-bind:message="alert.message"
            v-bind:title="alert.title"
            v-bind:type="alert.type as AlertTypeEnum"
            v-for="alert in alerts"
        ></c-alert>
    </div>
</template>

<script setup lang="ts">
    import CAlert from './CAlert.vue';
    import { AlertTypeEnum } from '../enums/AlertTypeEnum';
    import { AlertType } from '../types/AlertType';

    const props = defineProps({
        alerts: {
            required: true,
            type: Array<AlertType>,
        },
    });
</script>