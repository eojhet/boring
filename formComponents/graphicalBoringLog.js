import { useState } from "react"


export default function GraphicalBoringLog({allData, subLayers, depthTotal}) {
  const layerDepth = [];

    const layerOptions = {
      'topSoil': 'Top Soil',
      'clay': 'Clay',
      'siltyClay': 'Silty Clay',
      'sandyClay': 'Sandy Clay',
      'silt': 'Silt',
      'claySilt': 'Clay Silt',
      'sandySilt': 'Sandy Silt',
      'sand': 'Sand',
      'claySand': 'Clay Sand',
      'siltySand': 'Silty Sand',
      'gravel': 'Gravel',
      'siltyGravel': 'Silty Gravel',
      'sandyGravel': 'Sandy Gravel',
    }
  
    const layerColors = {
      'topSoil': 'FireBrick',
      'clay': 'IndianRed',
      'siltyClay': 'SlateBlue',
      'sandyClay': 'DarkKhaki',
      'silt': 'MediumAquamarine',
      'claySilt': 'LimeGreen',
      'sandySilt': 'CornflowerBlue',
      'sand': 'MidnightBlue',
      'claySand': 'Brown',
      'siltySand': 'Pink',
      'gravel': 'Orange',
      'siltyGravel': 'Purple',
      'sandyGravel': 'Gray',
    }

  function segment() {
    if (layerDepth.length > subLayers){
      layerDepth.pop();
    }
    
    for (let i = 0; i < allData.depths.length; i++) {
      layerDepth.push(
        <div key={i}>
          <div className="segment">
            <div className="depth">{depthTotal[i] ? depthTotal[i] : 0} ft</div>
            <div className="box">{layerOptions[allData.types[i]]}</div>
            <div className="desc">
              {allData.descriptions[i]}
            </div>
          </div>
          <style jsx>{`
            .segment{
                display:flex;
                flex-direction:row;

              }
            .depth{
              width: 4rem;
              border-top: 1px dotted #eaeaea;
              text-align: right;
              padding-right: 1rem;
            }
            .box{
              width: 6rem;
              height: ${(i > 0 ? allData.depths[i] - allData.depths[i-1] : allData.depths[i])*3}rem;
              background-color: ${layerColors[allData.types[i]]};
              border: 1px solid #eaeaea;
              text-align: center;
              /* line-height: ${allData.depths[i] >= 1 ? 3 : 1.5}; */
              background-image: ${allData.types[i] ? "url(patterns/" + allData.types[i] + ".svg)" : ""};
              background-repeat: repeat;
            }
            .desc{
              width: 25rem;
              border-top: 1px dotted #eaeaea;
              padding-left: 1rem;
              word-wrap: break-word;
            }

            @media only screen and (max-width: 700px){
              .desc {
                width: calc(100vw - 11rem);
              }
            }
          `}</style>
        </div>
      )
    }

    return (
      <div>{layerDepth}</div>
    )
  }
  

  return (
    <div className="container">
      {segment()}
      <div className="bottom">
        <div className="bottomLeft" />
        <div className="logDepth">
          {allData.depths.length > 0 ? allData.depths[allData.depths.length-1] + ' ft' : ''}
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