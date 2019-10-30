import React from 'react';
import styled, { css } from 'styled-components'
const Tile = styled.article`
width: 285px;
text-align: center;
border: 1px solid #eee;
box-shadow: 0 2px 3px #ccc;
box-sizing: border-box;
cursor: pointer;
`
const Header = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
background: #001a00;
padding: 2px 10px;

`
const Image = styled.img`
    margin: 15px;
    width: 150px;
    height: 150px;
`
const Heading = styled.h1`
    color: white;
    padding:0 10px;
    margin:5px;
`


const pokemon = (props) => (
    <div>
        <Tile>
            <Header>
                <Heading>{props.title.toUpperCase()}</Heading>
                <Heading>{`ID: ${props.id}`}</Heading>
            </Header>
            <Image src='https://via.placeholder.com/150' />
        </Tile>
    </div>
);

export default pokemon;