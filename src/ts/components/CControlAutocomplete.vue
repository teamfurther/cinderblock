<template>
    <div class="c-control c-control-autocomplete">
        <label class="c-control__label block font-medium mb-1 text-slate-800 text-sm"
               v-bind:class="{ 'text-error': invalid, 'after:content-[\'*\'] after:text-red-400': required }"
               v-bind:for="name"
               v-if="label"
        >
            {{ label }}
        </label>

        <div class="c-control__group c-control-autocomplete__group border-b border-b-slate-300 flex items-center relative"
             v-bind:class="{ '!border-b-slate-100' : disabled, '!border-b-error' : invalid }"
        >
            <input class="c-control__field c-control-autocomplete__field bg-transparent block disabled:bg-white disabled:cursor-not-allowed disabled:text-slate-400 focus:outline-0 h-8 leading-none peer px-1 read-only:pointer-events-none text-slate-800 text-sm w-full" autocomplete="off" type="text"
                   v-bind:disabled="disabled"
                   v-bind:id="name"
                   v-bind:placeholder="placeholder"
                   v-bind:readonly="readonly"
                   v-model="searchString"
                   v-on:keyup="debouncedSearch"
            />
            <span class="absolute bg-highlight -bottom-px duration-500 h-px left-0 opacity-0 peer-focus:opacity-100 peer-focus:w-full transition-all w-0"></span>

            <img class="h-6 -mt-px rounded w-6"
                 v-bind:class="{
                        'mr-2 order-first' : avatarPosition === 'left',
                        'ml-2' : avatarPosition === 'right',
                 }"
                 v-bind:src="avatar"
                 v-if="avatarField && avatar"
            />

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
                   v-on:change="setup"
            />

            <c-tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</c-tooltip-icon>

            <ul class="c-control-autocomplete__list absolute bg-white border-slate-200 left-0 max-h-[210px] overflow-y-auto shadow-cinderblock top-full w-full z-30"
                v-if="searchResults.length"
            >
                <li v-for="searchResult in searchResults">
                    <a class="cursor-pointer flex h-8 hover:bg-slate-50 items-center px-2.5 py-1 w-full"
                       v-on:click="selectValue(searchResult)"
                    >
                        <span v-text="fetchObject(searchResult, labelField)"></span>

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

        <div class="c-control__notes c-control-autocomplete__notes text-slate-800 text-sm"
             v-bind:class="{ 'text-error': invalid }"
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

    let avatar = ref<string>('');
    let searchString = ref<string>('');
    let searchResults = ref<any[]>([]);
    let selectedValue = ref<any>(null);

    const props = defineProps({
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
        sourceGet: {
            required: true,
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

    function fetchObject(obj: any, prop: string): any {
        if (!obj || typeof obj === 'undefined') {
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
                        console.error('[Cinderblock error]: There was an error retrieving autocomplete control values.');
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

        avatar.value = props.avatarField ? fetchObject(value, props.avatarField) : '';
        searchString.value = fetchObject(value, props.labelField) || '';
        selectedValue.value = fetchObject(value, props.valueField) || value;

        emits('update:modelValue', selectedValue.value);
    }

    function setup() {
        selectedValue.value = props.modelValue;
        if (props.labelField !== props.valueField) {
            if (props.sourceGet !== '' && typeof props.sourceGet === 'string') {
                fetch(props.sourceGet + selectedValue.value)
                    .then(response => response.json())
                    .then(data => {
                        avatar.value = props.avatarField ? fetchObject(data, props.avatarField) : '';
                        searchString.value = fetchObject(data, props.labelField) || '';
                    })
                    .catch(error => {
                        console.error('[Cinderblock error]: There was an error retrieving autocomplete control default value.');
                    });
            } else if (props.sourceGet !== '' && typeof props.sourceGet === 'function')  {
                let data = props.sourceGet(selectedValue);

                if (Promise.resolve(data) == data) { // check if Promise
                    data.then((data: any) => {
                        avatar.value = props.avatarField ? fetchObject(data, props.avatarField) : '';
                        searchString.value = fetchObject(data, props.labelField) || '';
                    })
                } else if (data) {
                    avatar.value = props.avatarField ? fetchObject(data, props.avatarField) : '';
                    searchString.value = fetchObject(data, props.labelField) || '';
                } else {
                    searchString.value = '';
                }
            } else {
                searchString.value = fetchObject(props.modelValue, props.labelField) || '';
            }
        } else {
            searchString.value = selectedValue;
        }
    }

    watch(() => props.modelValue, () => {
        setup();
    });
</script>