import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Btn from '../src/js/components/Btn';

describe('Btn', function () {
    // set-up
    const wrapper = mount(Btn);

    test('is a Vue instance', function () {
        // test
        expect(wrapper).toBeTruthy();
    });

    test('is a button if no `href` is set', function () {
        // test
        expect(wrapper.element.tagName).toBe('BUTTON');
    });

    test('is a link if `href` is set', function () {
        // set-up
        wrapper.setProps({
            href: '/home'
        });

        // test
        Vue.nextTick(function () {
            expect(wrapper.element.tagName).toBe('A');
        });
    });

    test('body is set correctly', function () {
        // set-up
        const wrapper = mount(Btn, {
            slots: {
                default: 'This is my <strong>body</strong>.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is my <strong>body</strong>.');
    });
});