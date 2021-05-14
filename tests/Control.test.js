import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Control from '../src/js/components/Control';

// Mock a DOM
document.body.innerHTML = 'This is a mock DOM';

describe('Control', function () {
    const wrapper = mount(Control, {
        propsData: {
            icon: 'search',
            label: 'This is my label',
            name: 'myControl',
            placeholder: 'This is a placeholder',
            tooltip: 'This is a tooltip',
            type: 'text'
        },
        slots: {
            notes: 'This is a note to the field. It also accepts <strong>HTML</strong>'
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper).toBeTruthy();
    });

    test('icon is set correctly', function () {
        // test
        expect(wrapper.find('svg.icon').exists()).toBe(true);
        expect(wrapper.html()).toContain('<use xlink:href="#icon-' + wrapper.props('icon') + '">');
    });

    test('label is set correctly', function () {
        // test
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.html()).toContain(wrapper.props('label'));
    });

    test('placeholder is set correctly', function () {
        // test
        expect(wrapper.find('input').exists()).toBe(true);
        expect(wrapper.html()).toContain(wrapper.props('placeholder'));
    });

    test('tooltip is set correctly', function () {
        // test
        expect(wrapper.html()).toContain(wrapper.props('tooltip'));
    });

    test('notes are set correctly', function () {
        // test
        expect(wrapper.html()).toContain('This is a note to the field. It also accepts <strong>HTML</strong>');
    });

    test('is disabled works', function () {
        // set-up
        wrapper.setProps({
            isDisabled: true
        });

        Vue.nextTick(function () {
            // test
            expect(wrapper.find('input:disabled').exists()).toBe(true);
        });
    });

    test('is invalid works', function () {
        // set-up
        wrapper.setProps({
            isInvalid: true
        });

        Vue.nextTick(function () {
            // test
            expect(wrapper.classes('is-invalid')).toBe(true);
        });
    });

    test('is readonly works', function () {
        // set-up
        wrapper.setProps({
            isReadonly: true
        });

        Vue.nextTick(function () {
            // test
            expect(wrapper.find('input:read-only').exists()).toBe(true);
        });
    });

});