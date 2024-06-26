// const meals = document.getElementById('meals');
// const favouriteWraper = document.getElementById
// ("fav-meals");



// getRandomMeal()
// fetchFavouriteMeals() 


// async function getRandomMeal(){
//     const resp = await fetch
//     ('https://www.themealdb.com/api/json/v1/1/random.php');
//     const raspData = await resp.json();
//     const randomMeal = raspData.meals[0];

//     addMeal(randomMeal, true);
    
// }


// async function getMealById(id){
//     const response = await fetch
//     ('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);

//     const respData = await response.json();
//     const meal = respData.meals[0];

//     return meal;
// }

// async function getMealsBySearch(term){
//     const meals = await fetch
//     ('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
// }
// function addMeal(mealData, random = false) {

//     console.log(mealData);

//     const meal = document.createElement('div');
//     meal.classList.add('meal');
//     meal.innerHTML = `
//         <div class="meal-header">
//             ${random ? `
//             <span class="random">
//             Random Meal </span>` : ''}
//             <img 
//             src="${mealData.strMealThumb}" 
//             alt="${mealData.strMeal}"/>
//         </div>
//         <div class="meal-body">
//             <h4>${mealData.strMeal}</h4>
//             <button class="heart-button">
//                 <i class="fas fa-heart"></i>
//             </button>

//         </div> `
//     ;
//     const button = meal.querySelector(".meal-body .heart-button");
//     button.addEventListener("click", () => {
//         if(button.classList.contains('active')) {
//             removeMealLocalStorage(mealData.idMeal)
//             button.classList.remove("active");
//         } else {
//             addMealLocalStorage(mealData.idMeal)
//             button.classList.add("active");
//         }
    
//     });


//     meals.appendChild(meal);
// }

// function addMealLocalStorage(mealId) {
//     const mealIds = getMealsLocalStorage();

//     localStorage.setItem('mealIds', JSON.stringify
//     ([...mealIds, mealId]));
// }

// function removeMealLocalStorage(mealId) {
//     const mealIds = getMealsLocalStorage();

//     localStorage.setItem("mealIds", 
//          JSON.stringify(mealIds.filter((id) => id !== mealId))
//     );

// }

// function getMealsLocalStorage() {
//     const mealIds = JSON.parse(localStorage.getItem("mealIds"));

//     return mealIds === null ? [] : mealIds;
// }

// // async function fetchFavouriteMeals() {
// //     const mealIds = getMealsLocalStorage();
// //     const meals = [];

// //     for( let i=0; i<mealIds.length; i++) {
// //         const mealId = mealIds[i];

// //         meal = await getMealById(mealId);
// //         meals.push(meal);
// //     }
// //     console.log(meals);
// // }
// async function fetchFavouriteMeals() {
//     const mealIds = getMealsLocalStorage();
//     const meals = [];

//     for (let i = 0; i < mealIds.length; i++) {
//         const mealId = mealIds[i];
//         const meal = await getMealById(mealId);
        
//         addMealToFavourite(meal);
//     }

//     console.log(meals);
// }

// function addMealToFavourite(mealData) {
//     const favouriteMeal = document.createElement('li');
//     favouriteMeal.innerHTML = `
//         <img src="${mealData.strMealThumb}" 
//         alt="${mealData.strMeal}">
//         <span>${mealData.strMeal}</span>
//      `
//     ;
//     favouriteWraper.appendChild(favouriteMeal);
// }


const meals = document.getElementById('meals');
const favouriteWrapper = document.getElementById('fav-meals');

getRandomMeal();
fetchFavouriteMeals();

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const respData = await response.json();
    const meal = respData.meals[0];
    return meal;
}

async function getMealsBySearch(term) {
    const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `
            <span class="random">
            Random Meal </span>` : ''}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="heart-button">
                <i class="fas fa-heart"></i>
            </button>
        </div>`;
    
    const button = meal.querySelector('.meal-body .heart-button');
    button.addEventListener('click', () => {
        if (button.classList.contains('active')) {
            removeMealLocalStorage(mealData.idMeal);
            button.classList.remove('active');
        } else {
            addMealLocalStorage(mealData.idMeal);
            button.classList.add('active');
        }
    });

    meals.appendChild(meal);
}

function addMealLocalStorage(mealId) {
    const mealIds = getMealsLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealLocalStorage(mealId) {
    const mealIds = getMealsLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function getMealsLocalStorage() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavouriteMeals() {
    const mealIds = getMealsLocalStorage();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);
        addMealToFavourite(meal);
    }
}

function addMealToFavourite(mealData) {
    const favouriteMeal = document.createElement('li');
    favouriteMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>`;
    favouriteWrapper.appendChild(favouriteMeal);
}