import { mount } from '@vue/test-utils'

import Vue from 'vue';

import DataTable from '../src/js/components/DataTable';

// Mock a DOM
document.body.innerHTML = 'This is a mock DOM';

describe('DataTable', function () {
    const wrapper = mount(DataTable, {
        propsData: {
            data: {
                columnAligns: {age: 'center'}, //left, right, center
                columnNames: {id: 'Id', name: 'Name', age: 'Age', country: 'Country'},
                items: [
                    {
                        values: {id: 1, name: "Maria", age: "20", country: 'Germany'},
                        actions: [{
                            title: 'Details',
                            url: '/details/1'
                            // OR
                            // method: 'dataTableAction'
                        }],
                        childData: {
                            columnNames: {name: 'Child name', age: 'Age'},
                            items: [
                                {
                                    values: {name: 'Ben', age: '5'}
                                },
                                {
                                    values: {name: 'Bill', age: 'Age'}
                                }
                            ]
                        }
                    },
                    {
                        values: {id: 2, name: "John", age: "20", country: 'UK'},
                        actions: [{
                            title: 'Details',
                            method: 'dataTableAction'
                        }]
                    },
                    {
                        values: {id: 3, name: "Roland", age: "20", country: 'Hungary'},
                        actions: [{
                            title: 'Details',
                            url: '/details/3'
                        }]
                    },
                    {
                        values: {id: 4, name: "Chris", age: "20", country: 'UK'},
                        actions: [{
                            title: 'Details',
                            url: '/details/4'
                        }]
                    },
                    {
                        values: {id: 5, name: "Helen", age: "20", country: 'UK'},
                        actions: [{
                            title: 'Details',
                            url: '/details/5'
                        }]
                    }
                ],
                sortableColumns: ['id', 'name', 'age', 'country']
            }
        }
    });

    test('is a Vue instance', function () {
        // test
        expect(wrapper).toBeTruthy();
    });
});