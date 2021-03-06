import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageArea } from './styled';
import useAPI from '../../helpers/OlxAPI';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents";


const Page = () => {
    const {id} = useParams();
    const api = useAPI();
    const fileField = useRef();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice]= useState('');
    const [priceNegotiable, setPriceNegotiable]= useState(false);
    const [desc, setDesc]= useState('');
    const [status, setStatus] = useState(false);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const [adInfo, setAdInfo] = useState( {} );

    
    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats)
        }
        getCategories();
    }, []);

    useEffect(()=>{
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
        }
        getAdInfo(id);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];
        
        console.log(adInfo.category._id)

        if(errors.length === 0) {
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('cat', category);
            fData.append('status', !status);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);

            if(fileField.current.files.length > 0) {
                for(let i=0;i<fileField.current.files.length;i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }
            
            const json = await api.updateAd(fData, id);

            if(!json.error) {
                navigate(`/minha-conta`);
                return;
            } else {
                setError(json.error);
            }

        } else {
            setError(errors.join("\n"));
        }

        setDisabled(false);
        
    }

    const priceMask = createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    })

    return (
        <PageContainer>
            <PageTitle>Atualizar an??ncio</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">Titulo</div>
                        
                        <div className="area-input">
                            <input type="text" 
                            disabled={disabled}
                            value={title}
                            onChange={e=>setTitle(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Categoria</div>
                        <div className="area-input">
                            <select
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)}                           
                                >
                                    <option></option>
                                    {categories && categories.map(i=>
                                            <option key={i._id} value={i._id}>{i.name}</option>
                                    )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Pre??o</div>
                        <div className="area-input">
                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Pre??o Negoci??vel</div>
                        <div className="area-check">
                            <input 
                            type="checkbox"
                            disabled={disabled}
                            checked={priceNegotiable}
                            onChange={e=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Descri????o</div>
                        <div className="area-input">
                            <textarea
                                disabled={disabled}
                                value={desc}
                                onChange={e=>setDesc(e.target.value)}
                            ></textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Imagens (1 ou mais)</div>
                        <div className="area-input">
                            <input 
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Desativar an??ncio</div>
                        <div className="area-check">
                            <input 
                            type="checkbox"
                            disabled={disabled}
                            checked={status}
                            onChange={e=>setStatus(!status)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Atualizar an??ncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;