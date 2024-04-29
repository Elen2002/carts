import React, {useState} from 'react';

const Convert = () => {
    const[rubl, setRubl]= useState();

    return (
        <div>
            <small className='text-secondary'>Укажите сумму</small>
            <div className="input-group w-50">
                <input type="text" onKeyUp={(e)=>{
                    let curr =+e.target.value
                    setRubl(curr*15)
                }} className="form-control border-end-0 input-group-text" placeholder='0000.00'/>
                <span className="border-start-0 fw-bold border-end-0 input-group-text text-secondary">ֆ</span>
                <input type="text" value={rubl} disabled={true} className="form-control border-end-0 input-group-text" placeholder='0000.00'/>
                <a className="border-start-0 btn dropdown-toggle" style={{borderColor:'#E4E4EB', background:"#e9ecef"}} type="button" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">₽
                </a>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">$</a>
                </div>
            </div>
        </div>
    );
};

export default Convert;