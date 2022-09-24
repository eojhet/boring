import styles from '/styles/Home.module.scss'
import { useState } from 'react';
import Select from "react-select";

export default function DrillerInfo() {
  const [subLayers, setSubLayers] = useState(1);
  const layerElements = [];

  const layerOptions = [
    { value: 'clay', label: 'Clay' },
    { value: 'sandyClay', label: 'Sandy Clay' },
    { value: 'gravellyClay', label: 'Gravelly Clay' },
    { value: 'silt', label: 'Silt' },
    { value: 'sandySilt', label: 'Sandy Silt' },
    { value: 'gravellySilt', label: 'Gravelly Silt' },
    { value: 'sand', label: 'Sand' },
    { value: 'gravel', label: 'Gravel' }
  ]

  function newLayer(e) {
    e.preventDefault();
    setSubLayers(subLayers + 1);
  }  

  function subSurface() {

    for (let i = 0; i < subLayers; i++){
      layerElements.push(
        <div className={styles.formRow}>
           <div className={styles.formCol}>
            <label for="layerDesc">Depth (feet): </label>
            <input name="layerDesc" type="number"/>
          </div>
          <div className={styles.formCol}>
            <label for="layerType">Type: </label>
            <select name="layerType" options={layerOptions}>
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
            <label for="layerDesc">Description: </label>
            <textarea name="layerDesc" type="text"/>
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
          <label for="dateD">Date Drilled: </label>
          <input name="dateD" type="date"/>
        </div>
        <div className={styles.formRow}>
          <label for="logBy">Logged By: </label>
          <input name="logBy" type="text"/>
        </div>
        <div className={styles.formRow}>
          <label for="company">Company: </label>
          <input name="company" type="text"/>
        </div>
        <div className={styles.formRow}>
          <label for="equip">Equipement: </label>
          <input name="equip" type="text"/>
        </div>
      </form>
      {subSurface()}
    </div>
  );
}