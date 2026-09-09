import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'

function FoodDisplay({ category }) {
    const { food_list } = useContext(StoreContext)
    const [menuList, setMenuList] = useState([])

    // useEffect(() => {
    //     const fetchRecipes = async () => {
    //         const response = await fetch('https://dummyjson.com/recipes')
    //         const data = await response.json()
    //         setMenuList(data.recipes || [])
    //     }

    //     fetchRecipes()
    // }, [])

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list
                    .filter((item) => category === 'All' || category === item.category)
                    .map((item) => {
                        return <FoodItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            image={item.image}
                        />
                    })}
            </div>
        </div>
    )
}

export default FoodDisplay
