import React from 'react';
import  Header  from '../components/Header';
import  Footer  from '../components/Footer';
import Body from '../components/Body';

const HomePage = () => {
  return (
    <>
      <div>
        <div>
          <Header/>
        </div>
        <div>
            <Body />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
