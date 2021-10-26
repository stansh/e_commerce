import React from 'react';
import { Jumbotron} from 'reactstrap';

const Image = (props) => {
  return (
    <>
      <Jumbotron>
        <div className="row">  
          <h1 id="text" >experience. learn. live..</h1>                    
          <img className = 'img-fluid' src='image3.jpg'  alt='travel'/>
        </div>
      </Jumbotron>
    </>
  );
};

export default Image;