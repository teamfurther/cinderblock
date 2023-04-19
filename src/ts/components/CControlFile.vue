<template>
    <div class="c-control c-control-file">
        <label class="c-control__label block font-medium mb-1 text-slate-800 text-sm"
               v-bind:class="{ 'text-error': invalid, 'after:content-[\'*\'] after:text-red-400': required }"
               v-bind:for="name"
               v-if="label"
        >
            {{ label }}
        </label>

        <div class="c-control__group c-control-file__group border-b border-b-slate-300 flex items-center relative"
             v-bind:class="{ '!border-b-slate-100' : disabled, '!border-b-error' : invalid }"
        >
            <input class="c-control__field c-control-file__field bg-transparent block disabled:bg-white disabled:cursor-not-allowed disabled:text-slate-400 focus:outline-0 h-8 leading-none px-1 text-slate-800 text-sm w-full" type="file"
                   v-bind:disabled="disabled"
                   v-bind:id="name"
                   v-bind:multiple="multiple"
                   v-bind:name="name"
                   v-bind:readonly="readonly"
                   v-on:change="setFile"
            />

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
        <div class="c-control__file flex mt-2.5"
             v-bind:class="{ 'cursor-not-allowed opacity-30 pointer-event-none': disabled, 'cursor-not-allowed pointer-event-none': readonly }"
             v-if="selectedFilenames"
        >
            <a class="bg-highlight duration-500 flex items-center mr-2 px-1.5 py-1 rounded text-white text-xs transition-all"
               v-for="(file, key) in selectedFilenames">
               {{ file }}
                <span class="after:absolute after:content-['&times;'] after:left-1/2 after:-mt-px after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 bg-white cursor-pointer font-extrabold h-4 ml-1 relative rounded-full text-highlight w-4" v-on:click="removeFile(key)"></span>
            </a>
        </div>

        <div class="c-control__notes c-control-file__notes text-slate-800 text-sm"
             v-bind:class="{ 'text-error': invalid }"
             v-if="$slots.notes"
        >
            <slot name="notes"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, PropType, ref } from 'vue';

    import CIcon from './CIcon.vue';
    import CTooltipIcon from './CTooltipIcon.vue';
    import { PositionEnum } from '../enums/PositionEnum';
    import { PositionXEnum } from '../enums/PositionXEnum';

    const emits = defineEmits(['update:modelValue']);
    let selectedFilenames = ref<string[]>(['']);
    let selectedValues = ref<any[]>([null]);

    const props = defineProps({
        disabled: {
            default: false,
            type: Boolean,
        },
        filenames: {
            default: [''],
            type: Array<string>,
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
            default: [null],
        },
        multiple: {
            default: false,
            type: Boolean,
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

    onMounted(() => {
        setup();
    });

    function removeFile(key: number) {
        selectedFilenames.value.splice(key, 1);
        selectedValues.value.splice(key, 1);

        emits('update:modelValue', selectedValues.value);
    }

    function setFile(e: Event) {
        const input: HTMLInputElement = (<HTMLInputElement>e.target);
        const files: FileList | null = input.files;

        if (FileReader && files && files.length) {
            Array.from(files).forEach((file) => {
                const reader: FileReader = new FileReader();

                reader.onload = () => {
                    selectedFilenames.value.push(file.name);
                    selectedValues.value.push(reader.result);
                };

                reader.readAsDataURL(file);
            });
        }

        emits('update:modelValue', selectedValues.value);
    }

    function setup() {
        selectedFilenames.value = props.filenames;
        selectedValues.value = props.modelValue;
    }
</script>