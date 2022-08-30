import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EntityDetailsContext } from '../App';
const propsValue = {};
const Wrapper = ({ children }) => {
    return (
        <EntityDetailsContext.Provider value={propsValue}>
            <BrowserRouter>{children}</BrowserRouter>
        </EntityDetailsContext.Provider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
