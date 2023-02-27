import React from 'react';
import styledComponents from 'styled-components';
import { getBuilderContext } from '../contexts/builder';
import { getReferenceContext } from '../contexts/reference';
import Gadgets from '../Gadgets'
import RenderBuilderComposition from './RenderBuilderComposition';
import dragImageSrc from './dragImage.png'

const Main = () => {

    const {
        viewPort,
        composition: CompositionData,
        moveComponent,
        selectComponent,
        addComponent,
        setContext
    } = React.useContext(getBuilderContext)

    const {
        Canvas: CanvasRef,
        Highlight: HighlightRef,
        Indicator: IndicatorRef,
        lastPointer,
        lastAddElement
    } = React.useContext(getReferenceContext)

    const dragImage = React.useRef()

    const compSelector = '[kind="component"]'

    const handleCanvasMouseOver = (e) => {
        if (e.target === CanvasRef.current) return HighlightRef.current.dispatchEvent(new CustomEvent('highlightClear', { bubbles: true }))
        HighlightRef.current.dispatchEvent(new CustomEvent('highlightDraw', {
            detail: {
                target: e.target,
                title: e.target.title
            }
        }))
    }
    const handleCanvasScroll = (e) => {
        console.log(e, 'wtf')
    }
    const handleCanvasMouseOut = () => {
        HighlightRef.current.dispatchEvent(new CustomEvent('highlightClear', { bubbles: true }))
    }
    const handleCanvasDrop = (e) => {
        e.preventDefault()
        if (!CompositionData.length) setContext({ composition: [lastAddElement.current] })
    }
    const handleCanvasDragOver = (e) => {
        if (e.dataTransfer.effectAllowed === "copy") e.preventDefault()
    }
    const handleCanvasDragEnter = (e) => {
        e.stopPropagation()
        const allowedOperation = e.dataTransfer.effectAllowed
        if (allowedOperation === "copy") setContext({ expansion: null })
    }
    const handleCanvasClick = (e) => {
        e.preventDefault()
        if (e.target === CanvasRef.current) {
            setContext({ selectedComponent: null })
        }
    }
    React.useEffect(() => {

        //CREATING DRAG IMAGE AFTER RENDER
        const img = document.createElement('img')
        img.src = dragImageSrc.src
        dragImage.current = img

    }, [])
    React.useEffect(() => {
        initDragEvents()
        return function cleanup() {
            cleanupDragEvents()
        }
        // eslint-disable-next-line
    }, [CompositionData])
    const cleanupDragEvents = () => {
        const mainComponents = [...document.querySelectorAll(compSelector)]
        mainComponents.forEach(component => {
            component.removeEventListener('dragstart', handleDragStart)
            component.removeEventListener('dragenter', handleDragEnter)
            component.removeEventListener('dragover', handleDragOver)
            component.removeEventListener('drop', handleDrop)
            component.removeEventListener('dragend', handleDragEnd)
            component.removeEventListener('click', handleClick)
        })
    }
    const initDragEvents = () => {
        const mainComponents = [...document.querySelectorAll(compSelector)]
        mainComponents.forEach(component => {
            // component.addEventListener('drag', handleDrag)
            component.addEventListener('dragstart', handleDragStart)
            // component.addEventListener('dragleave', handleDragLeave)
            component.addEventListener('dragenter', handleDragEnter)
            component.addEventListener('dragover', handleDragOver)
            component.addEventListener('drop', handleDrop)
            component.addEventListener('dragend', handleDragEnd)
            component.addEventListener('click', handleClick)
        })
    }
    const handleDragStart = (e) => {

        e.stopPropagation()

        const kind = e.target.getAttribute('kind')
        if (kind !== "component") e.preventDefault()

        // ENCAPSULATE OUTER MOST ELEMENT OF DRAG EVENT TO PREVENT MOVING INSIDE ITS CHILDREN
        e.target.classList.add('dragging')
        const descendants = [...e.target.querySelectorAll("*")]
        descendants.map(descendant => descendant.classList.add('dragging'))

        e.dataTransfer.setDragImage(dragImage.current, 10, 10)

        const { track } = e.target.dataset
        e.dataTransfer.setData('text/track', track)
        e.dataTransfer.effectAllowed = "move"

        lastPointer.current = null

    }
    const handleDragEnter = (e) => {
        e.stopPropagation()
        const allowedOperation = e.dataTransfer.effectAllowed
        if (allowedOperation === "copy") setContext({ expansion: null })
    }
    const handleDragEnd = (e) => {

        e.preventDefault()
        e.stopPropagation()

        //DECAPSULATE OUTER MOST ELEMENT
        e.target.classList.remove('dragging')
        const descendants = [...e.target.querySelectorAll("*")]
        descendants.map(descendant => descendant.classList.remove('dragging'))

        IndicatorRef.current?.dispatchEvent(new CustomEvent('indicatorClear'))

    }
    const handleDragOver = (e) => {
        const allowedOperation = e.dataTransfer.effectAllowed
        if (allowedOperation === "move" || allowedOperation === "copy") {
            e.preventDefault()
            IndicatorRef.current.dispatchEvent(new CustomEvent('indicatorDraw', { detail: { dragOverEvent: e } }))
        }
    }
    const handleDrop = (e) => {

        e.preventDefault()
        e.stopPropagation()

        const allowedOperation = e.dataTransfer.effectAllowed
        const source = e.dataTransfer.getData('text/track')
        const { track } = e.target.dataset
        if (allowedOperation === "move") moveComponent(source, track, lastPointer.current)
        if (allowedOperation === "copy") addComponent(lastAddElement.current, track, lastPointer.current)

        IndicatorRef.current?.dispatchEvent(new CustomEvent('indicatorClear')) //This line is added cuz AddElement had no pointing event
    }
    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        selectComponent(e.target.dataset.track)
    }
    return (
        <Container>
            <CompositionCanvas
                id="composition"
                ref={CanvasRef}
                viewPort={viewPort}
                onDrop={handleCanvasDrop}
                onDragOver={handleCanvasDragOver}
                onDragEnter={handleCanvasDragEnter}
                onMouseOver={handleCanvasMouseOver}
                onMouseOut={handleCanvasMouseOut}
                onClick={handleCanvasClick}
                onScroll={handleCanvasScroll}
            >
                <RenderBuilderComposition data={CompositionData} />
            </CompositionCanvas>
            <Gadgets />
        </Container>
    );
};

export default Main;

const Container = styledComponents.div`
    flex:1;
    display:flex;
    justify-content:center;
    // padding:15px;
    background:rgba(0,0,0,0.1);
`
const CompositionCanvas = styledComponents.div`
    width:100%;
    background:white;
    position:relative;
    box-shadow:rgb(0 0 0 / 25%) 0px 2px 4px 0px;
    overflow-y:scroll;

    [kind="component"] > * {
        pointer-events:none;
    }
    [draggable]{
        pointer-events:auto;
    }

    &::-webkit-scrollbar {
        width: 3px;
        border-radius:4px;
    }
    &::-webkit-scrollbar-track {
    }
       
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.6);
        border-radius:4px;
        &:hover{
            background-color: rgba(0,0,0,1);
        }
    }
    ${({ viewPort }) => viewPort === "tablet" && `
        // height:800px;
        width:768px;
    `};
    ${({ viewPort }) => viewPort === "mobile" && `
        // height:800px;
        width:400px;
    `};
`