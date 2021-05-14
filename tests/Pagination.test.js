import { mount } from '@vue/test-utils'

import Vue from 'vue';

import Pagination from '../src/js/components/Pagination';

// Mock a DOM
document.body.innerHTML = 'This is a mock DOM';

describe('Pagination', function () {
    const wrapper = mount(Pagination, {
        propsData: {
            currentPage: 1,
            pages: 10
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper).toBeTruthy();
    });
});