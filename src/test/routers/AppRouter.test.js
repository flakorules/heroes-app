import React from 'react';
import { mount, shallow } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";
import '@testing-library/jest-dom'


describe('Pruebas en AppRouter', () => {
    const contexValue = {
        dispatch: jest.fn(),
        user: { logged: false }
    }

    test('Debe mostrar el login si no esta autenticado', () => {


        const wrapper = mount(
            <AuthContext.Provider value={contexValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();

    })

    test('Debe mostrar el componente marvel si esta autenticado', () => {

        const contexValue = {
            dispatch: jest.fn(),
            user: { logged: true, name:'Tereso' }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contexValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        

        expect(wrapper.find('.navbar').exists()).toBe(true);
    })
    


})
