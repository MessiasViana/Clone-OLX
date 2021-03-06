import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageArea } from './styled';
import useAPI from '../../helpers/OlxAPI';


import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem";

let timer;

const Page = () => {
    const api = useAPI();
    const navigate = useNavigate();

    const useQueryString = () => {
        return new URLSearchParams( useLocation().search);
    }
    const query = useQueryString();

    const [q, setQ] = useState( query.get('q') != null ? query.get('q') : '' );
    const [cat, setCat] = useState( query.get('cat') != null ? query.get('cat') : '');
    const [state, setState] = useState( query.get('state') != null ? query.get('state') : '');

    const [adsTotal, setAdsTotal] = useState(0);
    const [stateList, setStateList] = useState( [] );
    const [categories, setCategories] = useState( [] );
    const [adList, setAdList] = useState( [] );

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    
    

    const [resultOpacity, setResultOpacity] = useState(0.3);
    const [loading, setLoading] = useState(true);

    const getAdsList = async () => {
        setLoading(true);
        let offset = (currentPage-1) * 9;

        const json = await api.getAds({
            sort:'desc',
            limit:9,
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }
    
    useEffect(()=>{
        if(adList.length > 0) {
            setPageCount( Math.ceil( adsTotal / adList.length ) );
        } else {
            setPageCount( 0 );
        }

    }, [adsTotal]);

    useEffect(()=>{
        setResultOpacity(0.3);
        getAdsList();
    }, [currentPage])

    useEffect(()=>{
        let queryString = [];

        if(q) {
            queryString.push(`q=${q}`)
        }
        if(cat) {
            queryString.push(`cat=${cat}`)
        }
        if(state) {
            queryString.push(`state=${state}`)
        }

        navigate({
            search:`?${queryString.join('&')}`
        });

        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 1000);
        setResultOpacity(0.3);
        setCurrentPage(1);
    }, [q, cat, state])

    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    let pagination = [];
    for(let i=1;i<=pageCount;i++) {
        pagination.push(i)
    }
    const renderPageNumbers = (i, k) => {
        if(i < maxPageNumberLimit+1 && i>minPageNumberLimit) {
            return(   
                <div 
                    onClick={()=>setCurrentPage(i)}
                    id={i}
                    className={i===currentPage?'pagItem active':'pagItem'}
                    key={k}
                >{i}</div>
            )
        } else {
            return null;
        }
    }
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if(currentPage+1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }
    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
    
        if((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }
    const handleNextFive = () => {
        setCurrentPage(currentPage + 5);
        if(currentPage+5 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }
    // const handlePrevFive = () => {
    //     setCurrentPage(currentPage - 5);
    
    //     if((currentPage - 6) % pageNumberLimit == 0) {
    //         setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    //         setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    //     }
    // }

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input 
                        type="text" 
                        name="q" 
                        placeholder="O que voc?? procura?"
                        value={q}
                        onChange={e=>setQ(e.target.value)}
                        />

                        <div className="filterName">Estado:</div>
                        <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                            <option></option>
                            {stateList.map((i,k)=>
                                <option key={k} value={i.name}>{i.name}</option>
                            )}
                        </select>

                        <div className="filterName">Categoria:</div>
                        <ul>
                                {categories.map((i,k)=>
                                    <li key={k} 
                                    className={cat==i.slug?'categoryItem active':'categoryItem'}
                                    onClick={()=>setCat(i.slug)}
                                    >
                                        <img src={i.img} alt="" />
                                        <span>{i.name}</span>
                                    </li>
                                )}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultados</h2>

                    {loading && adList.length === 0 &&
                        <div className="listWarning">Carregando...</div>
                    }
                    {!loading && adList.length === 0 &&
                        <div className="listWarning">Nenhum resultado.</div>
                    }
                    <div className="list" style={{opacity:resultOpacity}}>
                       {adList.map((i,k)=>
                        <AdItem key={k} data={i}/>
                       )} 
                    </div>

                    <div className="pagination">
                        {currentPage >= 2 &&
                            <button onClick={handlePrev}>Anterior</button>
                        }
                        {/* {currentPage >= 6 &&
                            <button onClick={handlePrevFive}>...</button>
                        } */}
                        {pagination.map((i,k)=>
                            renderPageNumbers(i, k)
                        )}
                        {currentPage <= pageCount-5 &&
                            <button onClick={handleNextFive}>...</button>
                        }
                        {currentPage <= pageCount-1 &&
                            <button onClick={handleNext}>Pr??ximo</button>
                        }
                        
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );
}

export default Page;