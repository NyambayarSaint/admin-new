import PageBuilder from 'builder';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import 'assets/quill.css'
import 'assets/builder.css'

const BuilderEntry = () => {
    const [searchParams] = useSearchParams()
    const api = searchParams.get('api')
    const slug = searchParams.get('slug')
    return <PageBuilder api={api} slug={slug} />
};

export default BuilderEntry;