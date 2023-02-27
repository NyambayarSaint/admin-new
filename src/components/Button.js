import React from 'react';
import styled from 'styled-components';
import { addRipple } from 'utils/vanillaFunctions';

const Button = ({ children, c, ...props }) => {
    const itself = React.useRef()
    React.useEffect(() => {
        itself.current.addEventListener('click', addRipple)
    }, [])
    return (
        <Container className={c} ref={itself} {...props}>
            {children}
        </Container>
    );
};

export default Button;

const Container = styled.button`
    ${({ fullWidth }) => fullWidth && `width:100%;`};
    cursor:pointer;
    padding:6px 12px;
    ${({ theme, bg }) => `background:${theme[bg] ?? bg};`};
    ${({ color }) => `color:${color}`};
    border:1px solid rgba(0,0,0,0.1);
    border-radius:4px;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:6px;
    position:relative;
    overflow:hidden;
    & > * {
        pointer-events:none;
    }
    svg{
        pointer-events:none;
    }
`