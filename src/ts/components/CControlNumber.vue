<template>
    <div class="c-control c-control-number">
        <label class="c-control__label block font-medium mb-1 text-slate-800 text-sm"
               v-bind:class="[{ '!text-error': invalid, 'after:content-[\'*\'] after:text-red-400': required }, classLabel]"
               v-bind:for="name"
               v-if="label"
        >
            {{ label }}
        </label>

        <div class="c-control__group c-control-number__group border-b border-b-slate-300 flex items-center relative"
             v-bind:class="[{ '!border-b-slate-100' : disabled, '!border-b-error' : invalid }, classGroup]"
        >
            <input class="c-control__field c-control-text__field bg-transparent block disabled:bg-white disabled:cursor-not-allowed disabled:text-slate-400 focus:outline-0 h-8 leading-none peer px-1 read-only:pointer-events-none text-slate-800 text-sm w-full" type="number"
                   v-bind:class="[{ '!text-error': invalid }, classField]"
                   v-bind:disabled="disabled"
                   v-bind:id="name"
                   v-bind:max="max"
                   v-bind:min="min"
                   v-bind:name="name"
                   v-bind:placeholder="placeholder"
                   v-bind:readonly="readonly"
                   v-bind:step="step"
                   v-bind:value="modelValue"
                   v-on:input="emitValue"
            />
            <span class="absolute bg-highlight -bottom-px duration-500 h-px left-0 opacity-0 peer-focus:opacity-100 peer-focus:w-full transition-all w-0"></span>

            <c-icon class="h-6 peer-focus:stroke-highlight stroke-slate-800 w-6"
                    v-bind:class="{
                        '!stroke-slate-400' : disabled,
                        'mr-2 order-first' : iconPosition === 'left',
                        'ml-2' : iconPosition === 'right',
                        '!stroke-error' : invalid
                    }"
                    v-bind:icon="icon" v-if="icon"
            />

            <c-tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</c-tooltip-icon>
        </div>

        <div class="c-control__notes c-control-number__notes text-slate-800 text-sm"
             v-bind:class="{ '!text-error': invalid }"
             v-if="$slots.notes"
        >
            <slot name="notes"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { PropType } from 'vue';

    import CIcon from './CIcon.vue';
    import CTooltipIcon from './CTooltipIcon.vue';
    import { PositionEnum } from '../enums/PositionEnum';
    import { PositionXEnum } from '../enums/PositionXEnum';
    import { TextControlTypeEnum } from '../enums/TextControlTypeEnum';

    const emits = defineEmits(['update:modelValue']);

    const props = defineProps({
        classField: {
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
        icon: {
            default: '',
            type: String,
        },
        iconPosition: {
            default: 'left',
            type: String as PropType<PositionXEnum>,
        },
        invalid: {
            default: false,
            type: Boolean,
        },
        label: {
            default: '',
            type: String,
        },
        max: {
            default: null,
            type: Number,
        },
        min: {
            default: null,
            type: Number,
        },
        modelValue: {
            default: null,
        },
        name: {
            required: true,
            type: String,
        },
        placeholder: {
            default: null,
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
        step: {
            default: 1,
            type: Number,
        },
        tooltip: {
            default: '',
            type: String,
        },
        tooltipPosition: {
            default: 'bottom',
            type: String as PropType<PositionEnum>,
        },
        type: {
            default: 'text',
            type: String as PropType<TextControlTypeEnum>,
        },
    });

    function emitValue(e: Event) {
        emits('update:modelValue', (<HTMLInputElement>e.target).value);
    }
</script>