
import { useRef, useState, useEffect } from 'react';
import { bulkDownloads } from '../utils/downloads';


//TODO: Make this handle multiple renders without restarting
export const useBulkDownload = (downloads, refreshTime = 15) => {

    const controller = new AbortController();
    const signal = controller.signal;

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
        bulkDownloads(downloads, save, signal);

        return () => {
            controller.abort("unmounted component");
            setStore(dataStore.current);
            dataStore.current = {};
        }
    }, []);

    return { store };
}