import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Pagination from '../src/js/components/Pagination';

describe('Pagination', function () {
    const wrapper = mount(Pagination, {
        propsData: {
            data: {
                currentPage: 1,
                pages: 10
            }
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper.isVueInstance()).toBe(true);
    });
});