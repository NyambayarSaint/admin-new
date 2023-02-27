import React from 'react';
import styledComponents from 'styled-components';
import { getBuilderContext } from '../../contexts/builder';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai'
import { BiCodeAlt } from 'react-icons/bi'
import { getReferenceContext } from '../../contexts/reference';

const AddElements = () => {
    const { elements } = React.useContext(getBuilderContext)
    const { Indicator, lastAddElement, lastPointer } = React.useContext(getReferenceContext)
    const [activeType, setActiveType] = React.useState('')
    const handleDragStart = (e, component) => {
        e.stopPropagation()
        e.dataTransfer.effectAllowed = "copy"
        lastAddElement.current = component
        lastPointer.current = null
        // const img = new Image()
        // img.src = "https://image.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg"
        // e.dataTransfer.setDragImage(img, 0, 0)
    }
    const handleDragEnd = (e) => {
        e.preventDefault()
        e.stopPropagation()
        Indicator.current?.dispatchEvent(new CustomEvent('indicatorClear'))
        lastAddElement.current = null
    }
    return (
        <Container>
            {elements.map(section => (
                <div className='_type_wrapper' key={Math.random()}>
                    <div className='_caption' onClick={() => setActiveType(activeType === section.type ? '' : section.type)}>
                        {activeType === section.type ? <AiFillCaretDown /> : <AiFillCaretRight />}
                        <span>{section.type}</span>
                    </div>
                    {activeType === section.type && <div className='_component_wrap basics'>
                        {section.components?.map(component => (
                            <div className='_component' draggable onDrop={(e) => console.log(e, 'onDrop')} onDragStart={(e) => handleDragStart(e, component)} onDragEnd={handleDragEnd} key={Math.random()}>
                                <BiCodeAlt />
                                <span>{component?.name ?? component.component}</span>
                            </div>
                        ))}
                    </div>}
                </div>
            ))}
        </Container>
    );
};

export default AddElements;

const Container = styledComponents.div`
    ._type_wrapper{
        border-bottom:1px solid rgba(0,0,0,0.1);
        ._caption{
            font-weight:bold;
            display:flex;
            align-items:center;
            padding:12px 16px;
            cursor:pointer;
            svg{
                opacity:0.6;
                margin-right:4px;
            }
            &:hover{
                background:rgba(0,0,0,0.05);
            }
        }
        ._component_wrap{
            padding:16px;
            padding-left:34px;
        }
        ._component_wrap.basics{
            display:flex;
            gap:16px;
            flex-wrap:wrap;
            ._component{
                width:70px;
                height:70px;
                background:rgba(0,0,0,0.025);
                box-sizing:border-box;
                display:flex;
                justify-content:center;
                align-items:center;
                flex-direction:column;
                cursor:pointer;
                border:1px solid rgba(0,0,0,0.05);
                font-weight:500;
                span{
                    color:rgba(0,0,0,0.6);
                    font-size:12px;
                }
                svg{
                    font-size:24px;
                    margin-bottom:4px;
                    color:rgba(0,0,0,0.8);
                }
                &:hover{
                    box-shadow:rgb(0 0 0 / 15%) 0px 2px 4px 0px;
                }
            }
        }
    }
`