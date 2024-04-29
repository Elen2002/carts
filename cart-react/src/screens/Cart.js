import React, {useEffect, useState} from 'react';
import {API_URL} from "../utils/global";
import stringify from "qs-stringify";
import {BsExclamationCircle} from "react-icons/bs";


const Cart = ({cartData}) => {
    const [number, setNumber] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [cvv, setCvv] = useState('')
    const [check, setCheck] = useState(false)
    const [checkStyle, setCheckStyle] = useState({})
    const [numberStyle, setNumberStyle] = useState({});
    const [monthStyle, setMonthStyle] = useState({});
    const [yearStyle, setYearStyle] = useState({});
    const [CVVStyle, setCVVStyle] = useState({});
    let today = new Date()

    useEffect(() => {
        if (cartData.length === 0){
            emptyData();
        }else{
            setNumber(cartData[0].number);
            setMonth(cartData[0].date.split('/')[0]);
            setYear(cartData[0].date.split('/')[1]);
            setCvv(cartData[0].cvv);
            setCVVStyle({});
            setMonthStyle({});
            setNumberStyle({});
            setYearStyle({});
        }
    }, [cartData]);

    const emptyData = () => {
        setCvv("");
        setMonth("");
        setNumber("");
        setYear("");

    }
    let addData = async () => {
        if (number === '') {
            setNumberStyle({'borderColor': 'red'})
        }
        if (month === '') {
            setMonthStyle({'borderColor': 'red'})
        }
        if (year === '') {
            setYearStyle({'borderColor': 'red'})
        }
        if (cvv === '') {
            setCVVStyle({'borderColor': 'red'})
        }
        if(!check){
            setCheckStyle({'borderColor': 'red'})
        }

        if (cvv !== '' && check && month !== ''
            && year !== '' && number !== '') {
                let dataCart = {
                    number: number,
                    date: month + '/' + year,
                    cvv: cvv
                }
                const response = await fetch(API_URL + '/add/cart', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    body: stringify(dataCart)
                });
                const json = await response.json();
                console.log(json)
                if (json.status == 'ok') {
                    window.location.reload();
                } else if (json.status == 'error') {
                    console.log(json.message)
                }
            }
        
    }
    return (
        <div >
            <div className="card-container">
                <div className="card back-cart"
                     style={{background: '#EBEBF0', width: '55%', left: 190, position: 'absolute'}}>
                    <div className="p-3 card-header border-0 rounded-0 mt-3" style={{background: '#C7C9D9'}}></div>
                    <div className="card-body back-cart-body pt-0 d-flex ">
                        <div className="back-text">
                            <small className="mt-0 text-secondary">CVV/CVC</small>
                            <div className="cvv">
                            <input className="form-control ms-3"
                                   value={cvv}
                                   disabled={cartData.length > 0}
                                   onChange={(e) => {
                                       if (e.target.value.length < 4) {
                                           setCvv(e.target.value)
                                       }
                                   }}
                                   type="number" style={CVVStyle}
                                   onBlur={(e) => {
                                       if (cvv !== '' && cvv.length === 3) {
                                           // eslint-disable-next-line react-hooks/rules-of-hooks
                                           setCVVStyle({})
                                           setCvv(+cvv)
                                       } else {
                                           // eslint-disable-next-line react-hooks/rules-of-hooks
                                           setCVVStyle({borderColor: 'red'})
                                       }
                                   }} placeholder='000'/>
                            <p className="sm mb-0">три цифры с обратной стороны карты</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card cart">
                    <div className="card-body mt-3">
                        <small className="text-uppercase  text-white">Номер карты</small>
                        <input className="form-control"
                               value={number}
                               onChange={(e) => {
                                   if (e.target.value.length < 17) {
                                       setNumber(e.target.value)
                                   }
                               }
                               }
                               disabled={cartData.length > 0}
                               style={numberStyle}
                               onBlur={(e) => {
                                   if (number !== '' && number.length < 17) {
                                       // eslint-disable-next-line react-hooks/rules-of-hooks
                                       setNumberStyle({})
                                       setNumber(+number)
                                   } else {
                                       // eslint-disable-next-line react-hooks/rules-of-hooks
                                       setNumberStyle({borderColor: 'red'})
                                   }
                               }} id="numberCart" type="number" placeholder="Номер карты"/>
                        <small className="text-uppercase text-white">Действует до</small>
                        <div className="d-flex justify-content-start">
                            <input className="form-control w-25" type="number"
                                   value={month}
                                   onChange={(e) => {
                                       if (e.target.value.length < 3) {
                                           setMonth(e.target.value)
                                       }
                                   }}
                                   disabled={cartData.length > 0}
                                   style={monthStyle}
                                   onBlur={(e) => {
                                       if ((typeof year == 'undefined' || '20' + year <= today.getFullYear()) && month < today.getMonth() + 1 || month == '' || month > 12) {
                                           // eslint-disable-next-line react-hooks/rules-of-hooks
                                           setMonthStyle({borderColor: 'red'})
                                       } else {
                                           // eslint-disable-next-line react-hooks/rules-of-hooks
                                           setMonthStyle({})
                                           setMonth(month)
                                       }
                                   }} placeholder="мм"/>
                            <p className="text-white m-1"> / </p>
                            <input className="form-control w-25"
                                   value={year}
                                   onChange={(e) => {
                                       if (e.target.value.length < 3) {
                                           setYear(e.target.value)
                                       }
                                   }}
                                   disabled={cartData.length > 0}
                                   type="number" style={yearStyle}
                                   onBlur={(e) => {
                                       if (year != '' && +"20" +year >= today.getFullYear()) {
                                           // eslint-disable-next-line react-hooks/rules-of-hooks
                                           setYearStyle({})
                                           setYear(year)
                                       } else {
                                           // eslint-disable-next-line react-hooks/rules-of-hooks
                                           setYearStyle({borderColor: 'red'})
                                       }
                                   }} placeholder="гг"/>
                        </div>
                    </div>
                </div>
            </div>
            { cartData.length === 0 ?
                <div className='buttons'>
            <div className="form-check form-check-inline m-1">
                <input style={checkStyle} className="form-check-input check" onChange={()=>{
                    if (check){
                        setCheck(false)
                    }else{
                        setCheck(true)
                        setCheckStyle({})

                    }
                }
                } type="checkbox" id="inlineCheckbox1" value="option1"/>
                <label className="form-check-label text" htmlFor="inlineCheckbox1">Запомнить эту карту. Это безопасно.
                    <BsExclamationCircle size={18} className='ms-2' color='#C7C9D9'/>
                </label><br/>
                <label className="form-check-label text">Сохраняя карту, вы соглашаетесь с <label className="form-check-label text text-primary" > условиями привязки карты.</label>
                </label>

            </div><br/>
            <button onClick={addData} className="btn btn-primary" style={{borderRadius: 100}}>Оплатить</button>
                </div>:
                <div></div>}
        </div>
    );
};

export default Cart;