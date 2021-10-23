import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import {search} from '../redux/actionCreators'


function Search (props) {
    const inputText = useRef();
    return (
      <div className = 'container my-3'>
        <input ref = {inputText}  className ='col-md-4 mr-5' />
        <Button  id='buttons' className =' col' onClick ={() => props.search(inputText.current.value)}>Seacrh Products</Button>
      </div>
    ) 
}

const mapDispatchToProps =  {
    search: (keywords) => (search(keywords))

  }

//export default Search;

export default connect(null,mapDispatchToProps)(Search);