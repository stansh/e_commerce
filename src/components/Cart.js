import React from 'react';
import {Card} from 'reactstrap';

import {withRouter} from 'react-router-dom';

function Cart (props) {

return(
   <div>
       <Card>
           <h4>{props.product.title}</h4>
           <h4>{props.product.price}</h4>
       </Card>
   </div>

)

}

export default withRouter(Cart);