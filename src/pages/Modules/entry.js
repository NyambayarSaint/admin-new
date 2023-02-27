import React from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Req from 'utils/Req';

const ModuleEntry = () => {

    const { module } = useParams()
    const [metaData, setMetaData] = React.useState(null)
    const resolveDefault = (attributes) => Object.keys(attributes).find(key => attributes[key].interfaceDefault)

    React.useEffect(() => {
        fetchApi()
    }, [module])

    const fetchApi = async () => {
        const res = await Req('get', { url: `/__interface?api=${module}` })
        setMetaData({ ...res.data, defaultAttr: resolveDefault(res.data.attributes) })
    }

    if (metaData) return <Outlet context={{ ...metaData }} />

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