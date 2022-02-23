import styled from "styled-components";


export const PageArea = styled.div`
    display:flex;
    

    .leftSide {
        width:500px;
        margin-right:10px;
        
        .field {
            background-color:#FFF;
            border-radius:3px;
            padding:10px;
            box-shadow:0px 0px 3px #999;
            margin-top:10px;
            display:flex;
            
            .area-title {
                width:70px;
                
                padding-right:20px;
                font-weight:bold;
                font-size:14px;
            }
        }
    
        .nameInfo, .emailInfo, .stateInfo {
            margin-left:10px;
            color:#888;
        }
    }

    .rightSide {
        flex:1;
        margin-left:30px;

        form {
            background-color:#FFF;
            border-radius:3px;
            padding:10px;
            box-shadow:0px 0px 3px #999;
    
            .area {
                display:flex;
                align-items:center;
                padding:10px;
                max-width:500px;
    
                .area-title {
                    width:100px;
                    
                    padding-right:20px;
                    font-weight:bold;
                    font-size:14px;
                }
                .area-input {
                    flex:1;
    
                    input, select {
                        width:100%;
                        font-size:14px;
                        padding:5px;
                        border:1px solid #DDD;
                        border-radius:3px;
                        outline:0;
                        transition:all ease .4s;
    
                        &:focus {
                            border:1px solid #333;
                            color:#333;
                        }
                    }
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
    
                    &:hover {
                        background-color:#006FCE;
                    }
                }
            }
        }
    }
`