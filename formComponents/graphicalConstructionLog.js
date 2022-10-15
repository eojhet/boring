import { useState } from "react"


export default function GraphicalConstructionLog({allData, subLayers, depthTotal}) {
  const layerDepth = [];

    const layerOptions = {
      'backFill': 'Back Fill',
      'seal': 'Seal',
      'filterPack': 'Filter Pack',
    }
  
    const layerColors = {
      'backFill': 'FireBrick',
      'seal': 'SlateBlue',
      'filterPack': 'DarkKhaki',
    }

    const fillPattern = {
      'backFill': 'silt',
      'seal': 'clay',
      'filterPack': 'sand',
    }

  function segment() {
    if (layerDepth.length > subLayers){
      layerDepth.pop();
    }
    
    for (let i = 0; i < allData.materialDepths.length; i++) {
      layerDepth.push(
        <div key={i}>
          <div className="segment">
            <div className="materialBox" />
            <div className="materialDepth">{depthTotal[i] ? depthTotal[i] : 0} - {allData.materialDepths[i]}</div>
            <div className="materialType">{layerOptions[allData.materialTypes[i]]}</div>
            <div className="materialDesc">{allData.materialDescriptions[i]}</div>
          </div>
          <style jsx>{`
            .segment{
                display:flex;
                flex-direction:row;
              }
            .materialBox{
              width: 2rem;
              height: ${(i > 0 ? allData.materialDepths[i] - allData.materialDepths[i-1] : allData.materialDepths[i])*3}rem;
              background-color: ${layerColors[allData.materialTypes[i]]};
              border: 1px solid #eaeaea;
              text-align: center;
              background-image: ${allData.materialTypes[i] ? "url(patterns/" + fillPattern[allData.materialTypes[i]] + ".svg)" : ""};
              background-repeat: repeat;
            }
            .materialDepth{
              width: 7rem;
              border-top: 1px dotted #eaeaea;
              text-align: right;
              padding-right: 1rem;
            }
            .materialType{
              width: 5rem;
              border-top: 1px dotted #eaeaea;
              text-align: right;
              padding-right: 1rem;
            }
            .materialDesc{
              width: 25rem;
              border-top: 1px dotted #eaeaea;
              padding-left: 1rem;
              word-wrap: break-word;
            }

            @media only screen and (max-width: 600px){
              .materialDesc {
                width: calc(100vw - 11rem);
              }
            }
          `}</style>
        </div>
      )
    }
    // {allData.standupHeight > 0 ? "stickupBoxRight": null}
    return (
      <div className="graphicalContainer">
        <div className="wellString">
          <div className="stickupBoxLeft"/>
          <div className="wellStringSegment">
            <div className="stringDesc">{allData.casingDesc}</div>
            <div className="stringType">Riser</div>
            <div className="stringDepth">0 - {allData.casingDepth}</div>
            <div className="casingBox"/>
          </div>
          <div className="wellStringSegment">
            <div className="stringDesc">{allData.screenDesc}</div>
            <div className="stringType">Screen</div>
            <div className="stringDepth">{allData.screenDepth} - {allData.screenDepth}</div>
            <div className="screenBox"></div>
          </div>
        </div>
        <div className="wellFillMaterials">
          <div className="stickupBoxRight"/>
          {layerDepth}
        </div>

       <style jsx>{`
        .graphicalContainer {
          display: flex;
          flex-direction: row;
        }
        .stickupBoxLeft {
          width: 2rem;
          height: ${allData.standupHeight*3}rem;
          text-align: center;
          border: 1px solid #eaeaea;
          background-color: #eee;
          align-self: flex-end;
        }
        .stickupBoxRight {
          height: ${allData.standupHeight*3}rem;
        }
        .wellString {
          display: flex;
          flex-direction: column;
        }
        .wellStringSegment {
          display: flex;
          flex-direction: row;
        }
        .stringDesc{
          width: 8rem;
          border-top: 1px dotted #eaeaea;
          padding-left: 1rem;
          word-wrap: break-word;
        }
        .stringType{
          width: 4rem;
          border-top: 1px dotted #eaeaea;
          text-align: right;
          padding-right: 1rem;
        }
        .stringDepth{
          width: 5rem;
          border-top: 1px dotted #eaeaea;
          text-align: right;
          padding-right: 1rem;
        }
        .casingBox {
          width: 2rem;
          height: ${allData.casingDepth*3}rem;
          text-align: center;
          border: 1px solid #eaeaea;
          background-color: #ccc;
        }
        .screenBox {
          width: 2rem;
          height: ${allData.screenDepth*3}rem;
          text-align: center;
          border: 1px solid #eaeaea;
          background-color: #aaa;
        }
        .wellFillMaterials{
          display:flex;
          flex-direction: column;
        }
       `}</style>
      </div>
    )
  }
  

  return (
    <div className="container">

      {segment()}
      {/* <div className="bottom">
        <div className="bottomLeft" />
        <div className="logDepth">
          {allData.materialDepths.length > 0 ? allData.materialDepths[allData.materialDepths.length-1] + ' ft' : ''}
        </div>
        <div className="bottomRight">&nbsp;</div>
      </div>       */}
      <style jsx>{`
        .container {
          margin: 1rem 0 4rem 0;
          display:flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;          
          
        }
        .bottom{
          display:flex;
          flex-direction:row;
          margin-top: 0.5rem;

        }
        .bottomLeft {
          width: 4rem;
        }
        .logDepth {
          width: 6rem;
          text-align: center;
        }
        .bottomRight {
          width: 25rem;
        }

        @media only screen and (max-width: 700px) {
          .bottomRight {
            width: calc(100vw - 11rem);
          }
        }
      `}</style>
    </div>
  )
}