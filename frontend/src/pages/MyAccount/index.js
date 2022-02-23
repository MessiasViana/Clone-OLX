import React, { useEffect, useState } from "react";
import { PageArea } from './styled';
import useAPI from "../../helpers/OlxAPI";


import { PageContainer, ErrorMessage } from "../../components/MainComponents";
import { OthersArea } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem";

const Page = () => {
    const api = useAPI();

    const [account, setAccount] = useState( {} );
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [stateLoc, setStateLoc] = useState('');
    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(()=>{
        const getAccountInfo = async () => {
            const json = await api.getUser();
            
            setAccount(json);
        }
        getAccountInfo();
    }, []);

    const updateSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await api.handleUser(name, email, password, stateLoc);

        if(json.error) {
            setError(json.error);
        } else {
            window.location.href = '/';
        }

        setDisabled(false);
    }

    return (

        <>
            <PageContainer>
                <PageArea>
                    <div className="leftSide">
                        <h3>Meus Dados: </h3>
                        <div className="field">
                            <div className="area-title">Nome:</div>
                            <div className="emailInfo">{account.name}</div>
                        </div>

                        <div className="field">
                            <div className="area-title">E-mail:</div>
                            <div className="emailInfo">{account.email}</div>
                        </div>

                        <div className="field">
                            <div className="area-title">Estado:</div>
                            <div className="stateInfo">{account.state}</div>

                        </div>
                    </div>


                    <div className="rightSide">
                        <h3>Alterar dados: </h3>
                        {error &&
                            <ErrorMessage>{error}</ErrorMessage>
                        }
                        <form onSubmit={updateSubmit}>
                            <label className="area">
                                <div className="area-title">Nome:</div>
                                <div className="area-input">
                                <input type="text" 
                                    disabled={disabled}
                                    value={name}
                                    onChange={e=>setName(e.target.value)}
                                />
                                </div>
                            </label>
                            <label className="area">
                                <div className="area-title">E-mail:</div>
                                <div className="area-input">
                                <input type="text" 
                                    disabled={disabled}
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                />
                                </div>
                            </label>
                            <label className="area">
                                <div className="area-title">Estado</div>
                                <div className="area-input">
                                    <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)}>
                                        <option></option>
                                        {stateList.map((i, k)=>
                                                <option key={k} value={i._name}>{i.name}</option>
                                            )}
                                    </select>
                                </div>
                            </label>
                            <label className="area">
                                <div className="area-title">Senha</div>
                                <div className="area-input">
                                <input type="text" 
                                    disabled={disabled}
                                    value={password}
                                    onChange={e=>setPassword(e.target.value)}
                                />
                                </div>
                            </label>
                            <label className="area">
                                <div className="area-title"></div>
                                <div className="area-input">
                                    <button >Alterar dados</button>
                                </div>
                            </label>
                        </form>
                    </div>
                </PageArea>
                <OthersArea>
                    {account.ads &&
                        <>
                            <h2>Meus anúncios</h2>
                            <div className="list">
                                {account.ads.map((i,k)=>
                                    <AdItem key={k} data={i} width={25} />
                                )}
                            </div>
                        </>
                    }
                </OthersArea>
            </PageContainer>
        </>
        
    );
}

export default Page;