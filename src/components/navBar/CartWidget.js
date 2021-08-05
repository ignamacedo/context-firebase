import React from 'react';
import carro from '../../img/carro.png';

export default function CartWidget(props){
    return(
            <div style={{textAlign:'center'}}>
                {(props.qty>0)? props.qty : ''}
                <img src={carro} width="28" height="29" alt='carro'/>
           </div>
        );
}

