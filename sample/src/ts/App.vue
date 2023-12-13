<template>
    <div class="container px-1 py-10">
        <!-- Alerts -->
        <h1 class="mb-10 text-3xl"><a class="cursor-pointer text-sky-400" id="alerts" href="#alerts">#</a> Alerts</h1>
        <c-alerts v-bind:alerts="alerts" v-if="alerts"></c-alerts>
        <div class="grid grid-flow-row md:grid-flow-col gap-4">
            <c-button class="bg-error text-white" v-on:click="addAlert('error', 'Error message.', 'This is an error message.')">
                Show error alert
            </c-button>
            <c-button class="bg-info text-white" v-on:click="addAlert('info', 'Info message.', 'This is an info message.')">
                Show info alert
            </c-button>
            <c-button class="bg-success text-white" v-on:click="addAlert('success', 'Success message.', 'This is a success message.')">
                Show success alert
            </c-button>
            <c-button class="bg-warning text-black" v-on:click="addAlert('warning', 'Warning message.', 'This is a warning message.')">
                Show warning alert
            </c-button>
        </div>

        <!-- Buttons -->
        <h1 class="my-10 text-3xl"><a class="cursor-pointer text-sky-400" id="buttons" href="#buttons">#</a> Buttons</h1>
        <div class="grid grid-flow-row md:grid-flow-col gap-4">
            <c-button>Default button</c-button>
            <c-button class="bg-red-400 text-white">Colored button</c-button>
            <c-button class="bg-sky-400 text-white" disabled>Disabled button</c-button>
            <c-button class="bg-sky-400 text-white" loading>Loading button</c-button>
            <c-button class="bg-emerald-400 text-white" submit>Submit button</c-button>
            <c-button class="bg-sky-400 text-white" href="https://gofurther.digital" target="_blank">Link button</c-button>
        </div>

        <!-- Controls -->
        <h1 class="my-10 text-3xl"><a class="cursor-pointer text-sky-400" id="controls" href="#controls">#</a> Controls</h1>
        <c-control-autocomplete
            class="mb-10"
            icon="search"
            label="Autocomplete"
            label-field="name"
            name="autocomplete"
            source-get="https://restcountries.com/v2/alpha/"
            source-search="https://restcountries.com/v2/name/"
            value-field="alpha3Code"
            v-model="autocompleteValue"
        >
            <template v-slot:notes>
                This is a help text.
            </template>
        </c-control-autocomplete>

        <c-control-checkbox
            class="mb-10"
            label="Checkbox"
            name="checkbox"
            v-bind:options="options"
            v-model="checkboxValues"
        />

        <c-control-date
            class="mb-10"
            icon="calendar"
            icon-position="right"
            label="Date"
            name="date"
            v-bind:month-change-on-scroll="false"
            v-model="dateValue"
        />

        <c-control-date
            class="mb-10"
            icon="calendar"
            icon-position="right"
            label="Date range"
            multi-calendars
            name="daterange"
            range
            v-bind:month-change-on-scroll="false"
            v-model="dateRangeValue"
        />

        <c-control-file
            class="mb-10"
            label="File"
            name="file"
            v-bind:filenames="['image.png']"
            v-model="fileValue"
        />

        <c-control-number
            class="mb-10"
            label="Number"
            name="number"
            v-model="numberValue"
        />

        <c-control-radio
            class="mb-10"
            label="Radio"
            name="radio"
            v-bind:options="options"
            v-model="radioValue"
        />

        <c-control-select
            class="mb-10"
            label="Select"
            name="select"
            v-bind:options="options"
            v-model="selectValue"
        />

        <c-control-tag
            class="mb-10"
            icon="tag"
            label="Tag"
            label-field="name"
            name="tag"
            source-get="https://restcountries.com/v2/alpha/"
            source-search="https://restcountries.com/v2/name/"
            tooltip="I am a tooltip"
            tooltip-position="left"
            value-field="alpha3Code"
            v-model="tagValues"
        />

        <c-control-toggle
            class="mb-10"
            label="Toggle"
            name="toggle"
            v-model="toggleValue"
        />

        <c-control-text
            label="Text"
            name="text"
            v-model="textValue"
        />

        <!-- Data Tables -->
        <h1 class="my-10 text-3xl"><a class="cursor-pointer text-sky-400" id="datatable" href="#datatable">#</a> Data Tables</h1>
        <c-data-table v-bind:data="tabledata" v-on:sortTable="sortTable" responsive-breakpoint="lg">
            <template v-slot:item.actions="{ item }">
                <a class="text-sky-500" href="#" v-html="'edit #' + item.values.id"></a>
            </template>
        </c-data-table>

        <!-- Modals -->
        <h1 class="my-10 text-3xl"><a class="cursor-pointer text-sky-400" id="modal" href="#modal">#</a> Modals</h1>
        <c-modal title="The Modal" v-bind:open="modalOpen" v-on:closeModal="modalOpen = false">
            <template v-slot:body>
                This is some modal! 😍
            </template>
            <template class="text-right" v-slot:footer>
                <div class="flex justify-end w-full">
                    <c-button class="bg-slate-100 mr-2 text-slate-800" v-on:click="modalOpen = false">
                        Close me
                    </c-button>
                    <c-button class="bg-sky-400 text-white" v-on:click="modalOpen = false">
                        Same, but blue
                    </c-button>
                </div>
            </template>
        </c-modal>
        <c-button class="bg-sky-400 text-white" v-on:click="modalOpen = !modalOpen">
            Show modal
        </c-button>

        <!-- Navigation -->
        <h1 class="my-10 text-3xl"><a class="cursor-pointer text-sky-400" id="navigation" href="#navigation">#</a> Navigation</h1>

        <c-navigation>
            <c-navigation-item href="/link-1" active>Link 1</c-navigation-item>
            <c-navigation-item href="/link-2">Link 2</c-navigation-item>
            <c-navigation-item href="/link-3">Link 3</c-navigation-item>
            <c-navigation-item has-dropdown>
                Dropdown
                <template v-slot:dropdown>
                    <c-navigation-item href="/dropdown-link-1">Dropdown link 1</c-navigation-item>
                    <c-navigation-item href="/dropdown-link-2">Dropdown link 2</c-navigation-item>
                    <c-navigation-item href="/dropdown-link-3">Dropdown link 3</c-navigation-item>
                </template>
            </c-navigation-item>
            <c-navigation-item href="/link-4">Link 4</c-navigation-item>
        </c-navigation>

        <!-- Pagination -->
        <h1 class="my-10 text-3xl"><a class="cursor-pointer text-sky-400" id="pagination" href="#pagination">#</a> Pagination</h1>
        <c-pagination v-bind:current-page="currentPage" v-bind:pages="10" v-on:updatePage="updatePage"></c-pagination>
        <span class="block font-bold mt-5 text-center text-sm">Current page: {{ currentPage }}</span>

        <!-- Panel -->
        <h1 class="my-10 text-3xl"><a class="cursor-pointer text-sky-400" id="panel" href="#panel">#</a> Panel</h1>
        <c-panel title="My panel">
            <template v-slot:body>
                This is a panel
            </template>
        </c-panel>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import '@vuepic/vue-datepicker/dist/main.css';

    import {
        CAlerts,
        CButton,
        CControlAutocomplete,
        CControlCheckbox,
        CControlDate,
        CControlFile,
        CControlNumber,
        CControlRadio,
        CControlSelect,
        CControlTag,
        CControlText,
        CControlToggle,
        CDataTable,
        CModal,
        CNavigation,
        CNavigationItem,
        CPagination,
        CPanel,
    } from '../../../dist/cinderblock';
    import { AlertType } from '../../../src/ts/types/AlertType';

    let alerts = ref<AlertType[]>([]);
    let autocompleteValue = ref<String>('hun');
    let checkboxValues = ref<any[]>([1, 3]);
    let currentPage = ref<number>(1);
    let dateValue = ref(new Date());
    let dateRangeValue = ref([new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]);
    let fileValue = ref<string[]>(['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=']);
    let modalOpen = ref<boolean>(false);
    let numberValue = ref<number>(3);
    let radioValue = ref<any>(3);
    let selectValue = ref<any>(3);
    let tabledata = ref<object>({
        columnAligns: { age: 'center' }, // left, right, center
        columnNames: { id: 'Id', name: 'Name', age: 'Age', country: 'Country', actions: 'Actions' },
        items: [
            {
                values: { id: 1, name: "Maria", age: 30, country: 'Germany' },
                children: {
                    columnNames: { name: 'Child name', age: 'Age' },
                    hideHeader: true,
                    items: [
                        {
                            values: { name: 'Ben', age: 5 }
                        },
                        {
                            values: { name: 'Bill', age: 7 }
                        }
                    ]
                }
            },
            {
                values: { id: 2, name: "John", age: 32, country: 'UK', actions: 'aaa' },
            },
            {
                values: { id: 3, name: "Roland", age: 22, country: 'Hungary' },
            },
            {
                values: { id: 4, name: "Chris", age: 24, country: 'UK' },
            },
            {
                values: { id: 5, name: "Helen", age: 41, country: 'UK' },
            }
        ],
        sortableColumns: ['id', 'name', 'age', 'country']
    });
    let tagValues = ref<String[]>(['hun', 'rou']);
    let textValue = ref<string>('I am a string');
    let toggleValue = ref<boolean>(false);

    const options = [
        {
            label: 'Option 1',
            value: 1
        },
        {
            disabled: true,
            label: 'Option 2',
            value: 2
        },
        {
            label: 'Option 3',
            value: 3
        },
        {
            label: 'Option 4',
            value: 4
        }
    ];

    function addAlert(type: string, title: string, message: string) {
        alerts.value.push({
            message: message,
            title: title,
            type: type
        });
    }

    function sortTable(sortBy: string) {
        let items = tabledata.value.items;
        items.sort((a, b) => {
            switch (sortBy) {
                case '+id': {
                    return a.values.id - b.values.id;
                }
                case '-id': {
                    return b.values.id - a.values.id;
                }
                case '+name': {
                    return a.values.name.localeCompare(b.values.name);
                }
                case '-name': {
                    return b.values.name.localeCompare(a.values.name);
                }
                case '+age': {
                    return a.values.age - b.values.age;
                }
                case '-age': {
                    return b.values.age - a.values.age;
                }
                case '+country': {
                    return a.values.country.localeCompare(b.values.country);
                }
                case '-country': {
                    return b.values.country.localeCompare(a.values.country);
                }
            }
        });

        tabledata.value.items = items;
    }

    function updatePage(page: number) {
        currentPage.value = page;
    }
</script>
