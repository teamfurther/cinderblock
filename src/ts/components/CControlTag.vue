<template>
    <div class="c-control c-control-tag">
        <label class="c-control__label block font-medium mb-1 text-slate-800 text-sm"
               v-bind:class="[{ '!text-error': invalid, 'after:content-[\'*\'] after:text-red-400': required }, classLabel]"
               v-bind:for="name"
               v-if="label"
        >
            {{ label }}
        </label>

        <div class="c-control__group c-control-tag__group border-b border-b-slate-300 flex items-center relative"
             v-bind:class="[{ '!border-b-slate-100' : disabled, '!border-b-error' : invalid }, classGroup]"
        >
            <input class="c-control__field c-control-tag__field bg-transparent block disabled:bg-white disabled:cursor-not-allowed disabled:text-slate-400 focus:outline-0 h-8 leading-none peer px-1 read-only:pointer-events-none text-slate-800 text-sm w-full" autocomplete="off" type="text"
                   v-bind:class="[{ '!text-error': invalid }, classField]"
                   v-bind:disabled="disabled"
                   v-bind:id="name"
                   v-bind:placeholder="placeholder"
                   v-bind:readonly="readonly"
                   v-model="searchString"
                   v-on:keyup="debouncedSearch"
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

            <input type="hidden"
                   v-bind:name="name"
                   v-bind:value="modelValue"
            />

            <c-tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</c-tooltip-icon>

            <ul class="c-control-tag__list absolute bg-white border-slate-200 left-0 max-h-[210px] overflow-y-auto shadow-cinderblock top-full w-full z-30"
                v-if="searchResults.length"
            >
                <li v-for="searchResult in searchResults">
                    <a class="cursor-pointer flex h-8 hover:bg-slate-50 items-center px-2.5 py-1 w-full"
                       v-on:click="selectValue(searchResult)"
                    >
                        <span v-text="typeof labelField === 'function' ? labelField(searchResult) : fetchObject(searchResult, labelField)" />

                        <img class="h-6 -mt-px rounded w-6"
                             v-bind:class="{
                                'mr-2 order-first' : avatarPosition === 'left',
                                'ml-auto' : avatarPosition === 'right',
                             }"
                             v-bind:src="props.avatarField ? fetchObject(searchResult, props.avatarField) : ''"
                             v-if="avatarField"
                        />
                    </a>
                </li>
            </ul>
        </div>
        <ul class="c-control__tags flex flex-wrap mt-2"
            v-bind:class="{ 'cursor-not-allowed opacity-3': disabled, 'cursor-not-allowed': readonly }"
            v-if="selectedTags.length > 0"
        >
            <li v-for="(tag, key) in selectedTags">
                <a class="bg-highlight duration-500 flex items-center mr-1.5 px-1.5 py-1 rounded text-white text-xs transition-all">
                    {{ tag }}
                    <span class="after:absolute after:content-['&times;'] after:left-1/2 after:-mt-px after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 bg-white cursor-pointer font-extrabold h-4 ml-1 relative rounded-full text-highlight w-4" v-on:click="deselectValue(key)"></span>
                </a>
            </li>
        </ul>

        <div class="c-control__notes c-control-tag__notes text-slate-800 text-sm"
             v-bind:class="{ '!text-error': invalid }"
             v-if="$slots.notes"
        >
            <slot name="notes"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, PropType, ref, watch } from 'vue';
    import { debounce } from 'debounce';

    import CIcon from './CIcon.vue';
    import CTooltipIcon from './CTooltipIcon.vue';
    import { PositionEnum } from '../enums/PositionEnum';
    import { PositionXEnum } from '../enums/PositionXEnum';

    const debouncedSearch = debounce((e: InputEvent) => {
        const searchValue: string = (<HTMLInputElement>e.target).value;

        search(searchValue);
    }, 150);

    const emits = defineEmits(['update:modelValue']);

    let searchString = ref<any>('');
    let searchResults = ref<any[]>([]);
    let selectedTags = ref<any[]>([]);
    let selectedValues = ref<any[]>([]);

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
        avatarField: {
            default: null,
            type: String,
        },
        avatarPosition: {
            default: 'left',
            type: String as PropType<PositionXEnum>,
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
        labelField: {
            required: true,
            type: [Function, String],
        },
        modelValue: {
            default: []
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
        sourceGet: {
            default: '',
            type: [Function, String],
        },
        sourceSearch: {
            required: true,
            type: [Function, String],
        },
        tooltip: {
            default: '',
            type: String,
        },
        tooltipPosition: {
            default: 'bottom',
            type: String as PropType<PositionEnum>,
        },
        valueField: {
            default: '',
            type: String,
        },
    });

    onMounted(() => {
        setup();
    });

    function deselectValue(key: number) {
        selectedValues.value.splice(key, 1);
        selectedTags.value.splice(key, 1);

        emits('update:modelValue', selectedValues.value);
    }

    function fetchObject(obj: any, prop: string): any {
        if (typeof obj === 'undefined') {
            return false;
        }

        let index = prop.indexOf('.');

        if (index > -1) {
            return fetchObject(
                obj[prop.substring(0, index)],
                prop.substring(index + 1)
            );
        }

        return obj[prop];
    }

    function search(searchValue: any) {
        if (searchValue !== '' && searchValue.length > 1) {
            if (props.sourceSearch !== '' && typeof props.sourceSearch === 'string') {
                fetch(props.sourceSearch + searchValue)
                    .then(response => response.json())
                    .then(data => {
                        searchResults.value = data;
                    })
                    .catch(error => {
                        console.error('[Cinderblock error]: There was an error retrieving tag control values.');
                    });
            } else if (props.sourceSearch !== '' && typeof props.sourceSearch === 'function')  {
                let data = props.sourceSearch(searchValue);

                if (Promise.resolve(data) == data) { // check if Promise
                    data.then((data: any) => {
                        searchResults.value = data;
                    })

                } else {
                    searchResults.value = data;
                }
            }
        } else {
            searchResults.value = [];
        }
    }

    function selectValue(value: any) {
        searchResults.value = [];

        searchString.value = '';
        selectedValues.value = selectedValues.value.concat([fetchObject(value, props.valueField) || value]);
        selectedTags.value = selectedTags.value.concat([
            typeof props.labelField === 'function'
                ? props.labelField(value)
                : fetchObject(value, props.labelField)
        ]);

        emits('update:modelValue', selectedValues.value);
    }

    function setup() {
        selectedValues.value = props.modelValue;

        if (props.labelField !== props.valueField) {
            selectedValues.value.forEach((value: string) => {
                if (props.sourceGet !== '' && typeof props.sourceGet === 'string') {
                    fetch(props.sourceGet + value)
                        .then(response => response.json())
                        .then(data => {
                            selectedTags.value = selectedTags.value.concat(
                                typeof props.labelField === 'function'
                                    ? props.labelField(data)
                                    : fetchObject(data, props.labelField)
                            );
                        })
                        .catch(error => {
                            console.error('[Cinderblock error]: There was an error retrieving tag control default value');
                        });
                } else if (props.sourceGet !== '' && typeof props.sourceGet === 'function') {
                    let data = props.sourceGet(value);

                    if (Promise.resolve(data) == data) { // check if Promise
                        data.then((data: any) => {
                            selectedTags.value = selectedTags.value.concat(
                                typeof props.labelField === 'function'
                                    ? props.labelField(data)
                                    : fetchObject(data, props.labelField)
                            );
                        })
                    } else if (data) {
                        selectedTags.value = selectedTags.value.concat(
                            typeof props.labelField === 'function'
                                ? props.labelField(data)
                                : fetchObject(data, props.labelField)
                        );
                    }
                } else {
                    selectedTags.value = selectedTags.value.concat(
                        typeof props.labelField === 'function'
                            ? props.labelField(props.modelValue)
                            : fetchObject(props.modelValue, props.labelField)
                    );
                }
            });
        } else {
            selectedTags.value = props.modelValue;
        }
    }

    watch(() => props.modelValue, () => {
        setup();
    });
</script>