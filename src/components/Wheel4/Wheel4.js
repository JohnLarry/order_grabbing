import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { authkey } from "../Login/authkey";
import './Wheel4.css'
import { IoIosArrowBack } from "react-icons/io";
import { AiFillQuestionCircle } from 'react-icons/ai';

const Wheel4 = () => {

    const data = [
        { option: "0" },
        { option: "5" },
        { option: "10" },
        { option: "0" },
        { option: "15" },
        { option: "20" },
        { option: "30" },
        { option: "0" },
        { option: "50" },
        { option: "80" },
        { option: "90" },

    ];

    

    const [winner, setWinner] = useState(0);

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [winDataT, setWinDataT] = useState({});
    const [test, setTest] = useState(0);

    const [userName, setUserName] = useState(0);

    var dashboard = new FormData();
    dashboard.append("dashboard", "");
    dashboard.append("auth", authkey);
    dashboard.append("logged", localStorage.getItem("auth"));
    useEffect(() => {
      fetch("https://mining-nfts.com/api/", {
        method: "POST",
        body: dashboard,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
           
            setUserName(data.message.user[0]);
  
          }
        });
    }, []);



    const navigate = useNavigate();
    useEffect(() => {
        var history = new FormData();
        history.append("spinner", "");
        history.append("auth", authkey);
        history.append("logged", localStorage.getItem('auth'));
        fetch("https://mining-nfts.com/api/", {
            method: "POST",
            body: history,
        })
            .then((res) => res.json())
            .then((winHistory) => {
                if (winHistory.status == 200) {
                    setWinDataT(winHistory.message);

                } else {
                    navigate("/login");
                }
            });
    }, []);

    const runSpin = () => {
        var runSpinData = new FormData();
        runSpinData.append("runSpin", "");
        runSpinData.append("spinner", "");
        runSpinData.append("auth", authkey);
        runSpinData.append("logged", localStorage.getItem('auth'));
        fetch("https://mining-nfts.com/api/", {
            method: "POST",
            body: runSpinData,
        })
            .then((res) => res.json())
            .then((spHs) => {
                if (spHs.status == 200) {
                    setWinDataT(spHs.message);
                    if (spHs.message.winNumber == 'auto') {

                        const newPrize = Math.floor(Math.random() * data.length);
                        const newPrizeNumber = newPrize;
                        const item = data[newPrizeNumber];
                        setPrizeNumber(newPrizeNumber);
                        setMustSpin(true);
                        setWinner(item);
                        if (newPrize != 0) {
                            var eewrER = new FormData();
                            eewrER.append("winAmount", newPrize);
                            eewrER.append("auth", authkey);
                            eewrER.append("logged", localStorage.getItem('auth'));
                            fetch("https://mining-nfts.com/api/", {
                                method: "POST",
                                body: eewrER,
                            })
                                .then((res) => res.json())
                                .then((sdfRTE) => {
                                    if (sdfRTE.status == 100) {
                                        toast.error(spHs.message);

                                    }

                                }, []);
                        }


                    } else {
                        const newPrize = spHs.message.winNumber;
                        const newPrizeNumber = newPrize;
                        const item = data[newPrizeNumber];
                        setPrizeNumber(newPrizeNumber);
                        setMustSpin(true);
                        setWinner(item);
                    }

                } else if (spHs.status == 100) {
                    toast.error(spHs.message.message);
                    setMustSpin(false);

                } else {
                    navigate("/login");
                }

            }, []);
    }





    const handleSpinClick = () => {

        if (test == 0 && winDataT?.spinLeft == 0) {
            setMustSpin(false)
            swal({
                title: "Are you sure?",
                text: "You will be charged $5 fee for this spin",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        setTest(1);
                        runSpin();

                    } else {
                        setMustSpin(false)
                    }
                });
        } else {
            runSpin();

        }


        if (winDataT.spinLeft < 0) {

        }

    }


    return (
        <div className="container max-w-[1080] mx-auto ">
            <div className="bg-base-200 px-4 py-2 rounded-xl mt-5 mx-3 flex items-center justify-between">
                <Link to="/profile" className="btn btn-base-200 rounded-full px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg> Back
                </Link>
                <h1 className="text-xl font-bold text-center"> Wheel of Fortune</h1>
            </div>

            <div className="wheel-decider">
                <div id="successInfo" className="my-4 text-xl text-center text-slate-800">
                    <span className="font-bold  ">Daily Free Spins: </span>
                    {winDataT.spinLeft <= 0 ? <span className="font-bold lg:text-xl pt-5 pb-16 text-blue-800">0</span>

                        :
                        <span className="font-bold lg:text-xl pt-5 pb-16 text-blue-800">1  {winDataT.spinLeft} </span>

                    }
                    <span>  <label
                        htmlFor="my-modal-8"
                        className="btn p-0 modal-button bg-transparent border-0 hover:bg-transparent"
                    >
                        <AiFillQuestionCircle className=" text-error text-xl"></AiFillQuestionCircle>
                    </label>
                        <input
                            type="checkbox"
                            id="my-modal-8"
                            className="modal-toggle"
                        />
                        <div className="modal">
                            <div className="modal-box relative">
                                <label
                                    htmlFor="my-modal-8"
                                    className="btn btn-xs btn-circle absolute right-2 top-2"
                                >
                                    ✕
                                </label>

                                <p className="text-xs md:text-sm mt-10">
                                    Free daily spins do not accumulate.
                                    You are limited to 1 unused free spin.
                                </p>
                            </div>
                        </div>
                    </span>
                </div>
            </div>

            <div className="wheel-decider pb-5" >
                <Wheel className="flex justify-center "
                    backgroundColors={["#081135", "#570C31"]}
                    textColors={["#ffffff"]}
                    // onStopSpinning={stopSpin}
                    radiusLineWidth={2}
                    outerBorderWidth={10}
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}

                    data={data}
                    onStopSpinning={() => {
                        setMustSpin(false);
                    }}
                />
            </div>

            <div className="wheel-decider">
                {winDataT.spinLeft <= 0 ?
                    <button type="button" disabled={mustSpin == true} onClick={handleSpinClick} className="btn btn-primary" >Spin For 5$</button>
                    :
                    <button disabled={mustSpin == true} className="btn btn-primary" onClick={handleSpinClick}>
                        Free Spin
                    </button>
                }
            </div>

            <div className="wheel-decider">
                <div >
                    <h2 className="text-2xl font-bold py-8">
                        {mustSpin == true
                            ? (<span className="pl-2"></span>)
                            : (<span className="pl-2"> You win  {winner.option}</span>)
                        }</h2>
                </div>
            </div>

            <div className="wheel-decider">
                <div className="text-slate-800 my-10 card w-full bg-white rounded shadow-xl mx-5">
                    <div className="card-body">

                        <p className="text-justify">After you depleted your free daily spin you can try your luck with
                            more spins. Each spin will cost you 5 USDT which will automatically
                            removed upon use from your Grab Balance.</p>
                        <h2 className="card-title font-bold">
                            <span className="text-teal-900"> Good luck,</span>
                            <span className="text-blue-800"> {userName?.username}!</span></h2>

                    </div>
                </div>
            </div>

        </div>

    );
};

export default Wheel4;