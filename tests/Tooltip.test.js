import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Tooltip from '../src/js/components/Tooltip';

describe('Tooltip', function () {
    const wrapper = mount(Tooltip, {
        propsData: {
            isOpen: false
        },
        slots: {
            default: 'This is a tooltip'
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });

    test('is hidden by default', function () {
        // test
        expect(wrapper.is('.is-open')).toBe(false);
    });

    test('tooltip is set correctly', function () {
        // test
        expect(wrapper.html()).toContain('This is a tooltip');
    });

    test('opens on `isOpen` prop change', function () {
        // set-up
        wrapper.setProps({
            isOpen: true
        });

        Vue.nextTick(function () {
            // test
            expect(wrapper.is('.is-open')).toBe(true);
        });
    });

    test('closes on `isOpen` prop change', function () {
        // set-up
        wrapper.setProps({
            isOpen: false
        });

        Vue.nextTick(function () {
            // test
            expect(wrapper.is('.is-open')).toBe(false);
        });
    });
});