import React from 'react';
import styledComponents from 'styled-components';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai'
import * as TabComponents from '.'

const tabSections = ['CssProperties', 'Layout']

const Style = () => {
    const handleToggle = (e) => {
        e.preventDefault()
        const parent = e.target.parentElement
        if (parent.classList.contains('active')) parent.classList.remove('active')
        else parent.classList.add('active')
    }
    return (
        <Container>
            {tabSections.map(x => {
                const TabComp = TabComponents[x]
                return (
                    <div className={`_tab_section active`} key={x}>
                        <div className='__ctrl_wrap' onClick={handleToggle}>
                            <AiFillCaretRight /><AiFillCaretDown open /><span>{x}</span>
                        </div>
                        <div className='__tab_component_wrap'><TabComp /></div>
                    </div>
                )
            })}
        </Container>
    );
};

export default Style;

const Container = styledComponents.div`
    ._tab_section{
        .__ctrl_wrap{
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding:10px;
            display:flex;
            align-items:center;
            cursor:pointer;
            span{
                font-weight:500;
                pointer-events:none;
            }
            svg{
                display:block;
                margin-right:6px;
                pointer-events:none;
                opacity:0.5;
            }
            svg[open]{
                display:none;
            }
        }
        .__tab_component_wrap{
            display:none;
            padding:10px;
        }
        &.active{
            .__ctrl_wrap{
                svg{
                    display:none;
                }
                svg[open]{
                    display:block;
                }
            }
            .__tab_component_wrap{
                display:block;
            }
        }
    }
`