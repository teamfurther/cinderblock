<template>
    <div class="c-control c-control-radio">
        <label class="c-control__label block font-medium mb-1 text-slate-800 text-sm"
               v-bind:class="{ '!text-error': invalid, 'after:content-[\'*\'] after:text-red-400': required }"
               v-bind:for="name"
               v-if="label"
        >
            {{ label }}
        </label>

        <div class="c-control__group c-control-radio__group grid w-full"
             v-bind:class="[grid, { 'cursor-not-allowed opacity-30' : disabled, 'cursor-not-allowed' : readonly }]"
        >
            <label class="cursor-pointer duration-500 flex group hover:bg-slate-100 items-center px-2.5 py-1 relative rounded text-slate-700 text-sm transition-all w-auto"
                   v-bind:class="{ '!cursor-not-allowed opacity-30' : option.disabled, '!text-error' : invalid }"
                   v-for="option in options"
            >
                <input class="c-control__radio c-control-radio__radio h-4 mr-2 opacity-0 peer relative w-4 z-20" type="radio"
                       v-bind:class="{ '!border-error' : invalid }"
                       v-bind:checked="selectedValue === option.value"
                       v-bind:disabled="option.disabled"
                       v-bind:name="name"
                       v-bind:readonly="readonly"
                       v-bind:value="option.value"
                       v-on:change="updateSelectedValue(option.value)"
                />
                <span class="absolute before:absolute before:content-['&#x2714;'] before:flex before:font-['Zapf_Dingbats'] before:h-full before:items-center before:justify-center before:left-0 before:text-white before:text-xs before:top-0 before:w-full bg-white border-2 border-slate-500 duration-500 h-4 left-1 peer-checked:bg-highlight peer-checked:border-highlight rounded-full transition-all w-4 z-10"
                      v-bind:class="{ 'group-hover:border-highlight' : !option.disabled, '!border-error peer-checked:!bg-error' : invalid }"
                ></span>
                {{ option.label }}
            </label>

            <c-tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</c-tooltip-icon>
        </div>

        <div class="c-control__notes c-control-radio__notes text-slate-800 text-sm"
             v-bind:class="{ '!text-error': invalid }"
             v-if="$slots.notes"
        >
            <slot name="notes"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, PropType, ref, watch } from 'vue';

    import CTooltipIcon from './CTooltipIcon.vue';
    import { PositionEnum } from '../enums/PositionEnum';
    import { OptionType } from '../types/OptionType';

    const emits = defineEmits(['update:modelValue']);
    let selectedValue = ref<any>(null);

    const props = defineProps({
        disabled: {
            default: false,
            type: Boolean,
        },
        grid: {
            default: '',
            type: String,
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
            required: true,
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

    onMounted(() => {
        setup();
    });

    function setup() {
        selectedValue.value = props.modelValue;
    }

    function updateSelectedValue(value: any) {
        selectedValue.value = value;

        emits('update:modelValue', selectedValue.value);
    }

    watch(() => props.modelValue, () => {
        selectedValue.value = props.modelValue;
    });
</script>