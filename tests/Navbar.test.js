import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Navbar from '../src/js/components/Navbar';

describe('Navbar', function () {

    test('is a Vue instance', function () {
        // set-up
        const wrapper = mount(Navbar);

        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });

    test('body is set correctly', function () {
        // set-up
        const wrapper = mount(Navbar, {
            slots: {
                default: 'This is my <strong>body</strong>.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is my <strong>body</strong>.');
    });
});