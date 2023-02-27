import React from 'react';
import styledComponents from 'styled-components';
import { TbTools, TbBrush, TbDatabase } from 'react-icons/tb'
import { FaRegComments } from 'react-icons/fa'
import { FaWalking } from 'react-icons/fa'
import { BsMouse2Fill } from 'react-icons/bs'
import * as UtilityComponents from './components'
import { getBuilderContext } from '../contexts/builder';
import { AiOutlineClose } from 'react-icons/ai'

const availableUtilities = [
    { name: 'Component options', component: 'Options', icon: <TbTools /> },
    { name: 'Style', component: 'Style', icon: <TbBrush /> },
    { name: 'Animations', component: 'Animations', icon: <FaWalking /> },
    { name: 'Data sources', component: 'Data', icon: <TbDatabase /> },
    { name: 'Comments', component: 'Comments', icon: <FaRegComments /> }
]

const UtilityBar = () => {
    const { utility, selectedComponent, selectComponent, setContext } = React.useContext(getBuilderContext)
    const UtilityComponent = UtilityComponents[utility]
    const [show, setShow] = React.useState(false)
    React.useEffect(() => {
        if (selectedComponent) setShow(true)
        else setShow(false)
    }, [selectedComponent])
    return (
        <Container show={show}>
            <HeadSection>
                {availableUtilities.map(instance =>
                    <div
                        onClick={() => setContext({ utility: instance.component })}
                        className={utility === instance.component ? 'active' : ''}
                        key={instance.name}
                        title={instance.name}
                    >
                        {instance.icon}
                    </div>
                )}
            </HeadSection>
            <MainWrapper>
                {utility && selectedComponent
                    ?
                    <UtilityComponent />
                    :
                    <Placeholder>
                        <p>Select an element to edit</p>
                        <BsMouse2Fill />
                    </Placeholder>
                }
            </MainWrapper>
            <BottomWrapper onClick={()=>selectComponent(null)}>
                <AiOutlineClose/>
                <span>Close</span>
            </BottomWrapper>
        </Container>
    );
};

export default UtilityBar;

const Container = styledComponents.div`
    position:absolute;
    min-width:300px;
    max-width:300px;
    display:flex;
    flex-direction:column;
    background:white;
    height:calc(100% - 50px);
    opacity:1;
    transition:0.3s ease;
    right:-300px;
    ${({ show }) => show && `right:0px`};
    &:hover{
        opacity:1;
    }
`

const HeadSection = styledComponents.div`
    display:flex;
    background:rgba(0,0,0,0.05);
    box-shadow:rgb(0 0 0 / 25%) 0px 2px 4px 0px;
    div{
        flex:1;
        font-size:20px;
        padding:8px 0px;
        display:flex;
        justify-content:center;
        align-items:center;
        &.active{
            border-bottom:2px solid rgb(56, 152, 236);
            color:rgb(56, 152, 236);
        }
        &:hover{
            cursor:pointer;
            color:rgb(56, 152, 236);
        }
    }
`

const MainWrapper = styledComponents.div`
    padding:15px;
    overflow-y:scroll;
    overflow-x:visible;
`

const Placeholder = styledComponents.div`
    margin-top:50px;
    text-align:center;
    font-weight:500;
    opacity:0.5;
    svg{
        margin-top:10px;
        font-size:50px;
    }
`
const BottomWrapper = styledComponents.div`
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:600;
    gap:4px;
    padding:15px;
    border-top:1px solid rgba(0,0,0,0.1);
    margin-top:auto;
    color:red;
    cursor:pointer;
    &:hover{
        background:rgba(255,0,0,0.08);
    }
    svg{
        font-size:20px;
    }
`