import { mount } from '@vue/test-utils'

import Vue, {nextTick} from 'vue';

import CNavigationItem from '../src/ts/components/CNavigationItem';

describe('CNavigationItem', function () {
    const wrapper = mount(CNavigationItem, {
        propsData: {
            hasDropdown: true
        },
        slots: {
            default: 'Nav item',
            dropdown: '<a>Nav item</a>'
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper).toBeTruthy();
    });

    test('body is set correctly', function () {
        // test
        expect(wrapper.html()).toContain('Nav item');
    });

    test('dropdown is set correctly', function () {
        // test
        expect(wrapper.html()).toContain('<a>Nav item</a>');
    });
});