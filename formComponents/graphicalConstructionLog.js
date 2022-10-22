export default function GraphicalConstructionLog({allData, subLayers, depthTotal}) {
  const layerDepthInfo = [];
  const layerDepthGraphic = [];

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


  // annular material graphic
  function graphicMaterialSegment() {
    if (layerDepthGraphic.length > subLayers) {
      layerDepthGraphic.pop();
    }

    for (let i = 0; i < allData.materialDepths.length; i++) {
      layerDepthGraphic.push(
        <div key={i}>
          <div className="segment">
            <div className="materialBox" />
          </div>
          <style jsx>{`
            .segment{
                display:flex;
                flex-direction:row;
              }
            .materialBox{
              width: 1.4rem;
              height: ${(i > 0 ? allData.materialDepths[i] - allData.materialDepths[i-1] : allData.materialDepths[i])*3}rem;
              border-top: 1px solid #eaeaea;
              border-bottom: 1px solid #eaeaea;
              text-align: center;
              background-color: ${layerColors[allData.materialTypes[i]]};
              background-image: ${allData.materialTypes[i] ? "url(patterns/" + fillPattern[allData.materialTypes[i]] + ".svg)" : ""};
              background-repeat: repeat;
            }
            @media only screen and (max-width: 600px){
              .materialBox {
                width: 1rem;
              }
            }
          `}</style>
        </div>
      )
    }

    return (
      <div>
        {layerDepthGraphic}
      </div>
    )
  }  

  // annular material description / well string description and graphic (too much)
  function segment() {
    if (layerDepthInfo.length > subLayers){
      layerDepthInfo.pop();
    }
    
    for (let i = 0; i < allData.materialDepths.length; i++) {
      layerDepthInfo.push(
        <div key={i}>
          <div className="segment">
            <div className="materialDepth">{depthTotal[i] ? depthTotal[i] : 0} - {allData.materialDepths[i]}</div>
            <div className="materialType">{layerOptions[allData.materialTypes[i]]}</div>
            <div className="materialDesc">{allData.materialDescriptions[i]}</div>
          </div>
          <style jsx>{`
            .segment{
                display:flex;
                flex-direction:row;
                height: ${(i > 0 ? allData.materialDepths[i] - allData.materialDepths[i-1] : allData.materialDepths[i])*3}rem;
              }
            .materialDepth{
              width: 5rem;
              border-top: 1px dotted #eaeaea;
              padding-left: 1rem;
            }
            .materialType{
              width: 5rem;
              border-top: 1px dotted #eaeaea;
              padding-right: 1rem;
            }
            .materialDesc{
              width: 15rem;
              border-top: 1px dotted #eaeaea;
              padding-left: 1rem;
              word-wrap: break-word;
            }

            @media only screen and (max-width: 600px){
              .materialDesc {
                display: none;
              }
            }
          `}</style>
        </div>
      )
    }
    return (
      <div className="graphicalContainer">
        
        {/* Well Construction Info Panel */}
        <div className="wellString">

          {allData.standupHeight > 0 && 
          <div className="wellStringSegment">
            <div className="stringDesc">{allData.casingDesc}</div>
            <div className="stringType">Standup</div>
            <div className="standupHeight">0 - {allData.standupHeight}</div>
          </div>
          
          }
          
          {allData.casingDepth > 0 && 
          <div className="wellStringSegment">
            <div className="stringDesc">{allData.casingDesc}</div>
            <div className="stringType">Riser</div>
            <div className="casingDepth">0 - {allData.casingDepth}</div>
          </div>
          }

          {allData.screenDepth &&
          <div className="wellStringSegment">
            <div className="stringDesc">{allData.screenDesc}</div>
            <div className="stringType">Screen</div>
            <div className="screenDepth">{allData.casingDepth} - {allData.screenDepth}</div>
          </div>
          }
        </div>

        {/* Fill Material Graphic Left (call function to fill array) */}
        <div className="wellFillMaterials">
          <div className="standupBoxPadding"/>
          {graphicMaterialSegment()}
        </div>
        
        {/* Well Construction Graphic */}
        <div className="wellString">

          {allData.standupHeight > 0 &&
          <div className="stickupBox"/>
          }
          {allData.casingDepth > 0 && 
          <div className="wellStringSegment">
            <div className="casingBox"/>
          </div>
          }
          
          {allData.screenDepth &&
          <div className="wellStringSegment">
            <div className="screenBox"></div>
          </div>
          }
          
          {allData.materialDepths[allData.materialDepths.length - 1] > allData.screenDepth && <div className="afterWellBox" />}
        </div>

        {/* Fill Material Graphic Right (function called above, calling array) */}
        <div className="wellFillMaterials">
          <div className="standupBoxPadding"/>
          {layerDepthGraphic}
        </div>

        {/* Fill Material Info Panel */}
        <div className="wellFillMaterials">
          <div className="standupBoxPadding"/>
          {layerDepthInfo}
        </div>

       <style jsx>{`
        .graphicalContainer {
          display: flex;
          flex-direction: row;
        }
        .standupBoxPadding {
          height: ${allData.standupHeight*3}rem;
        }
        .stickupBox {
          width: 2rem;
          height: ${allData.standupHeight*3}rem;
          border: 1px solid #eaeaea;
          background-color: #eee;
        }
        .standupHeight {
          height: ${allData.standupHeight*3}rem;
          width: 4rem;
          border-top: 1px dotted #eaeaea;
          padding-right: 1rem;
          padding-left: 0.1rem;
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
        .screenDesc{
          width: 8rem;
          border-top: 1px dotted #eaeaea;
          padding-left: 1rem;
          word-wrap: break-word;
        }
        .stringType{
          width: 4rem;
          border-top: 1px dotted #eaeaea;
          text-align: left;
          padding-right: 1rem;
        }
        .casingDepth{
          height: ${allData.casingDepth*3}rem;
          width: 4rem;
          border-top: 1px dotted #eaeaea;
          padding-right: 1rem;
          padding-left: 0.1rem;
        }
        .screenDepth{
          height: ${(allData.screenDepth - allData.casingDepth)*3}rem;
          width: 4rem;
          border-top: 1px dotted #eaeaea;
          padding-right: 1rem;
          padding-left: 0.1rem;
        }
        .casingBox {
          width: 2rem;
          height: ${allData.casingDepth*3}rem;
          text-align: center;
          border: 1px solid #eaeaea;
          background-color: #eee;
        }
        .screenBox {
          width: 2rem;
          height: ${(allData.screenDepth - allData.casingDepth)*3}rem;
          text-align: center;
          border: 1px solid #eaeaea;
          background-color: #ccc;
          background-image: ${"url(patterns/screen.svg)"};
          background-repeat: repeat;
        }
        .afterWellBox {
          height: ${(allData.materialDepths[allData.materialDepths.length - 1] - allData.screenDepth)*3}rem;
          background-color: ${layerColors[allData.materialTypes[allData.materialTypes.length - 1]]};
          background-image: ${"url(patterns/" + fillPattern[allData.materialTypes[allData.materialTypes.length - 1]] + ".svg)"};
          background-repeat: repeat;
        }
        .wellFillMaterials{
          display:flex;
          flex-direction: column;
        }
        @media only screen and (max-width: 600px){
          .stringDesc {
            display: none;
          }
          .stickupBox, .casingBox, .screenBox {
            width: 1rem;
          }
        }

       `}</style>
      </div>
    )
  }
  

  return (
    <div className="container">

      {segment()}
      <div className="bottom">
        <div className="bottomLeft" />
        <div className="logDepth">
          {allData.materialDepths.length > 0 ? allData.materialDepths[allData.materialDepths.length-1] + ' ft T.D.' : ''}
        </div>
        <div className="bottomRight">&nbsp;</div>
      </div>      
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
          width: 16rem;
        }
        .logDepth {
          width: 6rem;
          text-align: center;
        }
        .bottomRight {
          width: 25rem;
        }

        @media only screen and (max-width: 600px) {
          .bottomLeft {
            width: 8rem;
          }
          .bottomRight {
            width: 10rem;
          }
        }
      `}</style>
    </div>
  )
}