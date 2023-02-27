import React from 'react';
import styledComponents from 'styled-components';

const Text = ({ object, forwardKey, forwardChange }) => {
    const [value, setValue] = React.useState(object.value)
    const handleChange = (e) => {
        setValue(e.target.value)
        forwardChange(forwardKey, e.target.value)
    }
    return (
        <Container>
            <input rel="pb" value={value} onChange={handleChange} />
        </Container>
    );
};

export default Text;

const Container = styledComponents.div`
    input{
        width:100%;
    }
`