import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe';


const App = () => {

    const API_ID="9ee09380";
    const API_KEY="44f261a5e8a2d49c811e832d321f8563";

    const [recipes,setRecipes] = useState([]);
    const [search,setSearch] = useState("");
    const [query,setQuery] = useState('chicken');

    useEffect(() => {
        console.log('2')
        getRecipes();
    },[query])

    const getRecipes = async () => {
       
        const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`)
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data.hits)
    };

    const updateSeacrh = e => {
        setSearch(e.target.value)
    };

    const getSearch = e =>{
        e.preventDefault();
        setQuery(search)
        setSearch('')
        // console.log('1')
    };

    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSeacrh} />
                <button 
                    className="search-button" 
                    type="submit"
                >
                   Search
                </button>
             </form>
             
             <div className="recipes">
                {recipes.map(recipe => (
                    <Recipe 
                        key={recipe.recipe.label}
                        title={recipe.recipe.label} 
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                    />
                ))}
             </div>

            
        </div>
    );
}

export default App;
