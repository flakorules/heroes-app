import { authReducer } from '../../auth/authReducer';
import '@testing-library/jest-dom';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {

    test('Debe retornar el estado por defecto', () => {

        const state = authReducer({ logged: false }, {});
        expect(state).toEqual({ logged: false });

    })

    test('Debe autenticar y colocar el name del usuario', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Tereso'
            }
        }

        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({
            logged: true,
            name: 'Tereso'
        });


    })

    test('Debe borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout
        }

        const state = authReducer({ logged: true, name: 'Tereso' }, action);
        expect(state).toEqual({
            logged: false
        });
    })

})
