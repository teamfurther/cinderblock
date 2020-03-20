## Installation
You can install the package via npm:  
```npm install @teamfurther/cinderblock --save```  
or  
```yarn add @teamfurther/cinderblock```

**Component registration**
Import component:  
```import { ComponentName } from '@teamfurther/cinderblock';```

Next you must register your component:  
```
…
components: {
    …
    ComponentName
    …
},
…
```

## Components

### Alert

**Usage**  

```
<alerts v-bind:alerts="alerts" v-if="alerts"></alerts>

<button v-on:click="addAlert">Add alert</button>
```

```
…
data: {
    …
    alerts: [
        {
            message: 'This is an error message.',
            title: 'Error message', // title is optional
            type: 'error' // error, info, success or warning
        },
        {
            message: 'This is a success message.',
            title: 'Success message',
            type: 'success'
        },
        {
            message: 'This is a warning message.',
            title: 'Warning message',
            type: 'warning'
        }
    ]
    …
},
methods: {
    …
    addAlert: function () {
        this.alerts.push({
            message: 'Nulla porttitor accumsan tincidunt. Nulla quis lorem ut libero malesuada feugiat.',
            title: 'Info message',
            type: 'info'
        });
    }
    …
}
…
```

**Events**  

```alert-closed```
```close-alert```

**Props**  

```alerts``` 

---

### Brand

**Usage**  

```
<brand href="/home">
    <img src="/logo.svg" alt="My brand logo">
</brand> 
```

**Slots**  
  
```default```  

---

### Btn

**Usage**  
 
```
<btn class="is-block" href="/home" type="success" v-bind:is-loading="isLoading">This is a button</btn>
<btn is-submit v-bind:is-disabled="isDisabled" v-on:click="doSomething">This is a disabled submit button</btn>
```

**Class modifiers**  

```.is-block``` - Displays a block-level button. Same as using ```is-block``` prop.  
  
**Props**  

```href```
```is-disabled```  
```is-loading```  
```is-submit``` - Invalid together with ```href```  
```type``` - cancel|default|error|success|warning

**Slots**  
  
```default```  

### Control

#### General usage and options

**Usage**  

```
<control 
         icon="search"
         label="This is my label"
         name="myControl"
         placeholder="Start typing"
         tooltip="This is a tooltip right here"
         tooltip-position="top"
         type="controlType"
         v-bind:is-disabled="false"
         v-bind:is-invalid="false"
         v-bind:is-required="true"
         v-model="value"
>
    <template v-slot:notes>
        This is a note to the field.<br />It also accepts <strong>HTML</strong>.
    </template>
</control>
```

**Props**  

```icon``` - The icon to be displayed before control. Works with ```autocomplete```, ```email```, ```file```, ```number```, ```password```, ```select```, ```tag```, ```text``` and ```url```.  
```is-disabled``` - Disables control.  
```is-invalid``` - Sets is-invalid class on control. Can be used when validation errors occur.  
```is-readonly``` - Make control read-only.  
```label``` - The label displayed before the field.  
```name``` - The name of the input.  
```placeholder``` - The input placeholder.  
```tooltip``` - Display a tooltip icon. When hovered, the text provided appears as a tooltip.  
```tooltip-position``` - Where to display tooltip relative to tooltip icon. Can take values ```bottom```, ```left```, ```right``` or ```top```.  
```type``` - One of ```autocomplete```, ```checkbox```, ```date```, ```email```, ```file```, ```number```, ```password```, ```radio```, ```select```, ```tag```, ```text```, ```textarea```, ```toggle```, ```url```.

#### Autocomplete

**Usage**  

```
<control 
         label-field="name"
         name="myAutocompleteControl"
         source-get="https://restcountries.eu/rest/v2/alpha/"
         source-search="https://restcountries.eu/rest/v2/name/"
         type="autocomplete"
         value-field="alpha3Code"
         v-model="controlValue"
></control>
```

**Default value format**

```
…
controlValue: 'DEU', // format is given by the format of value-field
…
```

**Props**

```label-field``` - The field from the response JSON or values object that is used as a label for the value.  
```source-get``` - The API endpoint used to query the model for the default value.    
```source-search``` - The API endpoint used to query response JSON for the search string. Search string will be appended to the end of the url.  
```value-field``` - The field from the response JSON or values object that is used a value.  

