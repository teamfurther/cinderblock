<template>
    <div class="c-control c-control-checkbox">
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
                   v-bind:class="{ '!text-error' : invalid }"
                   v-for="option in options"
            >
                <input class="c-control__checkbox c-control-checkbox__checkbox h-4 mr-2 opacity-0 peer relative w-4 z-20" type="checkbox"
                       v-bind:checked="selectedValues.indexOf(option.value) !== -1"
                       v-bind:disabled="disabled"
                       v-bind:name="name"
                       v-bind:readonly="readonly"
                       v-bind:value="option.value"
                       v-on:change="updateSelectedValues(option.value)"
                />
                <span class="absolute before:absolute before:content-['&#x2714;'] before:flex before:font-['Zapf_Dingbats'] before:h-full before:items-center before:justify-center before:left-0 before:text-white before:text-xs before:top-0 before:w-full bg-white border-2 border-slate-500 duration-500 group-hover:border-highlight h-4 left-1 peer-checked:bg-highlight peer-checked:border-highlight rounded transition-all w-4 z-10"
                      v-bind:class="{ '!border-error peer-checked:!bg-error' : invalid }"
                ></span>
                {{ option.label }}
            </label>

            <c-tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</c-tooltip-icon>
        </div>

        <div class="c-control__notes c-control-checkbox__notes text-slate-800 text-sm"
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
    let selectedValues = ref<any[]>([]);

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
        selectedValues.value = props.modelValue;
    }

    function updateSelectedValues(value: any) {
        if (selectedValues.value.indexOf(value) !== -1) {
            selectedValues.value.splice(selectedValues.value.indexOf(value), 1);
        } else {
            selectedValues.value.push(value);
        }

        emits('update:modelValue', selectedValues.value);
    }

    watch(() => props.modelValue, () => {
        selectedValues.value = props.modelValue;
    });
</script>