import React from 'react';
import styled from 'styled-components';
import * as InputTypes from './InputTypes'

const Form = ({ instance: firstInstance, model, styles, listenChange, forwardRef, api, ...props }) => {
    const [instance, setInstance] = React.useState(firstInstance)
    React.useEffect(() => {
        listenChange && listenChange(instance)
    }, [instance])
    React.useEffect(() => {
        setInstance(firstInstance)
    }, [firstInstance])
    return (
        <Container ref={forwardRef} styles={styles} {...props}>
            {Object.keys(model).map(field => {
                if (field === 'id') return null
                const object = model[field]
                const InputType = InputTypes[object.interfaceType]
                if (!InputType) return null
                return (
                    <div key={field}>
                        <label>{object.fieldName}</label>
                        <InputType
                            api={api}
                            instance={instance}
                            required={object.required}
                            value={instance[field]}
                            onChangeClean={value => setInstance({ ...instance, [field]: value })}
                        />
                    </div>
                )
            })}
            <button style={{ position: 'absolute', opacity: 0, zIndex: -10, display: 'none' }} className='submit'>.</button>
        </Container>
    );
};

export default Form;

const Container = styled.form`${({ styles }) => styles};`