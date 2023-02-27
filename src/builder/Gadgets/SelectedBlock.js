import React from 'react';
import styledComponents from 'styled-components';
import { FaRegSave, FaRegTrashAlt } from 'react-icons/fa'
import { getBuilderContext } from '../contexts/builder';
import { getNodeByIndices } from '../contexts/miscs';
import { getReferenceContext } from '../contexts/reference';
import axios from 'axios';

const SelectedBlock = () => {

    const itself = React.useRef()
    const wrapper = React.useRef()
    const { selectedComponent, deleteComponent, setContext, saveTemplate } = React.useContext(getBuilderContext)
    const { Canvas: CanvasRef, ScreenLoader } = React.useContext(getReferenceContext)

    React.useEffect(() => {

        if (!selectedComponent) return clear()

        draw(getNodeByIndices(selectedComponent.indices))
        CanvasRef.current.addEventListener('scroll', handleScroll)

        // eslint-disable-next-line
    }, [selectedComponent])

    const handleScroll = (e) => {
        e.preventDefault()
        const target = getNodeByIndices(selectedComponent.indices)
        if (selectedComponent) draw(target)
    }
    const draw = (targetNode) => {
        const { top, left, width, height } = targetNode.getBoundingClientRect()
        const staticWrapperWidth = 82 // For UX, it is defined static for now, cuz defining it by javascript, it would take uncalculated value 0 at first render.

        itself.current.style.top = top + 'px'
        itself.current.style.left = left + 'px'
        itself.current.style.width = width + 'px'
        itself.current.style.height = height + 'px'
        itself.current.style.display = "block"

        wrapper.current.style.top = top + height + 2 + 'px';
        wrapper.current.style.left = left + width - staticWrapperWidth + 'px';
        wrapper.current.style.display = "flex";
    }

    const clear = () => {
        itself.current.style.display = "none"
        wrapper.current.style.display = "none"
    }
    const handleSaveTemplate = async () => {

        const name = window.prompt('Name the template')
        if (!name) return null

        ScreenLoader.current.dispatchEvent(new CustomEvent('lockScreen'));
        await saveTemplate({ ...selectedComponent, name })
        ScreenLoader.current.dispatchEvent(new CustomEvent('unlockScreen'));
    }
    const handleDelete = () => {
        setContext({ selectedComponent: null })
        deleteComponent(selectedComponent.indices)
    }
    return (
        <>
            <Highlight ref={itself}></Highlight>
            <Wrapper ref={wrapper}>
                <div onClick={handleSaveTemplate} title="Save as 'Template' to reuse a design while still allowing editing"><FaRegSave /></div>
                <div onClick={handleDelete} title="Delete component and its children"><FaRegTrashAlt /></div>
            </Wrapper>
        </>
    );
};

export default SelectedBlock;

const Highlight = styledComponents.div`
    position:absolute;
    border:1px solid rgba(255,0,0,0.7);
    pointer-events:none;
    box-sizing:border-box;
    display:none;
`
const Wrapper = styledComponents.div`
    position:absolute;
    box-sizing:border-box;
    font-size:12px;
    display:block;
    background:rgb(56,152,236);
    color:white;
    font-weight:500;
    display:none;
    align-items:center;
    border-radius:4px;
    div{
        border-right:1px solid white;
        padding:2px 14px;
        cursor:pointer;
        svg{
            margin-top:2px;
        }
        &:last-child{
            border-right:none;
        }
    }
`