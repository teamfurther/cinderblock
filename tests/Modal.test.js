import { mount } from '@vue/test-utils'

import Vue, {nextTick} from 'vue';

import CModal from '../src/ts/components/CModal';

describe('CModal', function () {
    const wrapper = mount(CModal, {
        propsData: {
            open: false
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

    test('header is set correctly', function () {
        // set-up
        const wrapper = mount(CModal, {
            propsData: {
                open: false,
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
        const wrapper = mount(CModal, {
            propsData: {
                open: false
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
        const wrapper = mount(CModal, {
            propsData: {
                open: false
            },
            slots: {
                body: 'This is a <em>footer</em>.'
            }
        });

        // test
        expect(wrapper.html()).toContain('This is a <em>footer</em>.');
    });

    test('opens on `isOpen` prop change', async function () {
        // set-up
        wrapper.setProps({
            open: true
        });

        // test
        await nextTick();
        expect(wrapper.classes('pointer-events-auto')).toBe(true);
    });

    test('closes on `open` prop change', async function () {
        // set-up
        wrapper.setProps({
            open: false
        });

        await nextTick();
        // test
        expect(wrapper.classes('pointer-events-none')).toBe(true);
    });

    test('emits `closeModal` when X icon is clicked', function () {
        // set-up
        const xIcon = wrapper.find('.c-modal__close');
        xIcon.trigger('click');

        // test
        expect(wrapper.emitted('closeModal')).toBeTruthy();
    });

    test('emits `closeModal` when backdrop is clicked', function () {
        // set-up
        const xIcon = wrapper.find('.c-modal__backdrop');
        xIcon.trigger('click');

        // test
        expect(wrapper.emitted('closeModal')).toBeTruthy();
    });
});