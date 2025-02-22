import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '@/App';
import About from './About/About';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Task24/7</title>
            </Helmet> 
            
            <section className="flex items-center justify-center min-h-screen">
               <App/>
            </section>

            <section className=' flex items-center justify-center min-h-screen'>
                <About/>
            </section>

    
            
        </div>
    );
};

export default Home;