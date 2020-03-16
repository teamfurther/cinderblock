<template>
    <div class="control__group" v-bind:class="{ 'is-invalid': isInvalid }">
        <label class="control__label"
               v-bind:class="{ 'is-required': isRequired }"
               v-bind:for="name"
               v-if="label"
        >
            {{ label }}
        </label>

        <!-- Autocomplete -->
        <div class="control__field__group"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="type === 'autocomplete'"
        >
            <icon class="is-light is-small" v-bind:icon="icon" v-if="icon" />
            <input class="control__field" type="text"
                   v-bind:disabled="isDisabled"
                   v-bind:id="name"
                   v-bind:placeholder="placeholder"
                   v-bind:readonly="isReadonly"
                   v-model="searchString"
                   v-on:keyup="debouncedSearch"
            />
            <span class="control__field__highlight"></span>

            <input type="hidden"
                   v-bind:name="name"
                   v-bind:value="selectedValue"
            />

            <tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</tooltip-icon>

            <ul class="control__autocomplete-list"
                v-if="searchResults.length"
            >
                <li v-for="searchResult in searchResults">
                    <a v-on:click="selectValue(searchResult)">{{ searchResult[labelField] }}</a>
                </li>
            </ul>
        </div>

        <!-- Checkbox-->
        <div class="control__checkbox__group"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="type === 'checkbox'"
        >
            <label v-for="option in options">
                <input class="control__checkbox" type="checkbox"
                       v-bind:checked="selectedValues.indexOf(option.value) !== -1"
                       v-bind:disabled="isDisabled"
                       v-bind:name="name"
                       v-bind:readonly="isReadonly"
                       v-bind:value="option.value"
                       v-on:change="updateSelectedValues(option.value)"
                />
                <span class="control__checkbox__mask"></span>
                {{ option.label }}
            </label>
            <tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</tooltip-icon>
        </div>

        <!-- Date -->
        <div class="control__field__group is-date"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="type === 'date'"
        >
            <icon class="is-light is-small" icon="calendar" />
            <input class="control__field"
                   v-bind:disabled="isDisabled"
                   v-bind:id="name"
                   v-bind:name="name"
                   v-bind:placeholder="placeholder"
                   v-bind:readonly="isReadonly"
                   v-bind:type="type"
                   v-bind:value="value"
                   v-on:input="emitValue"
            />
            <span class="control__field__highlight"></span>

            <tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</tooltip-icon>
        </div>

        <!-- Email, number, password, text, url -->
        <div class="control__field__group"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="['email', 'number', 'password', 'text', 'url'].indexOf(type) !== -1"
        >
            <icon class="is-light is-small" v-bind:icon="icon" v-if="icon" />
            <input class="control__field"
                   v-bind:disabled="isDisabled"
                   v-bind:id="name"
                   v-bind:max="max"
                   v-bind:min="min"
                   v-bind:name="name"
                   v-bind:placeholder="placeholder"
                   v-bind:readonly="isReadonly"
                   v-bind:step="step"
                   v-bind:type="type"
                   v-bind:value="value"
                   v-on:input="emitValue"
            />
            <span class="control__field__highlight"></span>

            <tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</tooltip-icon>
        </div>

        <!-- File -->
        <div class="control__field__group"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="type === 'file'"
        >
            <icon class="is-light is-small" v-bind:icon="icon" v-if="icon" />
            <input class="control__field is-file" type="file"
                   v-bind:disabled="isDisabled"
                   v-bind:id="name"
                   v-bind:readonly="isReadonly"
                   v-on:change="setFile"
            >
            <span class="control__field__browse" v-if="!tooltip"></span>

            <input type="hidden"
                   v-bind:name="name"
                   v-bind:value="value"
            />

            <tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</tooltip-icon>
        </div>
        <div class="control__file"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="selectedFilename"
        >
            <a v-on:click="removeFile">{{ selectedFilename }}<span>&times;</span></a>
        </div>

        <!-- Radio -->
        <div class="control__radio__group"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="type === 'radio'"
        >
            <label v-for="option in options">
                <input class="control__radio" type="radio"
                       v-bind:checked="selectedValue === option.value"
                       v-bind:disabled="isDisabled"
                       v-bind:name="name"
                       v-bind:readonly="isReadonly"
                       v-bind:value="option.value"
                       v-on:change="updateSelectedValue(option.value)"
                />
                <span class="control__radio__mask"></span>
                {{ option.label }}
            </label>
            <tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</tooltip-icon>
        </div>

        <!-- Select -->
        <div class="control__select__group"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="type === 'select'"
        >
            <icon class="is-light is-small" v-bind:icon="icon" v-if="icon" />
            <select class="control__select"
                    v-bind:disabled="isDisabled"
                    v-bind:id="name"
                    v-bind:name="name"
                    v-bind:readonly="isReadonly"
                    v-bind:value="value"
                    v-on:input="emitValue"
            >
                <option v-bind:value="option.value" v-for="option in options">
                    {{ option.label }}
                </option>
            </select>
            <tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</tooltip-icon>
        </div>

        <!-- Tag -->
        <div class="control__field__group"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="type === 'tag'"
        >
            <icon class="is-light is-small" v-bind:icon="icon" v-if="icon" />
            <input class="control__field" type="text"
                   v-bind:disabled="isDisabled"
                   v-bind:id="name"
                   v-bind:placeholder="placeholder"
                   v-bind:readonly="isReadonly"
                   v-model="searchString"
                   v-on:keyup="debouncedSearch"
            />
            <span class="control__field__highlight"></span>

            <input type="hidden"
                   v-bind:name="name"
                   v-bind:value="selectedValue"
            />

            <tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</tooltip-icon>

            <ul class="control__autocomplete-list"
                v-if="searchResults.length"
            >
                <li v-for="searchResult in searchResults">
                    <a v-on:click="selectValue(searchResult)">{{ searchResult[labelField] }}</a>
                </li>
            </ul>
        </div>
        <ul class="control__tags"
            v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
            v-if="selectedTags.length > 0"
        >
            <li v-for="(tag, key) in selectedTags">
                <a v-on:click="deselectValue(key)">
                    {{ tag }}<span>&times;</span>
                </a>
            </li>
        </ul>

        <!-- Textarea -->
        <div class="control__field__group"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="type === 'textarea'"
        >
            <textarea class="control__field is-textarea"
                      v-bind:disabled="isDisabled"
                      v-bind:id="name"
                      v-bind:name="name"
                      v-bind:placeholder="placeholder"
                      v-bind:readonly="isReadonly"
                      v-bind:value="value"
                      v-on:input="emitValue"
            ></textarea>
            <span class="control__field__highlight"></span>

            <tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</tooltip-icon>
        </div>

        <!-- Toggle -->
        <div class="control__toggle__group"
             v-bind:class="{ 'is-disabled': isDisabled, 'is-readonly': isReadonly }"
             v-if="type === 'toggle'"
        >
            <label v-if="options">{{ options[0] }}</label>
            <div class="control__toggle__wrapper">
                <input class="control__toggle" type="checkbox"
                       v-bind:checked="selectedValue"
                       v-bind:disabled="isDisabled"
                       v-bind:id="name"
                       v-bind:name="name"
                       v-bind:readonly="isReadonly"
                       v-on:change="updateSelectedValue(!selectedValue)"
                />
                <span class="control__toggle__mask"></span>
            </div>
            <label v-if="options">{{ options[1] }}</label>

            <tooltip-icon v-bind:position="tooltipPosition" v-if="tooltip">{{ tooltip }}</tooltip-icon>
        </div>

        <div class="control__notes" v-if="$slots.notes">
            <slot name="notes"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import Icon from './Icon';
    import TooltipIcon from './TooltipIcon';

    const debounce = require('debounce');
    import flatpickr from 'flatpickr';

    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    @Component({
        components: {
            Icon,
            TooltipIcon
        }
    })
    export default class Control extends Vue {
        // Data
        private searchString: string = '';
        private searchResults: any[] = [];
        private selectedTags: any[] = [];
        private selectedValue: any = null;
        private selectedValues: any[] = [];
        private selectedFilename: string = '';

        // Lifecycle hooks
        mounted() {
            // validate props based on type
            this.validateProps();

            // set up component
            this.setup();
        }

        // Methods
        private debouncedSearch = debounce((e: InputEvent) => {
            const searchValue: string = (<HTMLInputElement>e.target).value;

            this.search(searchValue);
        }, 150);

        private deselectValue(key: number) {
            this.selectedValues.splice(key, 1);
            this.selectedTags.splice(key, 1);

            this.$emit('input', this.selectedValues);
        }

        private emitValue(e: InputEvent) {
            this.$emit('input', (<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>e.target).value);
        }

        private removeFile() {
            this.selectedFilename = '';
            this.selectedValue = null;

            this.$emit('input', null);
        }

        private search(searchValue: any) {
            if (searchValue !== '' && searchValue.length > 1) {
                fetch(this.sourceSearch + searchValue)
                    .then(response => response.json())
                    .then(data => {
                        this.searchResults = data;
                    })
                    .catch(error => {
                        console.error('[Cinderblock error]: There was an error retrieving autocomplete control values');
                    });
            } else {
                this.searchResults = [];
            }
        }

        private selectValue(value: any) {
            this.searchResults = [];

            switch (this.type) {
                case 'autocomplete':
                    this.searchString = value[this.labelField];
                    this.selectedValue = value[this.valueField];

                    this.$emit('input', this.selectedValue);

                    break;
                case 'tag':
                    this.searchString = '';
                    this.selectedValues.push(value[this.valueField]);
                    this.selectedTags.push(value[this.labelField]);

                    this.$emit('input', this.selectedValues);
            }
        }

        private setFile(e: InputEvent) {
            const input: HTMLInputElement = (<HTMLInputElement>e.target);
            const files: FileList | null = input.files;

            if (FileReader && files && files.length) {
                const reader: FileReader = new FileReader();

                reader.onload = () => {
                    const result: any = reader.result;
                    const filename: any = input.value.split('\\').pop();

                    this.selectedFilename = filename;
                    this.selectedValue = result;

                    this.$emit('input', this.selectedValue);
                };
                reader.readAsDataURL(files[0]);
            }
        }

        private setup() {
            switch (this.type) {
                case 'autocomplete':
                    this.selectedValue = this.value;

                    if (this.labelField !== this.valueField) {
                        fetch(this.sourceGet + this.selectedValue)
                            .then(response => response.json())
                            .then(data => {
                                this.searchString = data[this.labelField];
                            })
                            .catch(error => {
                                console.error('[Cinderblock error]: There was an error retrieving autocomplete control default value');
                            });
                    } else {
                        this.searchString = this.selectedValue;
                    }

                    break;
                case 'checkbox':
                case 'select':
                    this.selectedValues = this.value;

                    break;
                case 'date':
                    flatpickr('.control__field__group.is-date .control__field', this.dateConfig);

                    break;
                case 'file':
                    this.selectedFilename = this.filename;
                    this.selectedValue = this.value;

                    break;
                case 'radio':
                case 'toggle':
                    this.selectedValue = this.value;

                    break;
                case 'tag':
                    this.selectedValues = this.value;

                    if (this.labelField !== this.valueField) {
                        this.selectedValues.forEach((value) => {
                            fetch(this.sourceGet + value)
                                .then(response => response.json())
                                .then(data => {
                                    this.selectedTags.push(data[this.labelField]);
                                })
                                .catch(error => {
                                    console.error('[Cinderblock error]: There was an error retrieving autocomplete control default value');
                                });
                        });
                    } else {
                        this.selectedTags = this.value;
                    }

                    break;
            }
        }

        private updateSelectedValue(value: any) {
            this.selectedValue = value;

            this.$emit('input', this.selectedValue);
        }

        private updateSelectedValues(value: any) {
            if (this.selectedValues.indexOf(value) !== -1) {
                this.selectedValues.splice(this.selectedValues.indexOf(value), 1);
            } else {
                this.selectedValues.push(value);
            }

            this.$emit('input', this.selectedValues);
        }

        private validateProps() {
            switch (this.type) {
                case 'autocomplete':
                case 'tag':
                    if (this.labelField === '') {
                        console.error('[Cinderblock warn]: Missing required prop for autocomplete control: "labelField"');
                    }

                    if (this.sourceGet === '') {
                        console.error('[Cinderblock warn]: Missing required prop for autocomplete control: "sourceGet"');
                    }

                    if (this.sourceSearch === '') {
                        console.error('[Cinderblock warn]: Missing required prop for autocomplete control: "sourceSearch"');
                    }

                    if (this.valueField === '') {
                        console.error('[Cinderblock warn]: Missing required prop for autocomplete control: "valueField"');
                    }

                    break;
                case 'checkbox':
                case 'radio':
                case 'select':
                    if (this.options.length === 0) {
                        console.error('[Cinderblock warn]: Missing required prop for ' + this.type + ' control: "options"');
                    }

                    break;
                case 'toggle':
                    if (this.options && this.options.length !== 2) {
                        console.error('[Cinderblock warn]: Prop "options" for toggle control must be null, or have exactly two values');
                    }

                    break
            }
        }

        // Props
        @Prop({
            default: function () {
                return {}
            },
            type: Object
        }) dateConfig!: Object;

        @Prop({
            default: '',
            type: String
        }) filename!: string;

        @Prop({
            default: '',
            type: String
        }) icon!: string;

        @Prop({
            default: false,
            type: Boolean
        }) isDisabled!: boolean;

        @Prop({
            default: false,
            type: Boolean
        }) isReadonly!: boolean;

        @Prop({
            default: false,
            type: Boolean
        }) isInvalid!: boolean;

        @Prop({
            default: false,
            type: Boolean
        }) isRequired!: boolean;

        @Prop({
            default: '',
            type: String
        }) label!: string;

        @Prop({
            default: '',
            type: String
        }) labelField!: string;

        @Prop({
            default: null,
            type: Number
        }) max!: number;

        @Prop({
            default: null,
            type: Number
        }) min!: number;

        @Prop({
            required: true,
            type: String
        }) name!: string;

        @Prop({
            default: function () {
                return []
            },
            type: Array
        }) options!: Object[];

        @Prop({
            default: null,
            type: String
        }) placeholder!: string;

        @Prop({
            default: 1,
            type: Number
        }) step!: number;

        @Prop({
            default: '',
            type: String
        }) sourceGet!: string;

        @Prop({
            default: '',
            type: String
        }) sourceSearch!: string;

        @Prop({
            default: '',
            type: String
        }) tooltip!: string;

        @Prop({
            default: 'bottom',
            type: String,
            validator: function (value: string) {
                return [
                    'bottom',
                    'left',
                    'right',
                    'top'
                ].indexOf(value) !== -1
            }
        }) tooltipPosition!: string;

        @Prop({
            required: true,
            type: String,
            validator: function (value: string) {
                return [
                    'autocomplete',
                    'checkbox',
                    'date',
                    'email',
                    'file',
                    'number',
                    'password',
                    'radio',
                    'select',
                    'tag',
                    'text',
                    'textarea',
                    'toggle',
                    'url'
                ].indexOf(value) !== -1
            }
        }) type!: string;

        @Prop({
            default: null
        }) value!: any;

        @Prop({
            default: '',
            type: String
        }) valueField!: string;

        // Watchers
        @Watch('filename')
        filenameChanged() {
            this.selectedFilename = this.filename;
        }

    };
</script>

<style lang="scss">
    @import '../../scss/components/Control';
</style>