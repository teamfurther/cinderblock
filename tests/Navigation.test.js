import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Navigation from '../src/js/components/Navigation';

describe('Navigation', function () {
    test('is a Vue instance', function () {
        // set-up
        const wrapper = mount(Navigation);

        // test
        expect(wrapper).toBeTruthy();
    });

    test('body is set correctly', function () {
        // set-up
        const wrapper = mount(Navigation, {
            slots: {
                default: '<a>Nav item</a>'
            }
        });

        // test
        expect(wrapper.html()).toContain('<a>Nav item</a>');
    });
});