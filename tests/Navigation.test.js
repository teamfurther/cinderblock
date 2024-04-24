import { mount } from '@vue/test-utils'

import CNavigation from '../src/ts/components/CNavigation';

describe('CNavigation', function () {
    test('is a Vue instance', function () {
        // set-up
        const wrapper = mount(CNavigation);

        // test
        expect(wrapper).toBeTruthy();
    });

    test('body is set correctly', function () {
        // set-up
        const wrapper = mount(CNavigation, {
            slots: {
                default: '<a>Nav item</a>'
            }
        });

        // test
        expect(wrapper.html()).toContain('<a>Nav item</a>');
    });
});