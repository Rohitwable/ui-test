import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Pokemon/pokemon';
import styled, { css } from 'styled-components'
const Button = styled.li`
background-color: #4CAF50;
border: none;
color: white;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;

> a {
    text-decoration: none;
}
`
const ButtonWrapper = styled.ul`
margin: 0;
padding: 0;
display: flex;
justify-content: space-between;
width: 80%;
margin: auto;

`
const StyledSection = styled.section`
display: flex;
flex-wrap: wrap;
justify-content: center;
width: 80%;
margin: auto;

`
class Pokemons extends Component {
    state = {
        pokemons: [],
        currentPage: 1,
        itemPerPage: 3,
        upperPageBound: 3,
        lowerPageBound: 0,
        isPrevBtnActive: 'disabled',
        isNextBtnActive: '',
        pageBound: 3
    }


    componentDidMount() {
        axios.get('https://pokeapi.co/api/v2/pokemon')
            .then(response => {
                console.log(response.data);
                const pokemons = response.data.results;
                const updatedPokemons = pokemons.map(pokemon => {
                    return {
                        ...pokemon
                    }
                });
                this.setState({ pokemons: updatedPokemons });
            });
    }
    handleClick = (event) => {
        let listid = Number(event.target.id);
        this.setState({
            currentPage: listid
        });
        this.setPrevAndNextBtnClass(listid);
    }
    setPrevAndNextBtnClass = async (listid) => {
        let totalPage = await Math.ceil(this.state.pokemons && this.state.pokemons.length / this.state.itemPerPage);
        this.setState({ isNextBtnActive: 'disabled' });
        this.setState({ isPrevBtnActive: 'disabled' });
        if (totalPage === listid && totalPage > 1) {
            this.setState({ isPrevBtnActive: '' });
        }
        else if (listid === 1 && totalPage > 1) {
            this.setState({ isNextBtnActive: '' });
        }
        else if (totalPage > 1) {
            this.setState({ isNextBtnActive: '' });
            this.setState({ isPrevBtnActive: '' });
        }
    }
    btnIncrementClick = () => {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    btnDecrementClick = () => {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    btnPrevClick = () => {
        if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
            this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        }
        let listid = this.state.currentPage - 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    btnNextClick = () => {
        if ((this.state.currentPage + 1) > this.state.upperPageBound) {
            this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        }
        let listid = this.state.currentPage + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }

    render() {
        const { pokemons, currentPage, itemPerPage, isPrevBtnActive, isNextBtnActive } = this.state;
        const indexOfLastItem = currentPage * itemPerPage;
        const indexOfFirstItem = indexOfLastItem - itemPerPage;
        const currentPokemonList = pokemons.slice(indexOfFirstItem, indexOfLastItem);



        const pokemonsData = currentPokemonList.map((pokemon, index) => {

            return <Post
                key={pokemon.name}
                title={pokemon.name}
                img={pokemon.url}
                id={index + 1}
            />;
        });

        let renderPrevBtn = null;
        if (isPrevBtnActive === 'disabled') {
            renderPrevBtn = <Button className={isPrevBtnActive}><span> Prev </span></Button>
        }
        else {
            renderPrevBtn = <Button className={isPrevBtnActive}><a href='#' onClick={this.btnPrevClick}> Prev </a></Button>
        }
        let renderNextBtn = null;
        if (isNextBtnActive === 'disabled') {
            renderNextBtn = <Button className={isNextBtnActive}><span> Next </span></Button>
        }
        else {
            renderNextBtn = <Button className={isNextBtnActive}><a href='#' onClick={this.btnNextClick}> Next </a></Button>
        }

        return (
            <div>
                <StyledSection>
                    {pokemonsData}
                    <ButtonWrapper>
                        {renderPrevBtn}
                        {renderNextBtn}
                    </ButtonWrapper>
                </StyledSection>
            </div>
        );
    }
}

export default Pokemons;