import styles from '/styles/Home.module.scss'
import { useEffect, useState } from 'react';
import BoringLog from './boringLog';

export default function DrillerInfo({}) {
  const [subLayers, setSubLayers] = useState(1);
  const [data, setData] = useState({});
  const [depth, setDepth] = useState([]);
  const [depthTotal, setDepthTotal] = useState([0]);
  const [type, setType] = useState([]);
  const [desc, setDesc] = useState([]);
  const [allData, setAllData] = useState({});
  const [alert, setAlert] = useState("");

  const layerElements = [];

  useEffect(() => {
    if (checkDocument()) {
      fetch(`${process.env.NEXT_PUBLIC_API_URI}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(allData),
      }).then(response => {
        if (response.ok) {
          let data = response;
          if (response.headers.get('Content-Type').indexOf('application/json') > -1) {
            data = response.json();
          }
          return data;
        }
        return Promise.reject(response);
      }).then (response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${data.id} - ${data.location}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }).catch(error => {
        console.log(error);
      })
    }
  },[allData])

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

  function createPDF(e) {
    e.preventDefault();

    if (checkDocument()) {
      fillEmpties();
      setAllData({
        ...data,
        depths: depth,
        types: type,
        descriptions: desc
      });      
    } else {
      console.log("Fix issues before proceeding");
    }
  }

  const checkDocument = () => {
    // console.log(JSON.stringify({...data, depths: depth, types: type, descriptions: desc}));
    // console.log(`${process.env.NEXT_PUBLIC_API_URI}`);
    if ((type.length !== depth.length) || (desc.length > depth.length)){
      setAlert("Ensure that all boring depth and soil type fields are filled out.");
      return false;
    } else if (!data.id || !data.location){
      setAlert("Ensure that Boring ID and Location fields are filled out.");
      return false;
    } else {
      for (let i = 0; i < depth.length - 1; i++) {
        if (parseFloat(depth[i]) >= parseFloat(depth[i+1])){
          setAlert("Check each layer depth is deeper than the one before it.");
          return false;
        }
      }
      setAlert(" ");
      return true;
    }
  }

  const fillEmpties = () => {
    for (let i = 0; i < type.length; i++) {
      if (!desc[i]) {
        desc[i] = " ";
      }
    }
    if (!data.logBy) {
      data.logBy = " ";
    }
    if (!data.company) {
      data.company = " ";
    }
    if (!data.equip) {
      data.equip = " ";
    }
    if (!data.date) {
      data.date = " ";
    }
    if (!data.time) {
      data.time = " ";
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
            <input className={styles.input} name="layerDepth" type="number" min={depthTotal[i]} step="0.5" value={depth[i]} placeholder="required" 
              onBlur={(e) => depth[i] ? e.target.style.backgroundColor="white" : e.target.style.backgroundColor="red"} onChange={updateDepth(i)}/>
          </div>
          {/* TYPE */}
          <div className={styles.formCol}>
            <label className={styles.label} htmlFor="layerType">Type: </label>
            <select className={styles.input} name="layerType" value={type[i]} onBlur={(e) => {type[i] ? e.target.style.backgroundColor="#eaeaea" : e.target.style.backgroundColor="red"}} onChange={updateType(i)}>
              <option value="chooseOne">Choose One:</option>
              <option value="topSoil">Top Soil</option>
              <option value="clay">Clay</option>
              <option value="siltyClay">Silty Clay</option>
              <option value="sandyClay">Sandy Clay</option>
              <option value="silt">Silt</option>
              <option value="claySilt">Clay Silt</option>
              <option value="sandySilt">Sandy Silt</option>
              <option value="sand">Sand</option>
              <option value="claySand">Clay Sand</option>
              <option value="siltySand">Silty Sand</option>
              <option value="gravel">Gravel</option>
              <option value="siltyGravel">Silty Gravel</option>
              <option value="sandyGravel">Sandy Gravel</option>
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
          <button onClick={createPDF}>Create PDF</button>
        </div>
        <div><b>{alert}</b></div>
      </form>
    )
  }

  return (
    <div>
      <form className={styles.form}>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="label">Boring ID: </label>
          <input className={styles.infoInput} name="label" type="text" value={data.id} placeholder="required" onChange={e=>setData(data => ({
            ...data,
            "id": e.target.value
            }))}/>
        </div>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="location">Location: </label>
          <input className={styles.infoInput} name="location" type="text" value={data.location} placeholder="required" onChange={e=>setData(data => ({
            ...data,
            "location": e.target.value
            }))}/>
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

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="date">Date: </label>
          <input className={styles.infoInput} name="date" type="date" value={data.date} onChange={e=>setData(data => ({
            ...data,
            "date": e.target.value
            }))}/>
        </div>

        <div className={styles.formRow}>
          <label className={styles.infoLabel} htmlFor="time">Time: </label>
          <input className={styles.infoInput} name="time" type="time" value={data.time} onChange={e=>setData(data => ({
            ...data,
            "time": e.target.value
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
      
      <div>&nbsp;</div>
      
    </div>
  );
}