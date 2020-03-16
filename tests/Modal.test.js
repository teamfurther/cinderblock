import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Modal from '../src/js/components/Modal';

describe('Modal', function () {
    const wrapper = mount(Modal, {
        propsData: {
            isOpen: false
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });

    test('is hidden by default', function () {
        // test
        expect(wrapper.is('.is-open')).toBe(false);
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

    test('header is set correctly', function () {
        // set-up
        const wrapper = mount(Modal, {
            propsData: {
                isOpen: false,
                title: 'Test title'
            },
            slots: {
                header: '<h3>Custom title</h3>'
            }
        });

        // test
        expect(wrapper.html()).toContain('<h3>Custom title</h3>');
        expect(wrapper.html()).not.toContain(wrapper.props('title'));
    });

    test('body is set correctly', function () {
        // set-up
        const wrapper = mount(Modal, {
            propsData: {
                isOpen: false
            },
            slots: {
                body: 'This is my <strong>body</strong>.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is my <strong>body</strong>.');
    });

    test('footer is set correctly', function () {
        // set-up
        const wrapper = mount(Modal, {
            propsData: {
                isOpen: false
            },
            slots: {
                body: 'This is a <em>footer</em>.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is a <em>footer</em>.');
    });

    test('opens on `isOpen` prop change', function () {
        // set-up
        wrapper.setProps({
            isOpen: true
        });

        Vue.nextTick(function () {
            // test
            expect(wrapper.is('.is-open')).toBe(true);
        });
    });

    test('closes on `isOpen` prop change', function () {
        // set-up
        wrapper.setProps({
            isOpen: false
        });

        Vue.nextTick(function () {
            // test
            expect(wrapper.is('.is-open')).toBe(false);
        });
    });

    test('emits `close-modal` when X icon is clicked', function () {
        // set-up
        const xIcon = wrapper.find('.modal__close');
        xIcon.trigger('click');

        // test
        expect(wrapper.emitted('close-modal')).toBeTruthy();
    });

    test('emits `close-modal` when backdrop is clicked', function () {
        // set-up
        const xIcon = wrapper.find('.modal__backdrop');
        xIcon.trigger('click');

        // test
        expect(wrapper.emitted('close-modal')).toBeTruthy();
    });
});