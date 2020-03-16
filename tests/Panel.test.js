import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Panel from '../src/js/components/Panel';

describe('Panel', function () {
    const wrapper = mount(Panel);

    test('is a Vue instance', function () {
        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });

    test('title is set correctly', function () {
        // set-up
        wrapper.setProps({
            title: 'Test title'
        });

        Vue.nextTick(function () {
            // test
            expect(wrapper.vm.title).toBe(wrapper.props('title'));
            expect(wrapper.html()).toContain(wrapper.props('title'));
        });
    });

    test('top left is set correctly', function () {
        // set-up
        const wrapper = mount(Panel, {
            propsData: {
                title: 'Test title'
            },
            slots: {
                topleft: '<h3>Custom title</h3>'
            }
        });

        // test
        expect(wrapper.html()).toContain('<h3>Custom title</h3>');
        expect(wrapper.html()).not.toContain(wrapper.props('title'));
    });

    test('top right is set correctly', function () {
        // set-up
        const wrapper = mount(Panel, {
            slots: {
                topright: 'This is the <em>top right</em> slot.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is the <em>top right</em> slot.');
    });

    test('body is set correctly', function () {
        // set-up
        const wrapper = mount(Panel, {
            slots: {
                body: 'This is my <strong>body</strong>.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is my <strong>body</strong>.');
    });

    test('bottom left is set correctly', function () {
        // set-up
        const wrapper = mount(Panel, {
            slots: {
                bottomleft: 'This is the <em>bottom left</em> slot.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is the <em>bottom left</em> slot.');
    });

    test('bottom right is set correctly', function () {
        // set-up
        const wrapper = mount(Panel, {
            slots: {
                bottomright: 'This is the <em>bottom right</em> slot.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is the <em>bottom right</em> slot.');
    });
});