import React from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Task24/7</title>
            </Helmet> 
            
            <section className="flex items-center justify-center h-screen">
               <p>Home page </p>
            </section>
            
        </div>
    );
};

export default Home;