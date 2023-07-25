<template>
    <div class="c-control c-control-select">
        <label class="c-control__label block font-medium mb-1 text-slate-800 text-sm"
               v-bind:class="{ '!text-error': invalid, 'after:content-[\'*\'] after:text-red-400': required }"
               v-bind:for="name"
               v-if="label"
        >
            {{ label }}
        </label>

        <div class="c-control__group c-control-select__group border-b border-b-slate-300 flex flex-col items-start"
             v-bind:class="{ 'cursor-not-allowed opacity-30' : disabled, '!border-b-red-400' : invalid }"
        >
            <select class="control__select bg-transparent border-0 focus:outline-0 h-8 text-sm w-full"
                    v-bind:class="{ '!border-b-error !text-error' : invalid }"
                    v-bind:disabled="disabled"
                    v-bind:id="name"
                    v-bind:name="name"
                    v-bind:readonly="readonly"
                    v-bind:value="modelValue"
                    v-on:input="emitValue"
            >
                <option v-bind:value="option.value" v-for="option in options">
                    {{ option.label }}
                </option>
            </select>

            <c-tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</c-tooltip-icon>
        </div>

        <div class="c-control__notes c-control-select__notes text-slate-800 text-sm"
             v-bind:class="{ '!text-error': invalid }"
             v-if="$slots.notes"
        >
            <slot name="notes"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { PropType } from 'vue';

    import CTooltipIcon from './CTooltipIcon.vue';
    import { PositionEnum } from '../enums/PositionEnum';
    import { OptionType } from '../types/OptionType';

    const emits = defineEmits(['update:modelValue']);

    const props = defineProps({
        disabled: {
            default: false,
            type: Boolean,
        },
        invalid: {
            default: false,
            type: Boolean,
        },
        label: {
            default: '',
            type: String,
        },
        modelValue: {
            default: [],
        },
        name: {
            type: String,
        },
        options: {
            required: true,
            type: Array<OptionType>,
        },
        readonly: {
            default: false,
            type: Boolean,
        },
        required: {
            default: false,
            type: Boolean,
        },
        tooltip: {
            default: '',
            type: String,
        },
        tooltipPosition: {
            default: 'bottom',
            type: String as PropType<PositionEnum>,
        },
    });

    function emitValue(e: Event) {
        emits('update:modelValue', (<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>e.target).value);
    }
</script>