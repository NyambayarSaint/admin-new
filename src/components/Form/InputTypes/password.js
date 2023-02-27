import React from 'react';
import styled from 'styled-components';

const password = ({ children, required, onChange, onChangeClean, ...props }) => {
    const forwardChange = (e) => {
        onChange && onChange(e)
        onChangeClean && onChangeClean(e.target.value)
    }
    return (
        <Container type="password" onChange={forwardChange} required={required} {...props}>{children}</Container>
    );
};

export default password;

const Container = styled.input`
    width:100%;
    border:1px solid rgba(0,0,0,0.2);
    border-radius:4px;
    padding:6px 12px;
    outline:none;
    &[data-state="danger"]{
        background:rgba(245,108,108,.1);
        color:#f56c6c;
        border-color: rgba(255,0,0,0.1);
    }
    &[data-state="success"]{
        background:rgba(103,194,58,.1);
        color:#67c23a;
        border-color: rgba(0,255,0,0.1);
    }
    &[readonly]{
        cursor:default;
    }
`