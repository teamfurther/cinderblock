import { mount } from '@vue/test-utils'

import CPagination from '../src/ts/components/CPagination';

// Mock a DOM
document.body.innerHTML = 'This is a mock DOM';

describe('CPagination', function () {
    const wrapper = mount(CPagination, {
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