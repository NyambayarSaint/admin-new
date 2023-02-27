import React from 'react';
import styledComponents from 'styled-components';
import camelCase from 'camelcase';
import { kebabize } from '../../../contexts/miscs';
import CssPropertyInstance from './CssPropertyInstance';
import { getBuilderContext } from '../../../contexts/builder';
import { getReferenceContext } from '../../../contexts/reference';

const CssProperties = () => {

    const { selectedComponent, editComponent, elements } = React.useContext(getBuilderContext)
    const { lastFocusedStyleProperty } = React.useContext(getReferenceContext)
    const [cssObject, setCssObject] = React.useState({})
    const [defaultStyles, setDefaultStyles] = React.useState({})

    React.useEffect(() => {
        const camelToKebab = {}
        const getDefaultStyles = elements.find(el => el.type === selectedComponent.type).components.find(c => c.component === selectedComponent.component).style
        Object.keys(selectedComponent.style).forEach(property => {
            camelToKebab[kebabize(property)] = selectedComponent.style[property]
        })
        setCssObject(camelToKebab)
        setDefaultStyles(getDefaultStyles)
        // eslint-disable-next-line
    }, [selectedComponent])

    const onChange = (key, value, initialProperty) => {
        const copiedObject = { ...cssObject }
        if (initialProperty) delete copiedObject[initialProperty] // If changed existing value, delete the initial one
        copiedObject[key] = value
        const camelCasedObject = {}
        Object.keys(copiedObject).forEach(keyInstance => {
            camelCasedObject[camelCase(keyInstance)] = copiedObject[keyInstance]
        })
        delete camelCasedObject.new
        editComponent({ ...selectedComponent, style: camelCasedObject }, selectedComponent.indices)
    }
    const onDelete = (initialProperty) => {
        const copiedObject = { ...cssObject }
        if (!initialProperty) {
            delete copiedObject.new
            setCssObject(copiedObject)
        } else {
            delete copiedObject[initialProperty]
            const camelCasedObject = {}
            Object.keys(copiedObject).forEach(keyInstance => {
                camelCasedObject[camelCase(keyInstance)] = copiedObject[keyInstance]
            })
            delete camelCasedObject.new
            editComponent({ ...selectedComponent, style: camelCasedObject }, selectedComponent.indices)
        }
    }
    const handleAddNew = () => {
        const copiedObject = { ...cssObject, new: "" }
        setCssObject(copiedObject)
    }
    return (
        <Container>
            {Object.keys(cssObject).map((property, ind) => (
                <CssPropertyInstance
                    key={selectedComponent.indices + property + ind + cssObject[property]}
                    forwardKey={selectedComponent.indices + property}
                    property={property}
                    cssObject={cssObject}
                    onChange={onChange}
                    isNewProperty={property === "new"}
                    isDefault={defaultStyles[property] ? true : false}
                    setLastFocus={lastFocusedStyleProperty}
                    directFocus={lastFocusedStyleProperty?.current === property}
                    onDelete={onDelete}
                />
            ))}
            <button className='_add_new' onClick={handleAddNew}>+ New</button>
        </Container>
    );
};

export default CssProperties;

const Container = styledComponents.div`
    ._css_property_instance{
        display:flex;
        align-items:center;
        margin:10px 0px;
        position:relative;
        font-size:12px;
        input{
            border:none;
            outline:none;
            flex:1;
            &[kind="key"]{
                margin-right:10px;
                max-width:94px;
                box-sizing:border-box;
                cursor:default;
            }
        }
        svg{
            font-size:16px;
            cursor:pointer;
            margin-left:4px;
            &.delete_mark{
                color:rgba(255,0,0,0.9);
            }
            &.question_mark{
                opacity:0.2;
                &:hover{
                    opacity:0.6;
                }
            }
        }
        .wrong_style_value{
            width:100%;
            height:2px;
            background:rgba(255,0,0,0.4);
            position:absolute;
            left:0px;
            right:0px;
            bottom:-4px;
        }
        .__property_suggestion_wrap{
            position:absolute;
            z-index:1;
            max-height:150px;
            overflow:hidden;
            overflow-y:scroll;
            top:100%;
            background:white;
            box-shadow:rgb(0 0 0 / 25%) 0px 2px 4px 0px;
            margin-top:10px;
            border:1px solid rgba(0,0,0,0.1);

            &::-webkit-scrollbar {
                width: 6px;
                border-radius:4px;
            }
            &::-webkit-scrollbar-track {
            }
               
            &::-webkit-scrollbar-thumb {
                background-color: rgba(0,0,0,0.6);
                border-radius:16px;
                &:hover{
                    background-color: rgba(0,0,0,1);
                }
            }
            span{
                display:block;
                padding:5px 10px;                
                cursor:pointer;
                &:hover{
                    color:white;
                    background:rgb(56, 152, 236);
                }
                &:focus{
                    color:white;
                    background:rgb(56, 152, 236);
                }
                &[open]{
                    background:rgba(0,0,0,0.6);
                    color:white;
                }
            }
        }
        &.active{
            input{
                &[kind="key"]{
                    border-bottom:2px solid rgba(56, 152, 236, 0.6);
                }
                &[kind="value"]{
                    &:focus{
                        border-bottom:2px solid rgba(56, 152, 236, 0.6);
                    }
                }
            }
        }
    }
    ._add_new{
        border:none;
        background:none;
        font-size:12px;
        font-weight:600;
        color:rgba(56, 152, 236, 1);
        padding:4px 16px;
        border-radius:4px;
        &:hover{
            background:rgba(56, 152, 236, 0.15);
        }
    }
`