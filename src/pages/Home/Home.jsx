import React from 'react';
import { Helmet } from 'react-helmet-async';
import ShowTask from './ShowTask';
import App from '@/App';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Task24/7</title>
            </Helmet> 
            
            <section className="flex items-center justify-center h-screen">
               <App/>
            </section>


            
        </div>
    );
};

export default Home;