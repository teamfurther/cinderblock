import { mount } from '@vue/test-utils'

import { nextTick } from 'vue';

import CPanel from '../src/ts/components/CPanel';

describe('CPanel', function () {
    const wrapper = mount(CPanel);

    test('is a Vue instance', function () {
        // test
        expect(wrapper).toBeTruthy();
    });

    test('title is set correctly', async function () {
        // set-up
        wrapper.setProps({
            title: 'Test title'
        });

        // test
        await nextTick();
        expect(wrapper.vm.title).toBe(wrapper.props('title'));
        expect(wrapper.html()).toContain(wrapper.props('title'));
    });

    test('top is set correctly', function () {
        // set-up
        const wrapper = mount(CPanel, {
            propsData: {
                title: 'Test title'
            },
            slots: {
                top: '<h3>Custom title</h3>'
            }
        });

        // test
        expect(wrapper.html()).toContain('<h3>Custom title</h3>');
        expect(wrapper.html()).not.toContain(wrapper.props('title'));
    });

    test('body is set correctly', function () {
        // set-up
        const wrapper = mount(CPanel, {
            slots: {
                body: 'This is my <strong>body</strong>.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is my <strong>body</strong>.');
    });

    test('bottom is set correctly', function () {
        // set-up
        const wrapper = mount(CPanel, {
            slots: {
                bottom: 'This is the <em>bottom</em> slot.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is the <em>bottom</em> slot.');
    });
});