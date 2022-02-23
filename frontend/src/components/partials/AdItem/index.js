import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Item } from './styled'

export default (props) => {
    let price = '';

    if(props.data.priceNegotiable) {
        price = 'Peço Negociável';
    } else {
        price = `R$ ${props.data.price}`
    }

    return (
        <Item className="aditem"> 
            {!props.data.images && 
                <Link to={`/ad/${props.data.id}`}>
                    <div className="itemImage">
                        <img src={props.data.image} alt="" />
                        
                    </div>
                    <div className="itemName">{props.data.title}</div>
                    <div className="itemPrice">{price}</div>
                </Link>
            }
            {props.data.images && 
                <div className="accountAd">
                    <div className="itemImage">
                        
                        { props.data.images && props.data.images.map((image, k)=> 
                            <> 
                                <img key={k} src={`http://alunos.b7web.com.br:501/media/${image.url}`} alt="" /> 
                            </>
                        )}
                    </div>
                    <div className="itemName">{props.data.title}</div>
                    <div className="itemPrice">{price}</div>
                    <div className="bnts">
                        <button className="visit-bnt" onClick={()=>window.location.href = `/ad/${props.data.id}`}>Visitar</button>
                        <button className="update-bnt" onClick={()=>window.location.href = `/atualizar-ad/${props.data.id}`}>Atualizar</button>
                    </div>
                </div>
            }
            
        </Item>
    )
}