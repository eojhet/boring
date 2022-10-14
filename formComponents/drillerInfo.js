import styles from '/styles/Home.module.scss'
import { useState, useRef, useEffect } from 'react';
import GraphicalBoringLog from './graphicalBoringLog';
import BoringLog from './boringLog';

export default function DrillerInfo({}) {
  const infoRef = useRef(null);

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
  });

  return (
    <div>
      <form ref={infoRef} className={styles.form}>
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

      </form>

      <BoringLog 
        allData={allData}
        setAllData={setAllData}
        infoRef={infoRef}
      />
            
    </div>
  );
}