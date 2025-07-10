# Reppy - Beginner Friendly Workout App


This app is designed for people new to strength training who may feel uncomfortable or overwhelmed by typical gym exercises. Unlike many beginner plans that include intimidating moves, this app lets users tailor workouts based on available equipment and swap exercises for easier alternatives targeting the same muscle groups. It also provides a simple way to track workout progress, making it easier to stay motivated and consistent.


![App Screenshot](/client/Reppy/assets/images/ReppyGraphics.webp)


## Key Features

- Choose workout days and customize exercises based on your equipment  
- Swap exercises for alternatives that hit the same muscle groups
- Track and save your workout stats over time  

## Frontend

The frontend is built using **React Native** and **Expo**, providing a smooth, mobile-first experience. Key technologies include:

- **Expo Router** for navigation  
- **AsyncStorage** for local data persistence  
- **Axios** for API requests  
- **NativeWind** for styling with Tailwind CSS in React Native  

## Backend

The backend stores exercise data and exposes endpoints to:

- Generate personalized workout plans
- Fetch alternative exercises  
- Swap and delete exercises  

It is built with:

- **Node.js** and **Express** for the server 
- **Supertest** for API testing  


