import { useEffect, useRef, useState } from "react";
import GraphicalBoringLog from "./graphicalBoringLog";
import styles from '/styles/Home.module.scss'

export default function BoringLog({allData, setAllData, infoRef, boringSubLayers, setBoringSubLayers, boringDepthTotal, setBoringDepthTotal}) {
  const [alert, setAlert] = useState("");
  const boringRef = useRef(null);
  const initialRender = useRef(true);

  const layerElements = [];
  
  useEffect(() => {
    // Prevent effect from firing on initial render
    if (!initialRender.current) {
      let depthArray = boringRef.current.querySelectorAll('input[name=layerDepth]');
      depthArray[depthArray.length - 1].focus();
    } else {
      initialRender.current = false;
    }
  }, [boringSubLayers])

  function newLayer(e) {
    e.preventDefault();
    setBoringSubLayers(boringSubLayers + 1);
  }

  function delLayer(e) {
    e.preventDefault();
    if (boringSubLayers > 1) {
      setBoringSubLayers(boringSubLayers - 1);

      let tempAllData = {...allData};
      tempAllData.depths[boringSubLayers - 1] ? tempAllData.depths.pop() : null;
      tempAllData.types[boringSubLayers - 1] ? tempAllData.types.pop() : null;
      tempAllData.descriptions.pop();
      setAllData({
        ...tempAllData,
      });

      let tempDepthTotal = [...boringDepthTotal];
      tempDepthTotal.pop();
      setBoringDepthTotal(tempDepthTotal);
    }
  }

  const handleClear = (e) => {
    e.preventDefault();
    setAllData({
      ...allData,
      depths: [],
      types: [],
      descriptions: [],
    })
    setBoringSubLayers(1);
    setBoringDepthTotal([0]);
    boringRef.current.querySelectorAll('input[name=layerDepth]')[0].value="";
    boringRef.current.querySelectorAll('select[name=layerType]')[0].value="";
    boringRef.current.querySelectorAll('textarea[name=layerDesc]')[0].value="";
  }

  function createPDF(e) {
    e.preventDefault();

    if (checkDocument()) {
      fillEmpties();

      fetch(`${process.env.NEXT_PUBLIC_API_BORING}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(allData),
      }).then(response => {
        if (response.ok) {
          let res = response;
          if (response.headers.get('Content-Type').indexOf('application/json') > -1) {
            res = response.json();
          }
          return res;
        }
        return Promise.reject(response);
      }).then (response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${allData.id} - ${allData.location}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }).catch(error => {
        console.log(error);
      })

    } else {
      console.log("Fix issues before proceeding");
    }
  }

  
  const checkDocument = () => {
    // console.log(JSON.stringify({...allData}));

    crawl();
  
    if ((allData.types.length !== allData.depths.length) || (allData.descriptions.length > allData.depths.length)){
      setAlert("Ensure that all boring depth and soil type fields are filled out.");
      return false;
    } else if (!allData.id || !allData.location){
      setAlert("Ensure that Boring ID and Location fields are filled out.");
      return false;
    } else {
      for (let i = 0; i < allData.depths.length; i++) {
        if (parseFloat(allData.depths[i]) >= parseFloat(allData.depths[i+1])){
          setAlert("Check each layer depth is deeper than the one before it.");
          return false;
        }
        if (allData.depths[i] == "" || allData.types[i] == "") {
          setAlert("Ensure that all boring depth and soil type fields are filled out.");
          return false;
        }
      }
      setAlert(" ");
      return true;
    }
  }

  const crawl = () => {
    const layerDepths = boringRef.current.querySelectorAll('input[name=layerDepth]');
    const layerTypes = boringRef.current.querySelectorAll('select[name=layerType]');

    for (let i = 0; i < layerDepths.length; i++) {
      layerTypes[i].focus();
      layerDepths[i].focus();
    }

    if (allData.id == "") {
      infoRef.current.querySelector('input[name=label]').focus();
    }
    if (allData.location == "") {
      infoRef.current.querySelector('input[name=location]').focus();
    }
  }

  const fillEmpties = () => {
    let tempAllData = {...allData};
    for (let i = 0; i < tempAllData.depths.length; i++) {
      if (!tempAllData.descriptions[i]) {
        tempAllData.descriptions[i] = "";
      }
    }
    if (!tempAllData.siteName) {
      tempAllData.siteName = "";
    }
    if (!tempAllData.logBy) {
      tempAllData.logBy = "";
    }
    if (!tempAllData.company) {
      tempAllData.company = "";
    }
    if (!tempAllData.equip) {
      tempAllData.equip = "";
    }
    if (!tempAllData.date) {
      tempAllData.date = "";
    }
    if (!tempAllData.time) {
      tempAllData.time = "";
    }
    setAllData({...tempAllData});
  }
  
  const updateType = index => e => {
    let tempType = [...allData.types];
    tempType[index] = e.target.value;
    setAllData({
      ...allData,
      types: tempType,
    });
  }

  const updateDepth = index => e => {
    let tempDepth = [...allData.depths];
    tempDepth[index] = e.target.value;
    setAllData({
      ...allData,
      depths: tempDepth
    })
    let tempDepthTotal = [...boringDepthTotal];
    for (let i = index; i < allData.depths.length; i++) {
      tempDepthTotal[i+1] = tempDepth[i];
    }
    setBoringDepthTotal(tempDepthTotal);
  }

  const updateDesc = index => e => {
    let tempDesc = [...allData.descriptions];
    tempDesc[index] = e.target.value;
    setAllData({
      ...allData,
      descriptions: tempDesc,
    })
  }

  function subSurface() {
    
    for (let i = 0; i < boringSubLayers; i++){

      layerElements.push(
        <div key={i} className={styles.formRow}>
          <div className={styles.left}>

            {/* LAYER NUMBER */}
            <div className={styles.formCol}>
              <label className={styles.label}>Layer</label>
              <div className={styles.center}>{i+1}</div>
            </div>

            {/* DEPTH FROM */}
            <div className={styles.formCol}>
              <label className={styles.label}>From</label>
              <label className={styles.center}>{i == 0 ? 0 : boringDepthTotal[i]}</label>
            </div>

            {/* DEPTH TO */}
            <div className={styles.formCol}>
              <label className={styles.label} htmlFor="layerDepth">To</label>
              <input className={styles.depth} name="layerDepth" type="number" min={boringDepthTotal[i]} step="0.5" value={allData.depths[i]} placeholder="required" 
                onBlur={(e) => allData.depths[i] ? e.target.style.border="1px solid #333" : e.target.style.border="3px solid red"} onChange={updateDepth(i)}/>
            </div>

            {/* TYPE */}
            <div className={styles.formCol}>
              <label className={styles.label} htmlFor="layerType">Type</label>
              <select className={styles.boringInput} name="layerType" value={allData.types[i]} onBlur={(e) => allData.types[i] ? e.target.style.border="1px solid #333" : e.target.style.border="3px solid red"} onChange={updateType(i)}>
                <option value="">Choose One:</option>
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
          </div>

          {/* DESCRIPTION */}
          <div className={styles.descContainer}>
            <div className={styles.formCol}>
              <label className={styles.label} htmlFor="layerDesc">Description</label>
              <textarea className={styles.desc}  name="layerDesc" type="text" value={allData.descriptions[i]} onChange={updateDesc(i)}/>
            </div>
          </div>
        </div>

      )
    }

    return (
      <form ref={boringRef} className={styles.form}>
        <h2>Boring Log Data: </h2>
        {layerElements}
        <div className={styles.buttonContainer}>
          <button onClick={newLayer}>New Row</button>
          <button onClick={delLayer}>Delete Row</button>
          <button onClick={handleClear}>Clear Log</button>
          <button onClick={createPDF}>Create PDF</button>
        </div>
        <div><b>{alert}</b></div>
      </form>
    )
  }
  
  return (
    <div>
      {subSurface()}
      
      <GraphicalBoringLog
        allData={allData}
        subLayers={boringSubLayers}
        depthTotal={boringDepthTotal}
      />
    </div>
  )
}