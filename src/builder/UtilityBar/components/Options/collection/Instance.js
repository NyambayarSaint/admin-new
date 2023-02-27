import React from 'react';
import styledComponents from 'styled-components';
import * as OptionComponents from '../index'

const Instance = ({ object: options, forwardKey, forwardChange, index }) => {
    const handleChange = (key, value) => {
        forwardChange(key, value, index)
    }
    return (
        <Container className='instance_body'>
            {Object.keys(options).map(optionKey => {
                const isArray = Array.isArray(options[optionKey])
                const OptionType = isArray ? OptionComponents.collection : OptionComponents[options[optionKey].type]
                return (
                    <div className='option_instance' key={forwardKey + index + optionKey}>
                        <div className='caption'>{optionKey}</div>
                        <OptionType object={options[optionKey]} forwardKey={optionKey} forwardChange={handleChange} />
                    </div>
                )
            })}
        </Container>
    );
};

export default Instance;

const Container = styledComponents.div`

`