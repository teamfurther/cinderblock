import { mount } from '@vue/test-utils'

import Vue from 'vue';

import NavigationItem from '../src/js/components/NavigationItem';

describe('NavigationItem', function () {
    const wrapper = mount(NavigationItem, {
        propsData: {
            hasDropdown: true,
            isArrowless: true,
            isTab: true
        },
        slots: {
            default: 'Nav item',
            dropdown: '<a>Nav item</a>'
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });

    test('body is set correctly', function () {
        // test
        expect(wrapper.html()).toContain('Nav item');
    });

    test('dropdown is set correctly', function () {
        // test
        expect(wrapper.html()).toContain('<a>Nav item</a>');
    });

    test('is arrowless works', function () {
        Vue.nextTick(function () {
            // test
            expect(wrapper.contains('.is-arrowless')).toBe(true);
        });
    });

    test('is tab works', function () {
        Vue.nextTick(function () {
            // test
            expect(wrapper.contains('.is-tab')).toBe(true);
        });
    });
});