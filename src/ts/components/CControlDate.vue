<template>
    <div class="c-control c-control-date">
        <label class="c-control__label block font-medium mb-1 text-slate-800 text-sm"
               v-bind:class="{ 'text-error': invalid, 'after:content-[\'*\'] after:text-red-400': required }"
               v-bind:for="name"
               v-if="label"
        >
            {{ label }}
        </label>

        <div class="c-control__group c-control-date__group border-b border-b-slate-300 flex items-center relative"
             v-bind:class="{ '!border-b-slate-100' : disabled, '!border-b-error' : invalid }"
        >
            <Datepicker class="w-full"
                        v-bind="datepickerAttrs"
                        v-bind:model-value="modelValue"
                        v-on:update:modelValue="emitValue">
                <template v-slot:dp-input="{ value, onInput, onEnter, onTab, onClear }">
                    <input class="c-control__field c-control-date__field bg-transparent block disabled:bg-white disabled:cursor-not-allowed disabled:text-slate-400 focus:outline-0 h-8 leading-none px-1 read-only:pointer-events-none text-slate-800 text-sm w-full" type="text"
                           v-bind:disabled="disabled"
                           v-bind:id="name"
                           v-bind:name="name"
                           v-bind:placeholder="placeholder"
                           v-bind:readonly="readonly"
                           v-bind:value="value"
                    />
                </template>
            </Datepicker>

            <c-icon class="h-6 stroke-slate-800 w-6"
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

        <div class="c-control__notes c-control-date__notes text-slate-800 text-sm"
             v-bind:class="{ 'text-error': invalid }"
             v-if="$slots.notes"
        >
            <slot name="notes"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, PropType, useAttrs } from 'vue';
    import Datepicker from '@vuepic/vue-datepicker';

    import CIcon from './CIcon.vue';
    import CTooltipIcon from './CTooltipIcon.vue';
    import { PositionEnum } from '../enums/PositionEnum';
    import { PositionXEnum } from '../enums/PositionXEnum';

    const datepickerAttrs = computed(() => {
        let returnObj: Record<string, any> = [];
        const attrs = useAttrs();

        for (const attr in attrs) {
            if (attr !== 'class') {
                returnObj[attr] = attrs[attr];
            }
        }

        return returnObj;
    });

    const emits = defineEmits(['update:modelValue']);

    const props = defineProps({
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
        emits('update:modelValue', e);
    }
</script>