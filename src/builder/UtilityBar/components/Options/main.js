import React from 'react';
import styledComponents from 'styled-components';
import { getBuilderContext } from '../../../contexts/builder';
import * as OptionComponents from '.'

const Options = () => {

    const { selectedComponent, editComponent } = React.useContext(getBuilderContext)
    const { options } = selectedComponent

    const handleChange = (key, value) => {
        const changedOptions = { ...options }
        changedOptions[key].value = value
        editComponent({ ...selectedComponent, options: changedOptions }, selectedComponent.indices)
    }
    return (
        <Container>
            {Object.keys(options).map(optionKey => {
                const isArray = Array.isArray(options[optionKey])
                const OptionType = isArray ? OptionComponents.collection : OptionComponents[options[optionKey].type]
                return (
                    <div className='option_instance' key={selectedComponent.indices + optionKey}>
                        <div className='caption'>{optionKey}</div>
                        <OptionType object={options[optionKey]} forwardKey={optionKey} forwardChange={handleChange} />
                    </div>
                )
            })}
        </Container>
    );
};

export default Options;

const Container = styledComponents.div`
    .option_instance{
        margin:15px 0px;
        .caption{
            font-size:12px;
            font-weight:500;
            opacity:0.5;
            margin-bottom:10px;
            text-transform:capitalize;
        }
    }
`