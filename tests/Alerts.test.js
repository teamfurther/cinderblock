import { mount } from '@vue/test-utils'
import { nextTick } from 'vue';

import CAlert from '../src/ts/components/CAlert';
import CAlerts from '../src/ts/components/CAlerts';

describe('CAlerts', function () {
    const wrapper = mount(CAlerts, {
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
        expect(wrapper).toBeTruthy();
    });
});

describe('CAlert', function () {
    const wrapper = mount(CAlert, {
        propsData: {
            message: 'This is an alert message.',
            type: 'success'
        }
    });

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
        const xIcon = wrapper.find('.c-alert__close');
        xIcon.trigger('click');

        // test
        expect(wrapper.emitted('closeAlert')).toBeTruthy();
    });

    test('emits `alert-closed` after X icon is clicked', function () {
        // set-up
        const xIcon = wrapper.find('.c-alert__close');
        xIcon.trigger('click');

        setTimeout(function () {
            // test
            expect(wrapper.emitted('alertClosed')).toBeTruthy();
        }, wrapper.vm.autoDismiss);
    });
});