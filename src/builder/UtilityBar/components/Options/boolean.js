import React from 'react';
import styledComponents from 'styled-components';

const Boolean = ({ object, forwardKey, forwardChange }) => {
    const [value, setValue] = React.useState(object.value)
    const handleChange = (e) => {
        setValue(e.target.checked)
        forwardChange(forwardKey, e.target.checked)
    }
    return (
        <Container>
            <input type="checkbox" value={value} checked={value} onChange={handleChange} className="pb_switch" />
            {/* <label for="c1">Checkbox</label>
            <input type="checkbox" name="c1" id="c1" />

            <label for="r1">Radio</label>
            <input type="radio" name="r1" id="r1" />

            <label for="s1">Switch</label>
            <input type="checkbox" class="pb_switch" name="s1" id="s1" /> */}
        </Container>
    );
};

export default Boolean;

const Container = styledComponents.div`
`