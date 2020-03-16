import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Brand from '../src/js/components/Brand';

describe('Brand', function () {
    // set-up
    const wrapper = mount(Brand);

    test('is a Vue instance', function () {
        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });

    test('body is set correctly', function () {
        // set-up
        const wrapper = mount(Brand, {
            slots: {
                default: 'This is my <strong>body</strong>.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is my <strong>body</strong>.');
    });

    test('href is set correctly', function () {
        // set-up
        wrapper.setProps({
            href: 'https://test.com'
        });

        Vue.nextTick(function () {
            // test
            expect(wrapper.vm.href).toBe('https://test.com');
            expect(wrapper.html()).toContain('https://test.com');
        });
    });
});