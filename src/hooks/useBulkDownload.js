
import { useRef, useState, useEffect } from 'react';
import { bulkDownloads } from '../utils/downloads';


export const useBulkDownload = (downloads, refreshTime = 15) => {
    //use a ref for the data store so that it remains across re-renders
    const dataStore = useRef({});
    const [store, setStore] = useState(dataStore.current);

    //this save function updating the store state here causes a re-render
    const save = (key, value) => {
        dataStore.current = { ...dataStore.current, [key]: value };
        setStore(
            dataStore.current
        );
    }


    useEffect(() => {
        bulkDownloads(
            downloads, save)

        return () => {
            setStore(dataStore.current);
        }
    }, []);

    return { store };
}