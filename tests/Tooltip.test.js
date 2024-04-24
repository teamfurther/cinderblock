import { mount } from '@vue/test-utils'

import Vue, {nextTick} from 'vue';

import CTooltip from '../src/ts/components/CTooltip';

describe('Tooltip', function () {
    const wrapper = mount(CTooltip, {
        propsData: {
            active: false
        },
        slots: {
            default: 'This is a tooltip'
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper).toBeTruthy();
    });

    test('is hidden by default', function () {
        // test
        expect(wrapper.classes('is-open')).toBe(false);
    });

    test('tooltip is set correctly', function () {
        // test
        expect(wrapper.html()).toContain('This is a tooltip');
    });

    test('opens on `isOpen` prop change', async function () {
        // set-up
        wrapper.setProps({
            active: true
        });

        // test
        await nextTick();
        expect(wrapper.classes('pointer-events-auto')).toBe(true);
    });

    test('closes on `isOpen` prop change', async function () {
        // set-up
        wrapper.setProps({
            active: false
        });

        // test
        await nextTick();
        expect(wrapper.classes('pointer-events-none')).toBe(true);
    });
});