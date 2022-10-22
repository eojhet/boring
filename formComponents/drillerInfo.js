import styles from '/styles/Home.module.scss'
import { useState, useRef, useEffect } from 'react';
import BoringLog from './boringLog';
import ConstructionLog from './constructionLog';

export default function DrillerInfo({}) {
  const [boringInput, setBoringInput] = useState(true);
  const [boringSubLayers, setBoringSubLayers] = useState(1);
  const [constructionSubLayers, setConstructionSubLayers] = useState(1);
  const [boringDepthTotal, setBoringDepthTotal] = useState([0]);
  const [constructionDepthTotal, setConstructionDepthTotal] = useState([0]);


  const [allData, setAllData] = useState({
    id: "",
    location: "",
    siteName: "",
    logBy: "",
    company: "",
    equip: "",
    date: "",
    time: "",
    depths: [],
    types: [],
    descriptions: [],
    standupHeight: "",
    casingDepth: "",
    casingDesc: "Two-inch solid PVC",
    screenDepth: "",
    screenDesc: "Two-inch slotted PVC",
    materialDepths: [],
    materialTypes: [],
    materialDescriptions: [],
  });

  const handleDemo = (e) => {
    e.preventDefault();
    setAllData({
      id: "MW-1",
      location: "123 Franklin St, Chesapeake, VA",
      siteName: "Albert Property",
      logBy: "Dog Bounty",
      company: "Steve's Holes Inc.",
      equip: "Hand Auger",
      date: "2021-09-13",
      time: "07:50",
      depths: ["1","4","8","16"],
      types: ["topSoil", "clay", "claySand", "sand"],
      descriptions: ["Topsoil", "Hard red clay", "Loose beige clay sand", "Dark petroleum contaminated sand"],
      standupHeight: "1.5", //test
      casingDepth: "5", //test
      casingDesc: "Two-inch solid PVC",
      screenDepth: "16", //test
      screenDesc: "Two-inch slotted PVC",
      materialDepths: ["0.5","1","16"], //test
      materialTypes: ["backFill","seal","filterPack"], //test
      materialDescriptions: ["Topsoil","Medium Bentonite Chips", "No. 2 Gravel Pack"], //test
    });
    setBoringSubLayers(4);
    setConstructionSubLayers(3);
    setBoringDepthTotal([0,"1","4","8","16"])
    setConstructionDepthTotal([0,"0.5","1","16"])
  }

  const handleClear = (e) => {
    e.preventDefault();
    setAllData({
      ...allData,
      id: "",
      location: "",
      siteName: "",
      logBy: "",
      company: "",
      equip: "",
      date: "",
      time: "",
    })
  }

  const infoRef = useRef(null);

  useEffect(() => {
    infoRef.current.querySelector('input[name=label]').focus();
  },[])

  return (
    <div>
      <div ref={infoRef} className={styles.form}>
        <div><h2>Basic Info: </h2></div>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="label">Boring ID: </label>
          <input className={styles.infoInput} onBlur={(e) => allData.id ? e.target.style.border="1px solid #333" : e.target.style.border="3px solid red"} name="label" type="text" value={allData.id} placeholder="required" onChange={e=>setAllData({
            ...allData,
            id: e.target.value,
          })}/>
        </div>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="location">Location: </label>
          <input className={styles.infoInput} onBlur={(e) => allData.location ? e.target.style.border="1px solid #333" : e.target.style.border="3px solid red"} name="location" type="text" value={allData.location} placeholder="required" onChange={e=>setAllData({
            ...allData,
            location: e.target.value,
          })}/>
        </div>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="siteName">Site Name: </label>
          <input className={styles.infoInput} name="siteName" type="text" value={allData.siteName} onChange={e=>setAllData({
            ...allData,
            siteName: e.target.value,
          })}/>
        </div>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="logBy">Logged By: </label>
          <input className={styles.infoInput} name="logBy" type="text" value={allData.logBy} onChange={e=>setAllData({
            ...allData,
            logBy: e.target.value,
          })}/>
        </div>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="company">Company: </label>
          <input className={styles.infoInput} name="company" type="text" value={allData.company} onChange={e=>setAllData({
            ...allData,
            company: e.target.value,
          })}/>
        </div>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="equip">Equipment: </label>
          <input className={styles.infoInput} name="equip" type="text" value={allData.equip} onChange={e=>setAllData({
            ...allData,
            equip: e.target.value,
          })}/>
        </div>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="date">Date: </label>
          <input className={styles.infoInput} name="date" type="date" value={allData.date} onChange={e=>setAllData({
            ...allData,
            date: e.target.value,
          })}/>
        </div>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="time">Time: </label>
          <input className={styles.infoInput} name="time" type="time" value={allData.time} onChange={e=>setAllData({
            ...allData,
            time: e.target.value,
          })}/>
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={e => {
            e.preventDefault();
            setBoringInput(!boringInput);
          }}>{boringInput ? "Well Construction" : "Boring Log"}</button>
          <button onClick={handleClear}>Clear Info</button>
          <button onClick={handleDemo}>DEMO</button>
        </div>
      </div>

      {boringInput ? 
      <BoringLog 
        allData={allData}
        setAllData={setAllData}
        infoRef={infoRef}
        boringSubLayers={boringSubLayers}
        setBoringSubLayers={setBoringSubLayers}
        boringDepthTotal={boringDepthTotal}
        setBoringDepthTotal={setBoringDepthTotal}
      /> : 
      <ConstructionLog 
        allData={allData}
        setAllData={setAllData}
        infoRef={infoRef}
        constructionSubLayers={constructionSubLayers}
        setConstructionSubLayers={setConstructionSubLayers}
        constructionDepthTotal={constructionDepthTotal}
        setConstructionDepthTotal={setConstructionDepthTotal}
      />}
            
    </div>
  );
}