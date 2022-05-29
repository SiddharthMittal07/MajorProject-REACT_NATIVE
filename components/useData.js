import { useState, useEffect } from 'react';
import { json } from 'd3';

export default function useData() {
    const url = "https://gist.githubusercontent.com/SiddharthMittal07/554b26ec04129f393e2fc59c82c0f1d3/raw/871224e25d4eb30b19eb7c2a945f7db0af405787/major_project_define.json";

    const [data, setData] = useState(null);

    useEffect(() => {
        json(url).then(setData);
    }, []);

    return data;
}