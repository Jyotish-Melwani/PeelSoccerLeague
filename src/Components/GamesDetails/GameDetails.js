import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useHistory, useParams } from 'react-router-dom';
import "./GameDetails.scss"
import Cookie from 'js-cookie'
import '@fortawesome/fontawesome-free/css/all.css'

const WarehouseDetails = (props) => {
    const history = useHistory();

    const params = useParams();
    const userInfo = Cookie.get("userInfo")
        ? JSON.parse(Cookie.get("userInfo"))
        : null

    const [inputState, setInputState] = useState({
        "t1goalKeeper": "",
        "t1defenderOne": "",
        "t1defenderTwo": "",
        "t1defenderThree": "",
        "t1defenderFour": "",
        "t1midfielderOne": "",
        "t1midfielderTwo": "",
        "t1midfielderThree": "",
        "t1midfielderFour": "",
        "t1attackerOne": "",
        "t1attackerTwo": "",
        "t2goalKeeper": "",
        "t2defenderOne": "",
        "t2defenderTwo": "",
        "t2defenderThree": "",
        "t2defenderFour": "",
        "t2midfielderOne": "",
        "t2midfielderTwo": "",
        "t2midfielderThree": "",
        "t2midfielderFour": "",
        "t2attackerOne": "",
        "t2attackerTwo": ""
    });

    const [fieldRequiredMessage, setFieldRequiredMessage] = useState({});
    console.log(inputState);

    const errorHandler = (e) => {

        setInputState({ ...inputState, [e.target.name]: e.target.value });

        // updating state for error message display

        if (e.target.value.trim() !== '') {
            setFieldRequiredMessage({ ...fieldRequiredMessage, [e.target.name]: e.target.value });
        } else if (e.target.value.trim() === '') {
            setFieldRequiredMessage({ ...fieldRequiredMessage, [e.target.name]: undefined });
        }
    };

    const dataHandler = (e) => {
        e.preventDefault();

        // Axios post request

        const teamData = {
            "teamOne": {
                "goalKeeper": e.target[0].value,
                "defenderOne": e.target[1].value,
                "defenderTwo": e.target[2].value,
                "defenderThree": e.target[3].value,
                "defenderFour": e.target[4].value,
                "midfielderOne": e.target[5].value,
                "midfielderTwo": e.target[6].value,
                "midfielderThree": e.target[7].value,
                "midfielderFour": e.target[8].value,
                "attackerOne": e.target[9].value,
                "attackerTwo": e.target[10].value
            },
            "teamTwo": {
                "goalKeeper": e.target[11].value,
                "defenderOne": e.target[12].value,
                "defenderTwo": e.target[13].value,
                "defenderThree": e.target[14].value,
                "defenderFour": e.target[15].value,
                "midfielderOne": e.target[16].value,
                "midfielderTwo": e.target[17].value,
                "midfielderThree": e.target[18].value,
                "midfielderFour": e.target[19].value,
                "attackerOne": e.target[20].value,
                "attackerTwo": e.target[21].value
            },
            "gameId": params?.id,
            "userId": userInfo?._id
        }

        const teamPostCall = axios.post('http://localhost:5000/api/add-team', teamData);
        teamPostCall
            .then((_response) => {
                history.push('/game');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [data, setData] = useState({
        name: "",
        address: "",
        city: "",
        country: "",
        contactName: "",
        position: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/game/${params.id}`)
            .then(result => {

                setData(
                    {
                        name: result.data?.game[0]?.gameName,
                        address: result.data?.game[0]?.address,
                        city: result.data?.game[0]?.city,
                        country: result.data?.game[0]?.country,
                        contactName: result.data?.game[0]?.contactName,
                        position: result.data?.game[0]?.position,
                        phone: result.data?.game[0]?.phoneNumber,
                        email: result.data?.game[0]?.email,
                    }
                );
            })
            .catch(error => {
                console.log(error)
            })
    }, [params])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get-team/${params?.id}`)
            .then(result => {
                setInputState({
                    "t1goalKeeper": result?.data?.team[0]?.teamOne?.goalKeeper,
                    "t1defenderOne": result?.data?.team[0]?.teamOne?.defenderOne,
                    "t1defenderTwo": result?.data?.team[0]?.teamOne?.defenderTwo,
                    "t1defenderThree": result?.data?.team[0]?.teamOne?.defenderThree,
                    "t1defenderFour": result?.data?.team[0]?.teamOne?.defenderFour,
                    "t1midfielderOne": result?.data?.team[0]?.teamOne?.midfielderOne,
                    "t1midfielderTwo": result?.data?.team[0]?.teamOne?.midfielderTwo,
                    "t1midfielderThree": result?.data?.team[0]?.teamOne?.midfielderThree,
                    "t1midfielderFour": result?.data?.team[0]?.teamOne?.midfielderFour,
                    "t1attackerOne": result?.data?.team[0]?.teamOne?.attackerOne,
                    "t1attackerTwo": result?.data?.team[0]?.teamOne?.attackerTwo,
                    "t2goalKeeper": result?.data?.team[0]?.teamTwo?.goalKeeper,
                    "t2defenderOne": result?.data?.team[0]?.teamTwo?.defenderOne,
                    "t2defenderTwo": result?.data?.team[0]?.teamTwo?.defenderTwo,
                    "t2defenderThree": result?.data?.team[0]?.teamTwo?.defenderThree,
                    "t2defenderFour": result?.data?.team[0]?.teamTwo?.defenderFour,
                    "t2midfielderOne": result?.data?.team[0]?.teamTwo?.midfielderOne,
                    "t2midfielderTwo": result?.data?.team[0]?.teamTwo?.midfielderTwo,
                    "t2midfielderThree": result?.data?.team[0]?.teamTwo?.midfielderThree,
                    "t2midfielderFour": result?.data?.team[0]?.teamTwo?.midfielderFour,
                    "t2attackerOne": result?.data?.team[0]?.teamTwo?.attackerOne,
                    "t2attackerTwo": result?.data?.team[0]?.teamTwo?.attackerTwo,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className='warehouseDetail__main'>
            <section className="warehouseDetail__wrapper">
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Link style={{ textDecoration: "none" }} to={`/game`}>
                            <i style={{ color: "#2E66E5" }} class="fa-solid fa-arrow-left"></i>
                            <span style={{ fontSize: "22px", color: "black" }} >  {data.name} </span>
                        </Link>
                    </div>
                    <div style={{ backgroundColor: "#ff0000", paddingLeft: "10px", paddingRight: "10px", paddingTop: "5px", paddingBottom: "2px", textAlign: "center", borderRadius: "1.25rem" }}>
                        <Link to={`/game/edit/${params.id}`} style={{ color: "white", textDecoration: "none", }} >
                            <i class="fa-solid fa-pen"></i>
                            <span style={{ fontSize: "16px" }} > Edit</span>

                            <div className='inv-details__edit-mobile'></div>
                        </Link>
                    </div>
                </div>
                <div className='warehouseDetail__container--all'>
                    <div className="warehouseDetail__detail-container warehouseDetail__detail-container--primary">
                        <h4 className="warehouseDetail__title">GAME ADDRESS: </h4>
                        <p className="warehouseDetail__text">{data.address}</p>
                        <p className="warehouseDetail__text">{data.city} , {data.country}</p>
                    </div>
                    <div className='warehouseDetail-flex'>
                        <div className="warehouseDetail__detail-container">
                            <h4 className="warehouseDetail__title">CONTACT NAME AND START TIME:</h4>
                            <p className="warehouseDetail__text">{data.contactName}</p>
                            <p className="warehouseDetail__text">{data.position}</p>

                        </div>
                        <div className="warehouseDetail__detail-container">
                            <h4 className="warehouseDetail__title">CONTACT INFORMATION: </h4>
                            <p className="warehouseDetail__text">{data.phone}</p>
                            <p className="warehouseDetail__text">{data.email}</p>
                        </div>
                    </div>
                </div>
            </section>


            <form className='add-warehouse__wh-details' onSubmit={dataHandler}>
                <div className='add-warehouse__details-container'>

                    <div className='add-warehouse__warehouse-form'>
                        <h2 className='add-warehouse__warehouse-heading'>Team One</h2>

                        <label className='wh-form__label' htmlFor='name-form'>
                            GoalKeeper
                        </label>
                        <input
                            className={
                                // inputState.t1goalKeeper === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            name='t1goalKeeper'
                            value={inputState?.t1goalKeeper}
                            onChange={errorHandler}
                            placeholder='GoalKeeper'
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Defender
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState.t1defenderOne === ""
                                //     ? 'add-wh__form-error'
                                 'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='street-form'
                            name='t1defenderOne'
                            value={inputState?.t1defenderOne}
                            placeholder='Defender'
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Defender
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState.t1defenderTwo === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='street-form'
                            name='t1defenderTwo'
                            placeholder='Defender'
                            value={inputState?.t1defenderTwo}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Defender
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t1defenderThree === ""
                                //     ? 'add-wh__form-error'
                                'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='street-form'
                            name='t1defenderThree'
                            placeholder='Defender'
                            value={inputState?.t1defenderThree}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Defender
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState.t1defenderFour === ""
                                //  'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='street-form'
                            name='t1defenderFour'
                            placeholder='Defender'
                            value={inputState?.t1defenderFour}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Midfielder
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t1midfielderOne === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='city-form'
                            name='t1midfielderOne'
                            placeholder='Midfielder'
                            value={inputState?.t1midfielderOne}

                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Midfielder
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t1midfielderTwo === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='city-form'
                            name='t1midfielderTwo'
                            placeholder='Midfielder'
                            value={inputState?.t1midfielderTwo}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Midfielder
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t1midfielderThree === ""
                                //     ? 'add-wh__form-error'
                                 'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='city-form'
                            name='t1midfielderThree'
                            placeholder='Midfielder'
                            value={inputState?.t1midfielderThree}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Midfielder
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t1midfielderFour === ""
                                //     ? 'add-wh__form-error'
                                 'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='city-form'
                            name='t1midfielderFour'
                            placeholder='Midfielder'
                            value={inputState?.t1midfielderFour}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Attacker
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t1attackerOne === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='country-form'
                            name='t1attackerOne'
                            placeholder='Attacker'
                            value={inputState?.t1attackerOne}

                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Attacker
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t1attackerTwo === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='country-form'
                            name='t1attackerTwo'
                            placeholder='Attacker'
                            value={inputState?.t1attackerTwo}
                        />

                    </div>

                    <div className='add-warehouse__warehouse-form'>
                        <h2 className='add-warehouse__warehouse-heading'>Team Two</h2>

                        <label className='wh-form__label' htmlFor='name-form'>
                            GoalKeeper
                        </label>
                        <input
                            className={
                                // inputState.t2goalKeeper === ""
                                //     ? 'add-wh__form-error'
                                     'add-wh__form before-form'
                            }
                            name='t2goalKeeper'
                            value={inputState?.t2goalKeeper}
                            onChange={errorHandler}
                            placeholder='GoalKeeper'
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Defender
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState.t2defenderOne === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='street-form'
                            name='t2defenderOne'
                            value={inputState?.t2defenderOne}
                            placeholder='Defender'
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Defender
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState.t2defenderTwo === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='street-form'
                            name='t2defenderTwo'
                            placeholder='Defender'
                            value={inputState?.t2defenderTwo}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Defender
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t2defenderThree === ""
                                //     ? 'add-wh__form-error'
                                     'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='street-form'
                            name='t2defenderThree'
                            placeholder='Defender'
                            value={inputState?.t2defenderThree}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Defender
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState.t2defenderFour === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='street-form'
                            name='t2defenderFour'
                            placeholder='Defender'
                            value={inputState?.t2defenderFour}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Midfielder
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t2midfielderOne === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='city-form'
                            name='t2midfielderOne'
                            placeholder='Midfielder'
                            value={inputState?.t2midfielderOne}

                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Midfielder
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t2midfielderTwo === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='city-form'
                            name='t2midfielderTwo'
                            placeholder='Midfielder'
                            value={inputState?.t2midfielderTwo}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Midfielder
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t2midfielderThree === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='city-form'
                            name='t2midfielderThree'
                            placeholder='Midfielder'
                            value={inputState?.t2midfielderThree}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Midfielder
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t2midfielderFour === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='city-form'
                            name='t2midfielderFour'
                            placeholder='Midfielder'
                            value={inputState?.t2midfielderFour}
                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Attacker
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t2attackerOne === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='country-form'
                            name='t2attackerOne'
                            placeholder='Attacker'
                            value={inputState?.t2attackerOne}

                        />

                        <label className='wh-form__label' htmlFor='name-form'>
                            Attacker
                        </label>
                        <input
                            type='text'
                            className={
                                // inputState?.t2attackerTwo === ""
                                //     ? 'add-wh__form-error'
                                    'add-wh__form before-form'
                            }
                            onChange={errorHandler}
                            id='country-form'
                            name='t2attackerTwo'
                            placeholder='Attacker'
                            value={inputState?.t2attackerTwo}
                        />
                    </div>
                </div>
                <div className='add-warehouse__button-section'>
                    <Link className='cancel-link' to='/game'>
                        Cancel
                    </Link>

                    <input type='submit' id='submit-button' value='Save Team' />
                </div>
            </form>


        </div>
    )
}

export default WarehouseDetails