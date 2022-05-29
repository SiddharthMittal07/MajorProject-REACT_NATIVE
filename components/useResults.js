import { useState, useEffect } from 'react';
import { json } from 'd3';

export default function useResults() {
    const url = "https://gist.githubusercontent.com/SiddharthMittal07/3c7afd2a88faa690291f9474b60483b6/raw/f2977fdbd8bf4fbd78878e773582ef75f75340ac/major_project_algorithms.json";

    const [data, setData] = useState(null);

    useEffect(() => {
        json(url).then(setData);
    }, []);

    return data;
}