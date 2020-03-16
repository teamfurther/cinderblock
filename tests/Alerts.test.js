import { mount } from '@vue/test-utils'
import Vue from 'vue';

import Alert from '../src/js/components/Alert';
import Alerts from '../src/js/components/Alerts';

describe('Alerts', function () {
    const wrapper = mount(Alerts, {
        propsData: {
            alerts: [
                {
                    message: 'This is an alert message.',
                    type: 'success'
                }
            ]
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });
});

describe('Alert', function () {
    const wrapper = mount(Alert, {
        propsData: {
            message: 'This is an alert message.',
            type: 'success'
        }
    });

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

    test('message is set correctly', function () {
        // test
        expect(wrapper.vm.message).toBe(wrapper.props('message'));
        expect(wrapper.html()).toContain(wrapper.props('message'));
    });

    test('type is set correctly', function () {
        // test
        expect(wrapper.vm.type).toBe('success');
    });

    test('self-destroys after `autoDismiss`', function () {
        setTimeout(function () {
            // test
            expect(wrapper.exists()).toBe(false);
        }, wrapper.vm.autoDismiss);
    });

    test('emits `close-alert` when X icon is clicked', function () {
        // set-up
        const xIcon = wrapper.find('.alert__close');
        xIcon.trigger('click');

        // test
        expect(wrapper.emitted('close-alert')).toBeTruthy();
    });

    test('emits `alert-closed` after X icon is clicked', function () {
        // set-up
        const xIcon = wrapper.find('.alert__close');
        xIcon.trigger('click');

        setTimeout(function () {
            // test
            expect(wrapper.emitted('alert-closed')).toBeTruthy();
        }, wrapper.vm.autoDismiss);
    });
});