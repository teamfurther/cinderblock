import Alerts from './components/Alerts.vue';
import Brand from './components/Brand.vue';
import Btn from './components/Btn.vue';
import Control from './components/Control.vue';
import DataTable from './components/DataTable.vue';
import Foot from './components/Foot.vue';
import Icon from './components/Icon.vue';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import NavigationItem from './components/NavigationItem';
import Pagination from './components/Pagination';
import Panel from './components/Panel';
import Tooltip from './components/Tooltip';
import TooltipIcon from './components/TooltipIcon';


export default {
    install(Vue: any) {
        Vue.component('alerts', Alerts);
        Vue.component('brand', Brand);
        Vue.component('btn', Btn);
        Vue.component('control', Control);
        Vue.component('data-table', DataTable);
        Vue.component('foot', Foot);
        Vue.component('icon', Icon);
        Vue.component('modal', Modal);
        Vue.component('navbar', Navbar);
        Vue.component('navigation', Navigation);
        Vue.component('navigation-item', NavigationItem);
        Vue.component('pagination', Pagination);
        Vue.component('panel', Panel);
        Vue.component('tooltip', Tooltip);
        Vue.component('tooltipIcon', TooltipIcon);
    },
};

export { Alerts, Brand, Btn, Control, DataTable, Foot, Icon, Modal, Navbar, Navigation, NavigationItem, Pagination, Panel, Tooltip, TooltipIcon };

