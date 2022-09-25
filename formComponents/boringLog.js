import { useState } from "react"


export default function BoringLog({data,depth,type,desc,subLayers}) {
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

  function segment() {
    if (layerDepth.length > subLayers){
      layerDepth.pop();
    }
    
    for (let i = 0; i < depth.length; i++) {
      layerDepth.push(
        <div key={i}>
          <div className="segment">
            <div className="box">
              {layerOptions[type[i]]}
            </div>
            <div className="desc">{desc[i]}</div>
          </div>
          <style jsx>{`
            .box{
              width: 6rem;
              height: ${(i > 0 ? depth[i] - depth[i-1] : depth[i])*3}rem;
              border: 1px solid #eaeaea;
            }
            .segment{
              display:flex;
              flex-direction:row;
              gap: 1rem;
            }
            .desc{
              width: 20rem;
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
      <style jsx>{`
        .container {
          margin: 2rem 0;
          display:flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  )
}