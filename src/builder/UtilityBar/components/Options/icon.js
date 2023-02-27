import React from 'react';
import styledComponents from 'styled-components';
// import IconPicker from 'react-icons-picker'

const Text = ({ object, forwardKey, forwardChange }) => {
    const [value, setValue] = React.useState(object.value)
    const handleChange = (val) => {
        setValue(val)
        forwardChange(forwardKey, val)
    }
    return (
        <Container>
            icon picker fix
            {/* <IconPicker value={value} onChange={handleChange} /> */}
        </Container>
    );
};

export default Text;

const Container = styledComponents.div`
`