#### Checkbox

**Usage**  

```
<control 
         name="myCheckboxControl"
         type="checkbox"
         v-bind:options="options"
         v-model="controlValue"
></control>
```

**Default options format**

```
…
options: [
    {
        label: 'Option 1',
        value: 1
    },
    {
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
],
…
```

**Default value format**

```
…
controlValue: [2, 3],
…
```

#### Date

**Usage**  

```
<control 
         name="myDateControl"
         type="date"
         v-bind:date-config="dateConfig"
         v-model="controlValue"
></control>
```

**Date config**  
Please refer to: [https://flatpickr.js.org/options/](https://flatpickr.js.org/options/).

E.g.:
```
…
dateConfig: {
    mode: 'range',
    showMonths: 2
},
…
```


**Default value format**  

```
…
controlValue: '2020-06-14', // format is give by the Flatpickr date format
…
```

#### Email

**Usage**  

```
<control 
         name="myEmailControl"
         type="number"
         v-model="controlValue"
></control>
```

**Default value format**

```
…
controlValue: 'hello@gofurther.digital',
…
```

#### File

**Usage**  

```
<control 
         filename="myCurrentFile.pdf"
         name="myFileControl"
         type="file"
         v-model="controlValue"
></control>
```

**Default value format**

```
…
controlValue: false, // false signals that the file has not changed; null signals that the file has been removed; a base64 encoded file signals that a new file has been uploaded
…
```

**Props**

```filename``` - The filename for the current file. Will be displayed below input.  

#### Number

**Usage**  

```
<control 
         name="myNumberControl"
         type="number"
         v-bind:max="100"
         v-bind:min="1"
         v-bind:step="1"
         v-model="controlValue"
></control>
```

**Default value format**

```
…
controlValue: 33,
…
```

**Props**

```max```  
```min```  
```step``` - Defaults to 1.  

#### Password

**Usage**  

```
<control 
         name="myPasswordControl"
         type="password"
         v-model="controlValue"
></control>
```

**Default value format**

```
…
controlValue: 'myVery$ecre+Pa55w0rd',
…
```

#### Radio

**Usage**  

```
<control 
         name="myRadioControl"
         type="radio"
         v-bind:options="options"
         v-model="controlValue"
></control>
```

**Default options format**

```
…
options: [
    {
        label: 'Option 1',
        value: 1
    },
    {
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
],
…
```

**Default value format**

```
…
controlValue: 2,
…
```

#### Select

**Usage**  

```
<control 
         name="mySelectControl"
         type="select"
         v-bind:options="options"
         v-model="controlValue"
></control>
```

**Default options format**

```
…
options: [
    {
        label: 'Option 1',
        value: 1
    },
    {
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
],
…
```

**Default value format**

```
…
controlValue: 2,
…
```

#### Tag

**Usage**  

```
<control 
         label-field="name"
         name="myTagControl"
         source-get="https://restcountries.eu/rest/v2/alpha/"
         source-search="https://restcountries.eu/rest/v2/name/"
         type="tag"
         value-field="alpha3Code"
         v-model="controlValue"
></control>
```

**Default value format**

```
…
controlValue: ['DEU', 'GRC'], // format is given by the format of value-field
…
```

**Props**

```label-field``` - The field from the response JSON or values object that is used as a label for the value.  
```source-get``` - The API endpoint used to query the model for the default value.    
```source-search``` - The API endpoint used to query response JSON for the search string. Search string will be appended to the end of the url.  
```value-field``` - The field from the response JSON or values object that is used a value.  

#### Text

**Usage**  

```
<control 
         name="myTextControl"
         type="text"
         v-model="controlValue"
></control>
```

**Default value format**

```
…
controlValue: 'This is a string',
…
```

#### Textarea

**Usage**  

```
<control 
         name="myTextareaControl"
         type="textarea"
         v-model="controlValue"
></control>
```

**Default value format**

```
…
controlValue: 'This is a very long string.',
…
```

#### Toggle

**Usage**  

```
<control 
         name="myToggleControl"
         type="toggle"
         v-bind:options="options"
         v-model="controlValue"
></control>
```

**Default options format**

```
…
options: ['OK', 'Not OK'], // must be null, or contain exactly two values 
…
```

**Default value format**

```
…
controlValue: true,
…
```

#### Url

**Usage**  

```
<control 
         name="myUrlControl"
         type="url"
         v-model="controlValue"
></control>
```

**Default value format**

```
…
controlValue: 'https://gofurther.digital',
…
```

---

### DataTable

**Usage**  
  
```
<data-table v-bind:data="tableData" 
            v-on:sort="sortDataTable"
></control>
```

```
…
data: {
    …    
    tableData: {
        columnAligns: { age: 'center' }, // left, right, center
        columnNames: { id: 'Id', name: 'Name', age: 'Age', country: 'Country' },
        hideHeader: true, // default value false
        items: [
            {
                values: { id: 1, name: "Maria", age: "20", country: 'Germany' },
                actions: [{
                    class: 'is-blue', // is-red, is-green 
                    icon: 'search',
                    title: 'Details',
                    url: '/details/1' 
                    // OR
                    // method: 'dataTableAction'
                }],
                childData: {
                    columnNames: { name: 'Child name', age: 'Age' },
                    items: [
                        {
                            values: { name: 'Ben', age: '5' }
                        },
                        {
                            values: { name: 'Bill', age: 'Age' }
                        }
                    ]      
                }
            },
            {
                values: { id: 2, name: "John", age: "20", country: 'UK' },
                actions: [{
                    title: 'Details',
                    method: 'dataTableAction' // dataTableAction: function (item) {}                        
                }]
            },
            {
                values: { id: 3, name: "Roland", age: "20", country: 'Hungary' },
                actions: [{
                    control: {
                        "icon": "search",
                        "label": "This is my label",
                        "name": "myControl", // !!! name must be unique !!!
                        "placeholder": "Start typing",
                        "tooltip": "This is a tooltip right here",
                        "tooltipPosition": "top",
                        "type": "controlType",
                        "isDisabled": false,
                        "isInvalid": false,
                        "isRequired": true,
                        "method": "dataTableControlAction", // dataTableControlAction: function (value, item) {}   
                    }                        
                }]
            },
            {
                values: { id: 4, name: "Chris", age: "20", country: 'UK' },
                actions: [{
                    title: 'Details',
                    url: '/details/4'                        
                }]
            },
            {
                values: { id: 5, name: "Helen", age: "20", country: 'UK' },
                actions: [{
                    title: 'Details',
                    url: '/details/5'                        
                }]
            }                
        ],
        showActions: true, // default value is false (show actions only on hover)
        sortableColumns: ['id', 'name', 'age', 'country']            
    }
    …
}
…
```

**Props**  

```data```

---

### Foot

**Usage**  

```
<foot>
    Cinderblock<br />
    &copy; Further Digital Solutions 2020
</foot>
```

**Slots**  
  
```default```  

---

### Icon

**Usage**

Icons courtesy of [https://feathericons.com](https://feathericons.com).
  
**Usage**  

```
<icon icon="search" class="is-light-gray has-blue-hover"></icon>
```

**Class modifiers**  
  
```is-blue```, ```is-green```, ```is-light```, ```is-lighter```, ```is-red``` - Color modifiers  
```has-blue-hover```, ```has-green-hover```, ```has-light-hover```, ```has-lighter-hover```, ```has-red-hover``` - Hover modifiers    
```is-smaller```, ```is-small```, ```is-large```, ```is-larger``` - Size modifiers  

---

### Modal

**Usage**  

```
<modal class="is-narrow" title="My modal"
       v-bind:is-open="showModal"
       v-bind:slot-props="objectUsedInSlots"
       v-on:close-modal="showModal = false"
>
    <template v-slot:body>
        First modal<br />
        {{ objectUsedInSlots }}
    </template>
</modal>

<a v-on:click="showModal = true">Show modal</a>
```

!!! Always put the modal tag outside panel tags

**Class modifiers**  

```.is-narrow``` - Displays a narrower modal.  
```.is-wide``` - Displays a wider modal.  

**Events**  

```close-modal```
  
**Props**  

```is-close-disabled``` - If true, modal cannot be closed.
```is-open```
```slot-props``` 
```title``` - This prop only works when ```header``` slot is not provided. 

**Slots**  

```header``` - Overrides the default modal header.  
```body```  
```footer```  

---

### Navbar

**Usage**  


```
<navbar class="is-fixed">
  <brand href="/home">
      <img src="/logo.svg" alt="My brand logo">
  </brand> 
  <navigation>
      <navigation-item href="/link-1" is-active is-tab>Link 1</navigation-item>
      <navigation-item href="/link-2" is-tab>Link 2</navigation-item>
      <navigation-item href="/link-3" is-tab>Link 3</navigation-item>
  </navigation>  
</navbar>
```

**Class modifiers**  

```.is-fixed``` - You can fix the navbar to the top of the page.  

**Slots**  
  
```default```

---

### Navigation

**Usage**  

```
<navigation has-burger>
    <navigation-item href="/link-1" is-active is-tab>Link 1</navigation-item>
    <navigation-item href="/link-2" is-tab>Link 2</navigation-item>
    <navigation-item href="/link-3" is-tab>Link 3</navigation-item>
    <navigation-item has-dropdown>
        Dropdown
        <template v-slot:dropdown>
            <navigation-item href="/dropdown-link-1">Dropdown link 1</navigation-item>
            <navigation-item href="/dropdown-link-2">Dropdown link 2</navigation-item>
            <navigation-item href="/dropdown-link-3">Dropdown link 3</navigation-item>
        </template>                    
    </navigation-item>
    <navigation-item href="/link-4" is-tab>Link 4</navigation-item>
</navigation>
```

**Props**  

```has-burger``` - If you set this prop a hamburger menu appears on mobile.  

**Slots**  
  
```default```

---

### NavigationItem

**Usage**  

```
<navigation-item href="/link-1" is-active is-tab>Link 1</navigation-item>
<navigation-item has-dropdown is-arrowless>
    Dropdown
    <template v-slot:dropdown>
        <navigation-item href="/dropdown-link-1">Dropdown link 1</navigation-item>
        <navigation-item href="/dropdown-link-2">Dropdown link 2</navigation-item>
        <navigation-item href="/dropdown-link-3">Dropdown link 3</navigation-item>
    </template>                    
</navigation-item>

```

**Props**  

```has-dropdown``` - Set this prop if you want to use dropdown.
```is-active``` - Use this prop to indicate the active state.
```is-arrowless``` - Dropdown without arrow
```is-tab``` - Change the style of the navigation item to tab style.

**Slots**  
  
```default```
```dropdown```

---

### Paging

**Usage**  

```
<pagination v-bind:current-page="1" v-bind:pages="10" v-on:update-current-page="pagination"></pagination>

<pagination v-bind:current-page="1" v-bind:pages="10" v-on:update-current-page="pagination">Custom</pagination>
```

**Events**  

```update-current-page```

**Props**  

```current-page```  
```pages``` - Total number of pages

**Slots**  

```default```  

---

### Panel

**Usage**  

```
<panel class="is-narrow" title="My modal">
    <template v-slot:body>
        This is a panel
    </template>
</panel>
```

**Class modifiers**  

```.is-narrow``` - Displays a narrower panel.  
  
**Props**  

```title``` - This prop only works when ```topleft``` slot is not provided. 

**Slots**  

```topleft``` - Overrides the default panel header.  
```topright```  
```body```  
```bottomleft```  
```bottomright```  

---

### Tooltip

**Usage**  

```
<tooltip class="is-at-top" v-bind:is-open="isOpen">
    This is a tooltip
</tooltip>
```

!!! The parent element of <tooltip> must always have relative or absolute positioning 

**Class modifiers**  

```.is-at-bottom``` - Default  
```.is-at-left```  
```.is-at-right```  
```.is-at-top```  
  
**Props**  

```isOpen``` 

**Slots**  

```default```

---

### TooltipIcon

**Usage**  

```
<tooltip-icon position="left">
    This is a tooltip
</tooltip-icon>
``` 
  
**Props**  

```position``` - bottom, left, right or top 

**Slots**  

```default```