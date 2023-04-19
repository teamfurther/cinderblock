import CAlerts from './components/CAlerts.vue';
import CButton from './components/CButton.vue';
import CControlAutocomplete from './components/CControlAutocomplete.vue';
import CControlCheckbox from './components/CControlCheckbox.vue';
import CControlDate from './components/CControlDate.vue';
import CControlFile from './components/CControlFile.vue';
import CControlNumber from './components/CControlNumber.vue';
import CControlRadio from './components/CControlRadio.vue';
import CControlSelect from './components/CControlSelect.vue';
import CControlTag from './components/CControlTag.vue';
import CControlText from './components/CControlText.vue';
import CControlToggle from './components/CControlToggle.vue';
import CDataTable from './components/CDataTable.vue';
import CIcon from './components/CIcon.vue';
import CModal from './components/CModal.vue';
import CNavigation from './components/CNavigation.vue';
import CNavigationItem from './components/CNavigationItem.vue';
import CPagination from './components/CPagination.vue';
import CPanel from './components/CPanel.vue';
import CTooltip from './components/CTooltip.vue';
import CTooltipIcon from './components/CTooltipIcon.vue';

import '../css/components/datepicker.css';

export default {
    install(Vue: any) {
        Vue.component('c-alerts', CAlerts);
        Vue.component('c-button', CButton);
        Vue.component('c-control-autocomplete', CControlAutocomplete);
        Vue.component('c-control-checkbox', CControlCheckbox);
        Vue.component('c-control-date', CControlDate);
        Vue.component('c-control-file', CControlFile);
        Vue.component('c-control-number', CControlNumber);
        Vue.component('c-control-radio', CControlRadio);
        Vue.component('c-control-select', CControlSelect);
        Vue.component('c-control-tag', CControlTag);
        Vue.component('c-control-text', CControlText);
        Vue.component('c-control-toggle', CControlToggle);
        Vue.component('c-data-table', CDataTable);
        Vue.component('c-icon', CIcon);
        Vue.component('c-modal', CModal);
        Vue.component('c-navigation', CNavigation);
        Vue.component('c-navigation-item', CNavigationItem);
        Vue.component('c-pagination', CPagination);
        Vue.component('c-panel', CPanel);
        Vue.component('c-tooltip', CTooltip);
        Vue.component('c-tooltip-icon', CTooltipIcon);
    },
};

export {
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
    CIcon,
    CModal,
    CNavigation,
    CNavigationItem,
    CPagination,
    CPanel,
    CTooltip,
    CTooltipIcon,
};

