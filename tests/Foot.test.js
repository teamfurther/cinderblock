import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Foot from '../src/js/components/Foot';

describe('Foot', function () {

    test('is a Vue instance', function () {
        // set-up
        const wrapper = mount(Foot);

        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });

    test('body is set correctly', function () {
        // set-up
        const wrapper = mount(Foot, {
            slots: {
                default: 'This is my <strong>body</strong>.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is my <strong>body</strong>.');
    });
});