import { useEffect, useRef, useState } from "react";
import GraphicalConstructionLog from "./graphicalConstructionLog";
import styles from '/styles/Home.module.scss'

export default function ConstructionLog({allData, setAllData, infoRef, constructionSubLayers, setConstructionSubLayers, constructionDepthTotal, setConstructionDepthTotal}) {
  const [alert, setAlert] = useState("");
  const boringRef = useRef(null);
  const initialRender = useRef(true);

  const layerElements = [];
  
  useEffect(() => {
    // Prevent effect from firing on initial render
    if (!initialRender.current) {

      try {
        let depthArray = boringRef.current.querySelectorAll('input[name=materialDepth]');
        depthArray[depthArray.length - 1].focus();
      } catch (error){
        setConstructionSubLayers(1);
      }
        
    } else {
      initialRender.current = false;
    }
  }, [constructionSubLayers])

  function newLayer(e) {
    e.preventDefault();
    setConstructionSubLayers(constructionSubLayers + 1);
  }

  function delLayer(e) {
    e.preventDefault();
    if (constructionSubLayers > 1) {
      setConstructionSubLayers(constructionSubLayers - 1);

      let tempAllData = {...allData};
      tempAllData.materialDepths[constructionSubLayers - 1] ? tempAllData.materialDepths.pop() : null;
      tempAllData.materialTypes[constructionSubLayers - 1] ? tempAllData.materialTypes.pop() : null;
      tempAllData.materialDescriptions[constructionSubLayers - 1] ? tempAllData.materialDescriptions.pop() : null;
      setAllData({
        ...tempAllData,
      });

      let tempDepthTotal = [...constructionDepthTotal];
      tempDepthTotal.pop();
      setConstructionDepthTotal(tempDepthTotal);
    }
  }

  const handleClear = (e) => {
    e.preventDefault();
    setAllData({
      ...allData,
      standupHeight: "",
      casingDepth: "",
      casingDesc: "Two-inch solid PVC",
      screenDepth: "",
      screenDesc: "Two-inch slotted PVC",
      materialDepths: [],
      materialTypes: [],
      materialDescriptions: []
    })
    setConstructionSubLayers(1);
    setConstructionDepthTotal([0]);
    boringRef.current.querySelectorAll('input[name=materialDepth]')[0].value="";
    boringRef.current.querySelectorAll('select[name=materialType]')[0].value="";
    boringRef.current.querySelectorAll('textarea[name=materialDesc]')[0].value="";
  }

  function createPDF(e) {
    e.preventDefault();

    if (checkDocument()) {
      fillEmpties();

      fetch(`${process.env.NEXT_PUBLIC_API_CONSTRUCTION}`, {
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
  
    if ((allData.materialTypes.length !== allData.materialDepths.length) || (allData.materialDescriptions.length > allData.materialDepths.length)){
      setAlert("Ensure that all boring depth and soil type fields are filled out.");
      return false;
    } else if (!allData.id || !allData.location){
      setAlert("Ensure that Boring ID and Location fields are filled out.");
      return false;
    } else if (parseFloat(allData.screenDepth) > parseFloat(allData.materialDepths[allData.materialDepths.length-1])) {
      setAlert("Boring should be at least as deep as screen");
      return false;
    } else {
      for (let i = 0; i < allData.materialDepths.length; i++) {
        if (parseFloat(allData.materialDepths[i]) >= parseFloat(allData.materialDepths[i+1])){
          setAlert("Check each layer depth is deeper than the one before it.");
          return false;
        }
        if (allData.materialDepths[i] == "" || allData.materialTypes[i] == "") {
          setAlert("Ensure that all boring depth and soil type fields are filled out.");
          return false;
        }
      }
      setAlert(" ");
      return true;
    }
  }

  const crawl = () => {
    const layerDepths = boringRef.current.querySelectorAll('input[name=materialDepth]');
    const layerTypes = boringRef.current.querySelectorAll('select[name=materialType]');
    
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
    for (let i = 0; i < tempAllData.materialDepths.length; i++) {
      if (!tempAllData.materialDescriptions[i]) {
        tempAllData.materialDescriptions[i] = "";
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
    let tempType = [...allData.materialTypes];
    tempType[index] = e.target.value;
    setAllData({
      ...allData,
      materialTypes: tempType,
    });
  }

  const updateDepth = index => e => {
    let tempDepth = [...allData.materialDepths];
    tempDepth[index] = e.target.value;
    setAllData({
      ...allData,
      materialDepths: tempDepth
    })
    let tempDepthTotal = [...constructionDepthTotal];
    for (let i = index; i < allData.materialDepths.length; i++) {
      tempDepthTotal[i+1] = tempDepth[i];
    }
    setConstructionDepthTotal(tempDepthTotal);
  }

  const updateDesc = index => e => {
    let tempDesc = [...allData.materialDescriptions];
    tempDesc[index] = e.target.value;
    setAllData({
      ...allData,
      materialDescriptions: tempDesc,
    })
  }

  function materials() {
    
    for (let i = 0; i < constructionSubLayers; i++){

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
              <label className={styles.center}>{i == 0 ? 0 : constructionDepthTotal[i]}</label>
            </div>

            {/* DEPTH TO */}
            <div className={styles.formCol}>
              <label className={styles.label} htmlFor="materialDepth">To</label>
              <input className={styles.depth} name="materialDepth" type="number" min={constructionDepthTotal[i]} step="0.5" value={allData.materialDepths[i]} placeholder="required" 
                onBlur={(e) => allData.materialDepths[i] ? e.target.style.border="1px solid #333" : e.target.style.border="3px solid red"} onChange={updateDepth(i)}/>
            </div>

            {/* TYPE */}
            <div className={styles.formCol}>
              <label className={styles.label} htmlFor="materialType">Annular Fill</label>
              <select className={styles.boringInput} name="materialType" value={allData.materialTypes[i]} onBlur={(e) => allData.materialTypes[i] ? e.target.style.border="1px solid #333" : e.target.style.border="3px solid red"} onChange={updateType(i)}>
                <option value="">Choose One:</option>
                <option value="backFill">Back Fill</option>
                <option value="seal">Seal</option>
                <option value="filterPack">Filter Pack</option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className={styles.descContainer}>
            <div className={styles.formCol}>
              <label className={styles.label} htmlFor="materialDesc">Description of Material</label>
              <textarea className={styles.desc}  name="materialDesc" type="text" value={allData.materialDescriptions[i]} onChange={updateDesc(i)}/>
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
          <button onClick={handleClear}>Clear Log</button>
          <button onClick={createPDF}>Create PDF</button>
        </div>
        <div><b>{alert}</b></div>
      </form>
    )
  }
  
  return (
    <div className={styles.form}>
      <h2>Well Construction Log Data: </h2>

      <div className={styles.formRow}>
        <label className={styles.pipeLabel} htmlFor="standupHeight">Standup Height: </label>
        <input className={styles.infoInput} name="standupHeight" type="number" min={0} step="0.5" value={allData.standupHeight} onChange={e => setAllData({
          ...allData,
          standupHeight: e.target.value
        })}/>
      </div>

      <div className={styles.formRow}>
        <label className={styles.pipeLabel} htmlFor="casingDesc">Casing Description: </label>
        <input className={styles.infoInput} name="casingDesc" type="text" value={allData.casingDesc} onChange={e => setAllData({
          ...allData,
          casingDesc: e.target.value
        })}/>
      </div>

      <div className={styles.formRow}>
        <label className={styles.pipeLabel} htmlFor="casingDepth">Casing Depth: </label>
        <input className={styles.infoInput} onBlur={(e) => allData.casingDepth ? e.target.style.border="1px solid #333" : e.target.style.border="3px solid red"} name="casingDepth" type="number" min={0} step="0.5" value={allData.casingDepth} placeholder={allData.casing ? "required" : ""} onChange={e => setAllData({
          ...allData,
          casingDepth: e.target.value,
        })}/>
      </div>

      <div className={styles.formRow}>
        <label className={styles.pipeLabel} htmlFor="screenDesc">Casing Description: </label>
        <input className={styles.infoInput} name="screenDesc" type="text" value={allData.screenDesc} onChange={e => setAllData({
          ...allData,
          screenDesc: e.target.value
        })}/>
      </div>

      <div className={styles.formRow}>
        <label className={styles.pipeLabel} htmlFor="screenDepth">Screen Depth: </label>
        <input className={styles.infoInput} onBlur={(e) => allData.screenDepth ? e.target.style.border="1px solid #333" : e.target.style.border="3px solid red"} name="casingDepth" type="number" min={allData.casingDepth ? allData.casingDepth : 0} step="0.5" placeholder="required" value={allData.screenDepth} onChange={e=>setAllData({
            ...allData,
            screenDepth: e.target.value,
          })}/>
      </div>

      

      {materials()}
      
      <GraphicalConstructionLog
        allData={allData}
        subLayers={constructionSubLayers}
        depthTotal={constructionDepthTotal}
      />
    </div>
  )
}