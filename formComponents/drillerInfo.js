import styles from '/styles/Home.module.scss'
import { useState } from 'react';
import Select from "react-select";

export default function DrillerInfo() {
  const [subLayers, setSubLayers] = useState(1);
  const [data, setData] = useState({});
  const layerElements = [];

  // const layerOptions = [
  //   { value: 'clay', label: 'Clay' },
  //   { value: 'sandyClay', label: 'Sandy Clay' },
  //   { value: 'gravellyClay', label: 'Gravelly Clay' },
  //   { value: 'silt', label: 'Silt' },
  //   { value: 'sandySilt', label: 'Sandy Silt' },
  //   { value: 'gravellySilt', label: 'Gravelly Silt' },
  //   { value: 'sand', label: 'Sand' },
  //   { value: 'gravel', label: 'Gravel' }
  // ]

  function newLayer(e) {
    e.preventDefault();
    setSubLayers(subLayers + 1);
  }  

  function subSurface() {
    
    for (let i = 0; i < subLayers; i++){
      let layerDepth = `layerDepth${i}`
      let layerType = `layerType${i}`
      let layerDesc = `layerDesc${i}`
      layerElements.push(
        <div key={i} className={styles.formRow}>
          <div className={styles.formCol}>
            <label>Layer: </label>
            <label>{i+1}</label>
          </div>
          <div className={styles.formCol}>
            <label htmlFor="layerDepth">Depth (feet): </label>

            <input name="layerDepth" type="number" value={data[layerDepth]} onChange={e=>setData(data => ({
            ...data,
            [layerDepth] : e.target.value
            }))}/>

          </div>
          <div className={styles.formCol}>
            <label htmlFor="layerType">Type: </label>
            <select name="layerType" value={data[layerType]} onChange={e=>setData(data => ({
              ...data,
              [layerType] : e.target.value
            }))}>
              <option value="chooseOne">Choose One:</option>
              <option value="clay">Clay</option>
              <option value="sandyClay">Sandy Clay</option>
              <option value="gravellyClay">Gravelly Clay</option>
              <option value="sand">Sand</option>
              <option value="silt">Silt</option>
              <option value="sandySilt">Sandy Silt</option>
              <option value="gravellySilt">Gravelly Silt</option>
              <option value="gravel">Gravel</option>
              <option value="topSoil">Top Soil</option>
            </select>
          </div>
          <div className={styles.formCol}>
            <label htmlFor="layerDesc">Description: </label>
            <textarea name="layerDesc" type="text" value={data[layerDesc]} onChange={e=>setData(data => ({
            ...data,
            [layerDesc] : e.target.value
            }))}/>
          </div>
        </div>
      )
    }

    return (
      <form className={styles.form}>
        {layerElements}
        <button onClick={newLayer}>New Row</button>
      </form>
    )
  }

  return (
    <div>
      <form className={styles.form}>
        <div className={styles.formRow}>
          <label htmlFor="dateD">Date Drilled: </label>
          <input name="dateD" type="date" value={data.date} onChange={e=>setData(data => ({
            ...data,
            "date": e.target.value
          }))} />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="logBy">Logged By: </label>
          <input name="logBy" type="text" value={data.logBy} onChange={e=>setData(data => ({
            ...data,
            "logBy": e.target.value
            }))}/>
        </div>
        <div className={styles.formRow}>
          <label htmlFor="company">Company: </label>
          <input name="company" type="text" value={data.company} onChange={e=>setData(data => ({
            ...data,
            "company": e.target.value
            }))}/>
        </div>
        <div className={styles.formRow}>
          <label htmlFor="equip">Equipment: </label>
          <input name="equip" type="text" value={data.equip} onChange={e=>setData(data => ({
            ...data,
            "equip": e.target.value
            }))}/>
        </div>
      </form>
      {subSurface()}
    </div>
  );
}