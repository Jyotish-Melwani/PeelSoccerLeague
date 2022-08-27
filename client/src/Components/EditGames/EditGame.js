import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import "./EditGame.scss";
import axios from 'axios';
import errorIcon from '../../Assets/Icons/error-24px.svg'

const EditWarehouse = () => {
    const history = useHistory();
    const params = useParams();

    const [warehouseDetails, setWarehouseDetails] = useState({
        name: "",
        address: "",
        city: "",
        country: "",
        contactName: "",
        position: "",
        phone: "",
        email: "",
    });

    const [fieldErrorWarehouse, setFieldErrorWarehouse] = useState({
        name: false,
        address: false,
        city: false,
        country: false,
        contactName: false,
        position: false,
        phone: false,
        email: false,
    });


    useEffect(() => {
        axios.get(`http://localhost:5000/api/game/${params.id}`).then(res => {
            setWarehouseDetails({
                name: res?.data?.game[0]?.gameName,
                address: res?.data?.game[0]?.address,
                city: res?.data?.game[0]?.city,
                country: res?.data?.game[0]?.country,
                contactName: res?.data?.game[0]?.contactName,
                position: res?.data?.game[0]?.position,
                phone: res?.data?.game[0]?.phoneNumber,
                email: res?.data?.game[0]?.email,
            });

        }).catch(err => {
            console.log(err);
        });

    }, [params]);

    const handleFormChange = e => {
        setWarehouseDetails({ ...warehouseDetails, [e.target.name]: e.target.value });
    }

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel and go back to the previous page?')) {
            history.push(`/`);
        }
    }

    const handleSave = e => {
        e.preventDefault();

        let foundError = false;

        // For left panel
        const updatedErrorStateWarehouse = { ...fieldErrorWarehouse };
        for (let i = 0; i < 8; i++) {
            if (e.target[i].value.trim() === '') {
                e.target[i].classList.add('error-state');
                updatedErrorStateWarehouse[e.target[i].name] = true;

                foundError = true;
            } else {
                e.target[i].classList.remove('error-state');
                updatedErrorStateWarehouse[e.target[i].name] = false;
            }
        }

        setFieldErrorWarehouse(updatedErrorStateWarehouse);

        if (foundError) {
            return;
        }

        if (window.confirm('Are you sure you want to update this game?')) {

            axios.post(`http://localhost:5000/api/update-game/${params.id}`, warehouseDetails).then(_res => { }).catch(err => console.log(err));
            history.push(`/game/${params.id}`);
        };
    }

    return (
        <section className='warehouse-edit__wrapper'>
            <div className='warehouse-edit__header-wrapper'>
                <Link to={`/game/${params.id}`}>
                    <div className='warehouse-edit__back'></div>
                </Link>
                <h1 className='warehouse-edit__item'>Edit Game</h1>
            </div>
            <form onSubmit={handleSave}>
                <div className='warehouse-edit'>
                    <div className='warehouse-edit__left'>

                        <h2 className='warehouse-edit__title'>Game Details</h2>

                        <h3 className='warehouse-edit__subtitle' >Game Name</h3>
                        <input className='warehouse-edit__input' name='name' value={warehouseDetails.name} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.name ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >Street Address</h3>
                        <input className='warehouse-edit__input' name='address' value={warehouseDetails.address} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.address ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >City</h3>
                        <input className='warehouse-edit__input' name='city' value={warehouseDetails.city} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.city ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >Country</h3>
                        <input className='warehouse-edit__input warehouse-edit__input--last-row' name='country' value={warehouseDetails.country} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.country ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                    </div>
                    <div className='warehouse-edit__right'>
                        <h2 className='warehouse-edit__title'>Contact Details</h2>

                        <h3 className='warehouse-edit__subtitle' >Contact Name</h3>
                        <input className='warehouse-edit__input' name='contactName' value={warehouseDetails.contactName} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.contactname ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >Position</h3>
                        <input className='warehouse-edit__input' name='position' value={warehouseDetails.position} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.position ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >Phone Number</h3>
                        <input className='warehouse-edit__input' name='phone' value={warehouseDetails.phone} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.phone ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >Email</h3>
                        <input className='warehouse-edit__input' name='email' value={warehouseDetails.email} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.email ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>
                    </div>
                </div>
                <div className='warehouse-edit__button-wrapper'>
                    <button type='button' className='warehouse-edit__button warehouse-edit__button-cancel' onClick={handleCancel} >Cancel</button>
                    <button type="submit" className='warehouse-edit__button warehouse-edit__button-save' >Save</button>
                </div>
            </form>
        </section>
    );
}

export default EditWarehouse;