import { useState } from "react"


export default function BoringLog({data,depth,type,desc,subLayers, depthTotal}) {
  const layerDepth = [];

    const layerOptions = {
      'clay': 'Clay',
      'sandyClay': 'Sandy Clay',
      'gravellyClay': 'Gravelly Clay',
      'sand': 'Sand',
      'silt': 'Silt',
      'sandySilt': 'Sandy Silt',
      'gravellySilt': 'Gravelly Silt',
      'gravel': 'Gravel',
      'topSoil': 'Top Soil',
    }

    const layerColors = {
      'clay': 'FireBrick',
      'sandyClay': 'IndianRed',
      'gravellyClay': 'SlateBlue',
      'sand': 'DarkKhaki',
      'silt': 'MediumAquamarine',
      'sandySilt': 'LimeGreen',
      'gravellySilt': 'CornflowerBlue',
      'gravel': 'MidnightBlue',
      'topSoil': 'Brown',
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
            <div className="box">
              {layerOptions[type[i]]}
            </div>
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