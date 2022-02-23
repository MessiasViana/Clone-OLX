import styled from "styled-components";

export const Item = styled.div`
    a, .accountAd {
        display:block;
        border:1px solid #FFF;
        margin:10px;
        text-decoration:none;
        padding:10px;
        border-radius:5px;
        color:#000;
        background-color:#FFF;
        transition:all ease .2s;
        min-height:350px;
        
        &:hover {
            background-color:#EEE;
            border:1px solid #CCC;

        }

        .itemImage img {
            width:100%;
            border-radius:5px;
            
        }

        .itemName {
            margin-top:20px;
            font-weight:bold;
        }
    }
    
    
    .bnts {
        margin-left:30px;
    }

    button {
        background-color:#0089FF;
        border:0;
        outline:0;
        padding:5px;
        border-radius:4px;
        color:#FFF;
        font-size:15px;
        cursor:pointer;
        display:block;
        width:75%;
        margin-top:15px;

        &:hover {
            background-color:#006FCE;
        }
    }
`;