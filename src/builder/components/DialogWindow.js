import React from 'react';
import styledComponents from 'styled-components';

const DialogWindow = ({ children, onClose: forwardClose }) => {

    const itself = React.useRef()
    const handleOutsideClick = (e) => e.target === itself.current && forwardClose()

    return (
        <Container ref={itself} onClick={handleOutsideClick}>
            <div className='additional_wrap'>
                {children}
            </div>
        </Container>
    );
};

export default DialogWindow;

const Container = styledComponents.div`
    position:fixed;
    z-index:9;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:rgba(255,255,255,0.8);
    display:flex;
    justify-content:center;
    align-items:center;
    .additional_wrap{
        max-width:90vw;
        max-height:90vh;
        box-shadow:0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
    }
`