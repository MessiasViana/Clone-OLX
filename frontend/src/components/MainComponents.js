import styled from "styled-components";

export const Template = styled.div``;

export const PageContainer = styled.div`
    max-width:1000px;
    margin:auto;
`;

export const PageTitle = styled.h1`
    font-size:27px;
`;

export const PageBody = styled.div``;

export const ErrorMessage = styled.div`
    padding:10px;
    margin:10px 0px;
    background-color:#FFCACA;
    color:#000;
    border:2px solid #FF0000;
`;

export const OthersArea = styled.div`
    h2 {
        font-size:20px;
    }

    .list {
        display:flex;
        flex-wrap:wrap;

        .aditem {
            width:25%;
        }
    }

    @media (max-width:600px) {
        margin:10px;

        .list .aditem {
            width:50%;
        }

        .list a {
            min-height:250px;
        }
    }
`