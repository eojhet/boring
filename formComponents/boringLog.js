import { useState } from "react"


export default function BoringLog({data,depth,type,desc,subLayers, depthTotal}) {
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
    
    for (let i = 0; i < depth.length; i++) {
      layerDepth.push(
        <div key={i}>
          <div className="segment">
            <div className="depth">{depthTotal[i] ?depthTotal[i]:0} ft</div>
            <div className="box" />
            <div className="desc">
              {desc[i]}
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
              height: ${(i > 0 ? depth[i] - depth[i-1] : depth[i])*3}rem;
              background-color: ${layerColors[type[i]]};
              border: 1px solid #eaeaea;
              text-align: center;
              line-height: ${depth[i] >= 1 ? 3 : 1.5};
              background-image: url("patterns/diamond.svg");
              background-repeat: repeat;
            }
            .desc{
              width: 25rem;
              border-top: 1px dotted #eaeaea;
              padding-left: 1rem;
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
        <div className="bottomLeft">
          {depth.length > 0 ? depth[depth.length-1] + ' ft' : ''}
        </div>
        <div className="bottomRight">&nbsp;</div>
      </div>      
      <style jsx>{`
        .container {
          margin: 2rem 0;
          display:flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }
        .bottom{
          display:flex;
          flex-direction:row;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .bottomLeft {
          width: 6rem;
          text-align: center;
        }
        .bottomRight {
          width: 20rem;
        }
      `}</style>
    </div>
  )
}