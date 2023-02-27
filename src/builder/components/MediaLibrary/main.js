import React from 'react';
import styledComponents from 'styled-components';
import { BsSearch } from 'react-icons/bs'
import * as TabComponents from '.'

const MediaLibrary = ({ kind, onMediaSelect }) => {
    const tabOptions = [
        { label: `Free stock ${kind}s`, component: 'Pexels' },
        { label: `Your ${kind}s`, component: 'Recents' },
        { label: 'Load from url', component: 'LoadFromUrl' },
    ]
    const [searchVal, setSearchVal] = React.useState('')
    const [watchRequest, setWatchRequest] = React.useState(1)
    const [perPage, setPerPage] = React.useState(50)
    const perPageIncrementor = 50
    const [selectedTab, setSelectedTab] = React.useState('Pexels')
    const SelectedComponent = TabComponents[selectedTab]
    const onKeyPress = (e) => e.key === "Enter" && setWatchRequest(watchRequest + 1)
    return (
        <Container>
            <div className='top_section'>
                <div className='left_wrap'>
                    <div className='search_wrap'>
                        <BsSearch onClick={() => setWatchRequest(watchRequest + 1)} />
                        <input value={searchVal} placeholder={`Search by pressing "Enter" key...`} onKeyPress={onKeyPress} onChange={(e) => setSearchVal(e.target.value)} rel="pb" />
                    </div>
                </div>
                <div className='right_wrap'>
                </div>
            </div>
            <div className='middle_section'>
                <button onClick={()=>setSelectedTab('Recents')}>Upload a {kind}</button>
            </div>
            <div className='bottom_section'>
                <div className='tab_section_wrap'>
                    {tabOptions.map(t => <div onClick={() => setSelectedTab(t.component)} key={t.label} className={`tab_button ${selectedTab === t.component}`}>{t.label}</div>)}
                </div>
                <div className='tab_component_wrap'>
                    <SelectedComponent
                        kind={kind}
                        searchVal={searchVal}
                        perPageIncrementor={perPageIncrementor}
                        perPage={perPage}
                        setPerPage={setPerPage}
                        watchRequest={watchRequest}
                        setWatchRequest={setWatchRequest}
                        onMediaSelect={onMediaSelect}
                    />
                </div>
            </div>
        </Container>
    );
};

export default MediaLibrary;

const Container = styledComponents.div`
    transition:0.5s ease;
    .top_section{
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:30px;
        gap:30px;
        .left_wrap{
            flex:1;
            .search_wrap{
                input{
                    width:calc(100% - 30px);
                    box-shadow:none;
                    border:none;
                }
                svg{
                    margin-right:10px;
                    cursor:pointer;
                    transition:0.3s ease;
                    &:hover{
                        transform:scale(1.1);
                    }
                }
            }
        }
        .right_wrap{
            .close_icon{
                svg{
                    font-size:20px;
                    cursor:pointer;
                }
            }
        }
    }
    .middle_section{
        padding:30px;
        background:rgba(0,0,0,0.1);
        text-align:center;
        button{
            padding:12px 30px;
            background:rgba(26, 115, 232, 1);
            color:white;
        }
    }
    .bottom_section{
        margin-top:10px;
        .tab_section_wrap{
            display:flex;
            justify-content:center;
            align-items:center;
            margin-bottom:10px;
            .tab_button{
                text-transform:uppercase;
                padding:14px 32px;
                font-weight:500;
                cursor:pointer;
                &.true{
                    color:rgba(26, 115, 232, 1);
                }
            }
        }
    }
`