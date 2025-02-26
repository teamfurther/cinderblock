<template>
    <div class="c-control c-control-toggle">
        <label class="c-control__label block font-medium mb-1 text-slate-800 text-sm"
               v-bind:class="[{ '!text-error': invalid, 'after:content-[\'*\'] after:text-red-400': required }, classLabel]"
               v-bind:for="name"
               v-if="label"
        >
            {{ label }}
        </label>

        <div class="c-control__group c-control-toggle__group flex items-center"
             v-bind:class="[{ 'cursor-not-allowed opacity-30' : disabled, 'cursor-not-allowed' : readonly }, classGroup]"
        >
            <div class="c-control__toggle__wrapper flex relative" v-bind:class="classFieldWrapper">
                <input class="c-control__toggle cursor-pointer h-[30px] opacity-0 peer relative w-[60px] z-20" type="checkbox"
                       v-bind:checked="selectedValue"
                       v-bind:class="classField"
                       v-bind:disabled="disabled"
                       v-bind:id="name"
                       v-bind:name="name"
                       v-bind:readonly="readonly"
                       v-on:change="updateSelectedValue(!selectedValue)"
                />
                <span class="c-control__toggle__mask absolute before:absolute before:bg-slate-200 before:content-[''] before:block before:duration-500 before:h-5 before:left-0 before:ml-[3px] before:rounded-full before:top-1/2 before:transition-all before:-translate-y-1/2 before:w-5 bg-slate-100 border border-slate-200 duration-500 h-[30px] left-0 peer-checked:before:bg-white peer-checked:before:ml-[35px] peer-checked:bg-highlight peer-checked:border-highlight rounded-full transition-all w-[60px] z-10"></span>
            </div>

            <c-tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</c-tooltip-icon>
        </div>

        <div class="c-control__notes c-control-toggle__notes text-slate-800 text-sm"
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

    const emits = defineEmits(['update:modelValue']);
    let selectedValue = ref<any>(null);

    const props = defineProps({
        classField: {
            default: '',
            type: String,
        },
        classFieldWrapper: {
            default: '',
            type: String,
        },
        classGroup: {
            default: '',
            type: String,
        },
        classLabel: {
            default: '',
            type: String,
        },
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
            required: true,
            type: String,
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