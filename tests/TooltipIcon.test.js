import { mount } from '@vue/test-utils'

import Vue from 'vue';

import TooltipIcon from '../src/js/components/TooltipIcon';

describe('TooltipIcon', function () {
    const wrapper = mount(TooltipIcon, {
        slots: {
            default: 'This is a tooltip'
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });

    test('tooltip is set correctly', function () {
        // test
        expect(wrapper.html()).toContain('This is a tooltip');
    });
});