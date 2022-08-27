import React, { useState, useEffect } from 'react'
import axios from "axios";
import SearchHeader from '../SearchHeader/SearchHeader';
import TableHeader from '../TableHeader/TableHeader';
import './Profile.scss';
import WarehouseRow from '../GameRow/GameRow';
import Cookie from 'js-cookie'


const InventoryList = () => {

    const [data, setData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);

    const userInfo = Cookie.get("userInfo")
        ? JSON.parse(Cookie.get("userInfo"))
        : null

    useEffect(() => {
        requestWarehouseList();
    }, [])

    const requestWarehouseList = () => {
        axios.get('http://localhost:5000/api/user-game/' + userInfo?._id)
            .then(result => {
                setData(result.data?.game);
                setSearchedData(result.data?.game);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const searchData = query => {
        const newSearch = [];
        const q = query.toLowerCase();

        data.forEach(row => {
            if (row.address.toLowerCase().match(q) || row.contactName.toLowerCase().match(q) || row.phoneNumber.toLowerCase().match(q) || row.email.toLowerCase().match(q) || row.gameName.toLowerCase().match(q)) {
                newSearch.push(row);
            }
        })
        setSearchedData(newSearch);
    }

    return (
        <div className='warehouseList__wrapper-container'>
            <SearchHeader title={'My Games'} searchData={searchData} buttonText={'+ Add New Game'} buttonLink={'/game/add'} />
            <TableHeader
                className={'warehouseList'}
                firstHeader={'Game'}
                secondHeader={'ADDRESS'}
                thirdHeader={'CONTACT NAME'}
                fourthHeader={'CONTACT INFORMATION'}
                fifthHeader={null}
                sixthHeader={'ACTIONS'} />
            <div className='warehouseList__wrapper-subContainer'>
                {searchedData.map((singleWarehouse) => {
                    return <WarehouseRow
                        key={singleWarehouse._id}
                        id={singleWarehouse._id}
                        warehouseName={singleWarehouse.gameName}
                        address={singleWarehouse.address}
                        city={singleWarehouse.city}
                        country={singleWarehouse.country}
                        contact={singleWarehouse.contactName}
                        phone={singleWarehouse.phoneNumber}
                        email={singleWarehouse.email}
                        onDataChange={requestWarehouseList} />
                })}
            </div>
        </div>
    )
}

export default InventoryList;