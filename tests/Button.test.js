import { mount } from '@vue/test-utils'

import { nextTick } from 'vue';

import CButton from '../src/ts/components/CButton';

describe('CButton', function () {
    // set-up
    const wrapper = mount(CButton);

    test('is a Vue instance', function () {
        // test
        expect(wrapper).toBeTruthy();
    });

    test('is a button if no `href` is set', function () {
        // test
        expect(wrapper.element.tagName).toBe('BUTTON');
    });

    test('is a link if `to` is set', async function () {
        // set-up
        wrapper.setProps({
            to: '/home'
        });

        // test
        await nextTick();
        expect(wrapper.element.tagName).toBe('A');
    });

    test('body is set correctly', function () {
        // set-up
        const wrapper = mount(CButton, {
            slots: {
                default: 'This is my <strong>body</strong>.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is my <strong>body</strong>.');
    });
});