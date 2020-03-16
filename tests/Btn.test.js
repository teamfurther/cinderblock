import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Btn from '../src/js/components/Btn';

describe('Btn', function () {
    // set-up
    const wrapper = mount(Btn);

    test('is a Vue instance', function () {
        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });

    test('is a button if no `href` is set', function () {
        // test
        expect(wrapper.is('button')).toBe(true);
        expect(wrapper.is('a')).toBe(false);
    });

    test('is a link if `href` is set', function () {
        // set-up
        wrapper.setProps({
            href: '/home'
        });

        // test
        Vue.nextTick(function () {
            expect(wrapper.is('button')).toBe(false);
            expect(wrapper.is('a')).toBe(true);
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