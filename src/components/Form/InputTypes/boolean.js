import React from 'react';
import styled from 'styled-components';
import Switch from "react-switch";

const boolean = ({ value, required, onChange, onChangeClean, ...props }) => {
    const forwardChange = (v) => {
        onChange && onChange(v)
        onChangeClean && onChangeClean(v)
    }
    return (
        <Container>
            <Switch checked={typeof value === 'boolean' ? value ?? false : value === 1 ? true : false} required={required} onChange={forwardChange} {...props} offColor='#BBBBBB' onColor="#67c23a" />
        </Container>
    );
};

export default boolean;

const Container = styled.div`
    max-height:27.8px;
    & > div{
        & > div {
            border-radius:4px !important;
        }
    }
    .react-switch-bg{
        height:27px !important;
    }
    .react-switch-handle{
        height:25px !important;
    }
`