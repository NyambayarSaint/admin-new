import React from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Req from 'utils/Req';

const ModuleEntry = () => {

    const { module, id } = useParams()
    const [metaData, setMetaData] = React.useState(null)
    const [create, setCreate] = React.useState(false)
    const resolveDefault = (attributes) => Object.keys(attributes).find(key => attributes[key].interfaceDefault)

    React.useEffect(() => {
        fetchApi()
    }, [module, id])

    const fetchApi = async () => {
        if (id === 'new') setCreate(true)
        const res = await Req('get', { url: `/__interface?api=${module}` })
        setMetaData({ ...res.data, id, defaultAttr: resolveDefault(res.data.attributes) })
    }

    if (metaData) return <Outlet context={{ ...metaData, create }} />

};

export default ModuleEntry;

{/* <Outlet context={{
    ...metaData,
    model: metaData.name,
    id: instanceId,
    defaultInterface: resolveDefault(metaData.attributes),
    instance: instance,
    create, create
}} /> */}