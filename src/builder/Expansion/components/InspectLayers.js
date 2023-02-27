import React from 'react';
import styledComponents from 'styled-components';
import { getBuilderContext } from '../../contexts/builder';
import { BsBox, BsFillCaretDownFill, BsFillCaretRightFill, BsDownload, BsTrash } from 'react-icons/bs'
import { getReferenceContext } from '../../contexts/reference';

const InpsectLayers = () => {
    const { composition, selectComponent, deleteComponent, selectedComponent, saveTemplate } = React.useContext(getBuilderContext)
    const { Highlight, ScreenLoader } = React.useContext(getReferenceContext)
    React.useEffect(() => {
    }, [])
    const handleInspectClick = (e) => {
        const { track } = e.target.parentElement.dataset
        selectComponent(track)
    }
    const handleDelete = (e) => {
        const { track } = e.currentTarget.parentElement.parentElement.dataset
        selectComponent(null)
        deleteComponent(track)
    }
    const handleSaveTemplate = async () => {
        const name = window.prompt('Name the template')
        if (!name) return null

        ScreenLoader.current.dispatchEvent(new CustomEvent('lockScreen'));
        await saveTemplate({ ...selectedComponent, name })
        ScreenLoader.current.dispatchEvent(new CustomEvent('unlockScreen'));
    }
    const StackLayers = ({ index, component, depth, track, children, appendable, ...props }) => {

        const indexToAssign = index
        if (!track) track = '' + index + ''
        else track = track + '-' + index
        depth = typeof depth === "number" ? depth + 1 : 0
        const hasChildren = children && children.length

        return (
            <LayerWrap
                key={track + -'inspect'}
                data-index={indexToAssign}
                data-track={track}
                data-depth={depth}
                data-appendable={appendable ? true : ''}
                draggable={true}
                title={component}
                depthMeasure={depth}
                kind="inspect"
            >
                <span onClick={handleInspectClick}>
                    {hasChildren ?
                        <>
                            <BsFillCaretRightFill onClick={toggleHandler} className='__icon_caret collapsed' />
                            <BsFillCaretDownFill onClick={toggleHandler} className='__icon_caret expanded' />
                        </>
                        : null}
                    <BsBox className='__icon_box' />
                    <p>{component}</p>
                    <BsDownload onClick={handleSaveTemplate} title='Save as template' className='__icon_save' />
                    <BsTrash onClick={handleDelete} title='Delete component' className='__icon_delete' />
                </span>
                {hasChildren ? children.map((child, index) => {
                    return (
                        StackLayers({ ...child, track, depth, index })
                    )
                }) : ''}
            </LayerWrap>
        )
    }
    const toggleHandler = (e) => {
        e.stopPropagation()
        const parent = e.target.parentElement.parentElement
        if (parent.classList.contains('collapsed')) {
            parent.classList.remove('collapsed')
        } else {
            parent.classList.add('collapsed')
        }
    }
    const handleMouseOver = (e) => {
        const target = e.target.nodeName === "SPAN" ? e.target.parentElement : e.target
        const { track } = target.dataset
        const forwardingElement = document.querySelector('[kind="component"][data-track="' + track + '"]')
        if (forwardingElement) {
            Highlight.current.dispatchEvent(new CustomEvent('highlightDraw', {
                detail: {
                    target: forwardingElement,
                    title: forwardingElement.title
                }
            }))
        }
    }
    const handleMouseOut = () => {
        Highlight.current.dispatchEvent(new CustomEvent('highlightClear', { bubbles: true }))
    }
    return (
        <Container onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {composition.map((instance, index) => {
                return (
                    StackLayers({ ...instance, index, depth: 0 })
                )
            })}
        </Container>
    );
};

export default InpsectLayers;

const Container = styledComponents.div`
    border-top:1px solid rgba(0,0,0,0.1);
    div{
        padding-left:20px;
        &[data-depth="1"]{
            padding-left:0px;
        }
        span{
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding-top:10px;
            padding-bottom:10px;
            display:flex;
            align-items:center;
            padding-left:20px;
            position:relative;
            &:hover{
                cursor:pointer;
                background:rgba(0,0,0,0.05);
                .__icon_save{
                    opacity:1;
                    transform: translateX(0px);
                }
                .__icon_delete{
                    opacity:1;
                    transform: translateX(0px);
                }
            }
            .__icon_box{
                color:rgb(56, 152, 236);
                font-size:20px;
                pointer-events:none;
                margin-left:5px;
            }
            .__icon_save{
                margin-left:auto;
                transform:translateX(10px);
                opacity:0;
                transition:0.3s ease;
                color:rgb(56,152,236);
            }
            .__icon_delete{
                margin-left:5px;
                margin-right:5px;
                transform:translateX(10px);
                opacity:0;
                transition:0.3s ease;
                color:red;
            }
            .__icon_caret{
                font-size:22px;
                margin-left:-20px;
                color:rgba(0,0,0,0.6);
                position:absolute;
                border:4px solid transparent;
                &.collapsed{
                    display:none;
                }
            }
            p{
                margin:0px;
                margin-left:10px;
                font-weight:700;
                pointer-events:none;
            }
        }
    }
    div.collapsed{
        span{
            .__icon_caret{
                &.collapsed{
                    display:block;
                }
                &.expanded{
                    display:none;
                }
            }
        }
        div{
            display:none;
        }
    }
`
const LayerWrap = styledComponents.div`
    // margin-left:${({ depthMeasure }) => depthMeasure && `${depthMeasure + '' + 0}px`};
`