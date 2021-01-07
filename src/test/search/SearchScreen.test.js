import React from 'react';

import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../components/search/SearchScreen';

describe('Pruebas en SearchScreen', () => {

    test('Debe mostrarse correctamente con valores por defecto', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero')

    })

    test('Debe moistrar a batman y el input con valor del querystring', () => {


        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman');

    })


    test('Debe mostrar error si no se encuentra el hero', () => {


        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=perkinman']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find('.alert-danger').exists()).toBe(true);

    });

    test('debe llamar el push del history', () => {

        const history = {
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={() => <SearchScreen history={history} />} />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }

        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault() { }
        });

        expect(history.push).toHaveBeenCalledWith(`?q=batman`);
    })
})
