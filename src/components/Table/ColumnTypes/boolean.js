import React from 'react';
import styled from 'styled-components';

const boolean = ({ children }) => {
    return (
        <Container bool={children}>
            {children ? 'Yes' : 'No'}
        </Container>
    );
};

export default boolean;

const Container = styled.div`
    background: ${({ theme, bool }) => `${bool ? theme.green : theme.red}`}40;
    color: ${({ theme, bool }) => `${bool ? theme.green : theme.red}`};
    text-align:center;
    padding:2px 16px;
    border-radius:4px;
    font-weight:400;
    display:block;
    width:fit-content;
`