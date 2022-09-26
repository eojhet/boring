import styles from '/styles/Home.module.scss'
import { useState } from 'react';
import BoringLog from './boringLog';

export default function DrillerInfo({}) {
  const [subLayers, setSubLayers] = useState(1);
  const [data, setData] = useState({});
  const [depth, setDepth] = useState([]);
  const [depthTotal, setDepthTotal] = useState([]);
  const [type, setType] = useState([]);
  const [desc, setDesc] = useState([]);

  const layerElements = [];

  function newLayer(e) {
    e.preventDefault();
    setSubLayers(subLayers + 1);
  }  

  function delLayer(e) {
    e.preventDefault();
    if (subLayers > 1) {
      setSubLayers(subLayers - 1);
      let tempType = [...type];
      tempType.pop();
      setType(tempType);
      let tempDepth = [...depth];
      tempDepth.pop();
      setDepth(tempDepth);
      let tempDepthTotal = [...depthTotal];
      tempDepthTotal.pop();
      setDepthTotal(tempDepthTotal);
      let tempDesc = [...desc];
      tempDesc.pop();
      setDesc([...tempDesc]);
    }
  }

  const updateType = index => e => {
    let tempType = [...type];
    tempType[index] = e.target.value;
    setType(tempType);
  }

  const updateDepth = index => e => {
    let tempDepth = [...depth];
    tempDepth[index] = e.target.value;
    setDepth(tempDepth);
    let tempDepthTotal = [...depthTotal];
    for (let i = index; i < depth.length; i++) {
      tempDepthTotal[i+1] = tempDepth[i];
    }
    setDepthTotal(tempDepthTotal);
  }

  const updateDesc = index => e => {
    let tempDesc = [...desc];
    tempDesc[index] = e.target.value;
    setDesc(tempDesc);
  }

  function subSurface() {
    
    for (let i = 0; i < subLayers; i++){

      layerElements.push(
        <div key={i} className={styles.formRow}>
          {/* LAYER NUMBER */}
          <div className={styles.formCol}>
            <label className={styles.label}>Layer</label>
            <div className={styles.center}>{i+1}</div>
          </div>
          {/* DEPTH FROM */}
          <div className={styles.formCol}>
            <label className={styles.label}>From </label>
            <label className={styles.center}>{i == 0 ? 0 : depthTotal[i]}</label>
          </div>
          {/* DEPTH TO */}
          <div className={styles.formCol}>
            <label className={styles.label} htmlFor="layerDepth">To: </label>
            <input className={styles.input} name="layerDepth" type="number" min={depthTotal[i]} step="0.5" value={depth[i]} onChange={updateDepth(i)}/>

          </div>
          {/* TYPE */}
          <div className={styles.formCol}>
            <label className={styles.label} htmlFor="layerType">Type: </label>
            <select className={styles.input} name="layerType" value={type[i]} onChange={updateType(i)}>
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
          {/* DESCRIPTION */}
          <div className={styles.formCol}>
            <label className={styles.label} htmlFor="layerDesc">Description: </label>
            <textarea className={styles.desc}  name="layerDesc" type="text" value={desc[i]} onChange={updateDesc(i)}/>
          </div>
        </div>
      )
    }

    return (
      <form className={styles.form}>
        {layerElements}
        <div>
          <button onClick={newLayer}>New Row</button>
          <button onClick={delLayer}>Delete Row</button>
        </div>
      </form>
    )
  }

  return (
    <div>
      <form className={styles.form}>
        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="dateD">Date Drilled: </label>
          <input className={styles.infoInput} name="dateD" type="date" value={data.date} onChange={e=>setData(data => ({
            ...data,
            "date": e.target.value
          }))} />
        </div>
        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="logBy">Logged By: </label>
          <input className={styles.infoInput} name="logBy" type="text" value={data.logBy} onChange={e=>setData(data => ({
            ...data,
            "logBy": e.target.value
            }))}/>
        </div>
        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="company">Company: </label>
          <input className={styles.infoInput} name="company" type="text" value={data.company} onChange={e=>setData(data => ({
            ...data,
            "company": e.target.value
            }))}/>
        </div>
        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="equip">Equipment: </label>
          <input className={styles.infoInput} name="equip" type="text" value={data.equip} onChange={e=>setData(data => ({
            ...data,
            "equip": e.target.value
            }))}/>
        </div>
      </form>
      {subSurface()}
      <BoringLog
        data={data}
        depth={depth}
        type={type}
        desc={desc}
        subLayers={subLayers}
        depthTotal={depthTotal}
      />
    </div>
  );
}