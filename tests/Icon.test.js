import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Icon from '../src/js/components/Icon';

describe('Icon', function () {
    const wrapper = mount(Icon, {
        propsData: {
            icon: 'circle'
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });
});