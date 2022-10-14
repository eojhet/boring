import { useEffect, useRef, useState } from "react";
import GraphicalBoringLog from "./graphicalBoringLog";
import styles from '/styles/Home.module.scss'

export default function BoringLog({allData, setAllData, infoRef}) {
  const [subLayers, setSubLayers] = useState(1);
  const [alert, setAlert] = useState("");
  const [depthTotal, setDepthTotal] = useState([0]);

  const boringRef = useRef(null);
  
  const layerElements = [];
  
  useEffect(() => {
    let depthArray = boringRef.current.querySelectorAll('input[name=layerDepth]');
    depthArray[depthArray.length - 1].focus();
  }, [subLayers])


  function newLayer(e) {
    e.preventDefault();
    setSubLayers(subLayers + 1);
  }

  function delLayer(e) {
    e.preventDefault();
    if (subLayers > 1) {
      setSubLayers(subLayers - 1);

      let tempAllData = {...allData};
      tempAllData.depths[subLayers - 1] ? tempAllData.depths.pop() : null;
      tempAllData.types[subLayers - 1] ? tempAllData.types.pop() : null;
      tempAllData.descriptions.pop();
      setAllData({
        ...tempAllData,
      });

      let tempDepthTotal = [...depthTotal];
      tempDepthTotal.pop();
      setDepthTotal(tempDepthTotal);
    }
  }

  function createPDF(e) {
    e.preventDefault();

    if (checkDocument()) {
      fillEmpties();

      fetch(`${process.env.NEXT_PUBLIC_API_URI}`, {
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
    console.log(JSON.stringify({...allData}));
    
    crawl();
  
    if ((allData.types.length !== allData.depths.length) || (allData.descriptions.length > allData.depths.length)){
      setAlert("Ensure that all boring depth and soil type fields are filled out.");
      return false;
    } else if (!allData.id || !allData.location){
      setAlert("Ensure that Boring ID and Location fields are filled out.");
      return false;
    } else {
      for (let i = 0; i < allData.depths.length - 1; i++) {
        if (parseFloat(allData.depths[i]) >= parseFloat(allData.depths[i+1])){
          setAlert("Check each layer depth is deeper than the one before it.");
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

    infoRef.current.querySelector('input[name=label]').focus();
    infoRef.current.querySelector('input[name=location]').focus();
    
    for (let i = 0; i < layerDepths.length; i++) {
      layerTypes[i].focus();
      layerDepths[i].focus();
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
    let tempDepthTotal = [...depthTotal];
    for (let i = index; i < allData.depths.length; i++) {
      tempDepthTotal[i+1] = tempDepth[i];
    }
    setDepthTotal(tempDepthTotal);
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
    
    for (let i = 0; i < subLayers; i++){

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
              <label className={styles.label}>From </label>
              <label className={styles.center}>{i == 0 ? 0 : depthTotal[i]}</label>
            </div>

            {/* DEPTH TO */}
            <div className={styles.formCol}>
              <label className={styles.label} htmlFor="layerDepth">To: </label>
              <input className={styles.boringInput} name="layerDepth" type="number" min={depthTotal[i]} step="0.5" value={allData.depths[i]} placeholder="required" 
                onBlur={(e) => allData.depths[i] ? e.target.style.border="1px solid #333" : e.target.style.border="3px solid red"} onChange={updateDepth(i)}/>
            </div>

            {/* TYPE */}
            <div className={styles.formCol}>
              <label className={styles.label} htmlFor="layerType">Type: </label>
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
              <label className={styles.label} htmlFor="layerDesc">Description: </label>
              <textarea className={styles.desc}  name="layerDesc" type="text" value={allData.descriptions[i]} onChange={updateDesc(i)}/>
            </div>
          </div>
        </div>

      )
    }

    return (
      <form ref={boringRef} className={styles.form}>
        {layerElements}
        <div className={styles.buttonContainer}>
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
      {subSurface()}
      
      <GraphicalBoringLog
        allData={allData}
        subLayers={subLayers}
        depthTotal={depthTotal}
      />
    </div>
  )
}