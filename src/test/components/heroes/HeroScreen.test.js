import React from 'react';
import '@testing-library/jest-dom'
import { mount, shallow } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'
import { HeroScreen } from '../../../components/heroes/HeroScreen'

describe('Pruebas en HeroScreen', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()

    }


    const wrapper = mount(
        <MemoryRouter initialEntries={['/hero']}>
            <HeroScreen history={history} />
        </MemoryRouter>
    );

    test('Debe mostrar el componente redirect si no hay argumentos en la URL', () => {

        //expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('Redirect').exists()).toBe(true);

    });

    test('Debe mostrar un hero si el parametro existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>

                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.row').exists()).toBe(true);

    })

    test('Debe regresar a la pantala anterior con push', () => {

        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()

        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={history} />} />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();       
    });

    test('Debe regresar a la pantalla anterior con GOBACK', () => {
       

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={history} />} />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledTimes(0);
        expect(history.goBack).toHaveBeenCalled();   


    })

    test('Debe llama redirect si hero no existe ', async () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider666']}>
                <Route 
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={history} />} />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('')


        
    })
    
    


})
