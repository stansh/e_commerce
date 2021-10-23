import React from 'react';
import { Jumbotron} from 'reactstrap';

const Image = (props) => {
  return (
    <>
      <Jumbotron>
        <div className="row">                        
          <img className = 'img-fluid' src='JT_image2.jpg'  alt='travel'/>
        </div>
      </Jumbotron>
    </>
  );
};

export default Image;