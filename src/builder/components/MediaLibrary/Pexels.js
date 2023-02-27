import axios from 'axios';
import React from 'react';
import styledComponents from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Player } from 'video-react';

const Pexels = ({ kind, searchVal, perPage, setPerPage, perPageIncrementor, watchRequest, setWatchRequest, onMediaSelect }) => {
    const resolveUrl = () => {
        const base = 'https://api.pexels.com'
        let url = ''
        if (kind === 'photo') {
            if (searchVal) url = base + '/v1/search?query=' + searchVal + '&'
            else url = base + '/v1/curated?'
        } else {
            if (searchVal) url = base + '/videos/search?query=' + searchVal + '&'
            else url = base + '/videos/popular?'
        }
        url = url + 'per_page=' + perPage
        return url
    }

    const [entries, setEntries] = React.useState([])

    React.useEffect(() => {
        fetchImages()
        // eslint-disable-next-line
    }, [watchRequest])

    const fetchImages = async () => {
        try {
            setEntries([])
            const config = { url: resolveUrl(), method: 'get', headers: { 'Authorization': '563492ad6f91700001000001e555f8233a7245d59bc1d48f59e167fc' } }
            const { data } = await axios(config)
            setEntries(kind === 'photo' ? data.photos : data.videos)
            console.log(kind === 'photo' ? data.photos : data.videos)
        } catch (e) {

        }

    }
    return (
        <Container rel="pb" className={`main_wrap_${kind}`}>
            {entries.length ?
                entries.map(entry => (
                    kind === 'photo'
                        ?
                        <img className='instances' onClick={()=>onMediaSelect(entry.src.large)} key={entry.id} alt={entry.alt} src={entry.src.portrait} />
                        :
                        <div className='instances' key={entry.id}>
                            <Player
                                width={entry.video_files[entry.video_files.length - 1].width}
                                height={entry.video_files[entry.video_files.length - 1].height}
                                className='instances'
                                poster={entry.image}
                                src={entry.video_files.find(x => x.quality === 'sd').link}
                                playsInline />
                        </div>
                ))
                :
                <Skeleton count={8} />
            }
            <div className='button_wrap'><button onClick={() => { setPerPage(perPage + perPageIncrementor); setWatchRequest(watchRequest + 1) }}>Load more</button></div>
        </Container>
    );
};

export default Pexels;

const Container = styledComponents.div`
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    max-height:60vh;
    height:60vh;
    overflow:hidden;
    overflow-y:scroll;
    padding-right:10px;
    .button_wrap{
        flex:1;
        min-width:100%;
        padding:15px;
        text-align:center;
        button{
            background:rgba(26,115,232,1);
            color:white;
            padding:12px 30px;
        }
    }
    span[aria-live="polite"]{
        display:flex;
        flex-wrap:wrap;
        span{
            display:block;
            object-fit:cover;
            border-radius:4px;
            box-sizing:border-box;
            margin:5px;
            width:284px;
        }
    }
    &.main_wrap_photo{
        .instances{
            flex:1;
            min-width:286px;
            object-fit:cover;
            border-radius:4px;
            height:350px;
            min-height:350px;
            transition:0.3s ease;
            box-sizing:border-box;
            &:hover{
                cursor:pointer;
                border:1px solid rgba(0,0,0,0.2);
            }
        }
        span[aria-live="polite"]{
            span{
                flex:1;
                min-width:286px;
                height:350px;
                min-height:350px;
            }
        }
    }
    &.main_wrap_video{
        .instances{
            flex:1;
            min-width:286px;
            max-height:286px;
            overflow:hidden;
            display:flex;
            justify-content:center;
            align-items:center;
            background:black;
            border-radius:4px;
        }
        span[aria-live="polite"]{
            span{
                flex:1;
                min-width:286px;
                height:192px;
                max-height:286px;
            }
        }
    }
`