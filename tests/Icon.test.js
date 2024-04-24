import { mount } from '@vue/test-utils'

import CIcon from '../src/ts/components/CIcon';

// Mock a DOM
document.body.innerHTML = 'This is a mock DOM';

describe('CIcon', function () {
    const wrapper = mount(CIcon, {
        propsData: {
            icon: 'circle'
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper).toBeTruthy();
    });
});