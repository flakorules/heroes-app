import React from 'react';
import { mount } from "enzyme"
import { AuthContext } from "../../auth/AuthContext"
import { DashboardRoutes } from "../../routers/DashboardRoutes"
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en DashboardRoutes', () => {

    const contexValue = {
        dispatch: jest.fn(),
        user: { logged: true, name: 'Tereso' }
    }

    test('Debe mstrarse correctamente', () => {

        const wrapper = mount(
            <AuthContext.Provider value={contexValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>

        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Tereso');

    })


})
