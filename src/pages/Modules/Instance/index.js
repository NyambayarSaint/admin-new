import Div from 'components/Div';
import Form from 'components/Form';
import Relation from 'components/Relation';
import FormHeader from 'pages/Modules/Instance/FormHeader';
import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import Req from 'utils/Req';

const ModuleInstance = () => {

    const meta = useOutletContext()
    const [instance, setInstance] = React.useState(null)
    const firstInstane = React.useRef()
    const navigate = useNavigate()

    const _get = async () => {
        if (meta.create) return setInstance({})
        const { data: result } = await Req('get', { url: `/${meta.api}/${meta.id}` })
        if (!firstInstane.current) firstInstane.current = result
        setInstance(result)
    }
    const _update = async () => {
        await Req('put', { url: `/${meta.api}/${meta.id}`, body: instance, toast: true })
    }
    const _post = async () => {
        try {
            const result = await Req('post', { url: `/${meta.api}`, body: instance, toast: true })
            navigate(`/${meta.api}/${result.data.id}`, { replace: true })
        } catch (e) { }
    }
    const _delete = async () => {
        await Req('delete', { url: `/${meta.api}/${meta.id}` })
    }

    React.useEffect(() => {
        _get()
    }, [])

    React.useEffect(() => {
        console.log(instance, 'instance')
    }, [instance])

    return (
        <Container>
            <FormHeader {...meta}
                onSave={meta.create ? _post : _update}
                onDelete={_delete}
                onReset={() => setInstance(firstInstane.current)}
            />
            <Div c="wrap">
                {instance &&
                    <Form api={meta.api} styles={formStyle} model={meta.attributes} instance={instance} listenChange={setInstance} />
                }
                <Div>
                    {instance && <Relation {...meta} instance={instance} setInstance={setInstance} />}
                </Div>
            </Div>
        </Container>
    );
};

export default ModuleInstance;

const Container = styled.div`
    & > .wrap{
        padding-top:30px;
        margin-top:30px;
        border-top:1px solid rgba(0,0,0,0.1);
        display:flex;
        gap:30px;
        & > form{
            flex:70%;
            padding:30px;
            border:1px solid rgba(0,0,0,0.1);
            border-radius:15px;
        }
        & > div{
            flex:30%;
            padding:30px;
            border:1px solid rgba(0,0,0,0.1);
            border-radius:15px;
        }
    }
`
const formStyle = `
    display:flex;
    gap:30px;
    flex-wrap:wrap;
    & > div{
        flex:50%;
        min-width:calc(50% - 15px);
        max-width:calc(50% - 15px);
        & > * {
            &:first-child{
                display:block;
                margin-bottom:5px;
                opacity:0.6;
                text-transform:capitalize;
            }
            &:last-child{
                
            }
        }
    }
`
