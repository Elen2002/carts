import React, {useEffect, useState} from 'react';
import {BsPlusLg} from "react-icons/bs";
import  '../App.css';
import {useDispatch, useSelector} from "react-redux";
import {API_URL} from "../utils/global";
import Cart from "./Cart";

const Carts = () => {
    const [carts, setCarts] = useState([]);
    const [selectedCard, setSelectedCard] = useState([]);
    const [loader, setLoader] = useState(false);

    let data = async () => {
        const response = await fetch(API_URL + '/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        });
        const json = await response.json();
        if (json.status == 'ok') {
            setLoader(true)
            setCarts(json.cart)
        }
    }
    useEffect(() => {
        if (!loader) {
            data();
        }
    }, []);
        return (
            <div className="row">
                <div className="d-flex mt-3 justify-content-start">
                    {
                        (carts.length > 0)?
                        carts.map((item, index)=>{
                        return (
                            <div key={index} className="card carts col-md-2 text-white ps-2 ms-0 m-2 pt-4"
                             style={{background: '#6698FA', width: '26%'}}
                            onClick={()=>{
                                setSelectedCard([item])
                            }}
                            >
                            <div>
                                <small>.... {item.shortNum}</small><br/>
                                <small>{item.date}</small>
                            </div>
                            </div>
                                )
                    }):null
                    }

                    <button className="card add-cart m-2 pb-2 pt-4"
                    onClick={()=>{setSelectedCard([])}}>
                        <div className="ms-5">
                            <BsPlusLg size={24}/>
                        </div>
                        <div className="ps-2">
                            <small className="text-secondary">Новая карта</small>
                        </div>
                    </button>
                </div>
                <Cart cartData={selectedCard}/>
            </div>
        );
}

export default Carts;