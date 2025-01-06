window.main = await import(
    "https://3d.map.gov.hk/mapviewer/files/mms-api/mms-sdk.module.min.js"
  )
  await main.init({
    containerId: "container",
    key: "3967f8f365694e0798af3e7678509421",
  })
  main.setPanoramaViewerProperties({
    markerColor: "yellow",
    markerSize: 0.5,
    panoramaSpotFilterCallback: function (spots) {
      const results = []
      for (const [index, spot] of spots.entries()) {
        if (index % 2 == 0) {
          results.push(spot)
        }
      }
      return results
    },
  })
  await main.goto(114.139759, 22.322180)

  document.getElementById("apis").addEventListener("click", function (e) {
    e.target.value = "--"
  })

  document.getElementById("apis").addEventListener("change", function (e) {
    var command = e.target.value

    if ("moveForward" == command) {
      main.moveForward()
    } else if ("moveBackward" == command) {
      main.moveBackward()
    } else if ("brightness_25" == command) {
      main.setBrightness(25) // setContrast() and setSaturation() also available for your own graphics tuning
    } else if ("brightness_0" == command) {
      main.setBrightness(0) // setContrast() and setSaturation() also available for your own graphics tuning
    } else if ("stepSize_60" == command) {
      main.setStepSize(60)
    } else if ("stepSize_10" == command) {
      main.setStepSize(10)
    } else if ("getPosition" == command) {
      let pos = main.getPosition()
      Toastify({
        text: `Lat: ${pos.lat.toFixed(5)}\nLng: ${pos.lng.toFixed(5)}\nZ: ${pos.z}`,
        duration: 5000,
        position: "right",
        gravity: "bottom",
        style: {
          background: "linear-gradient(to right, #cccccc, #eeeeee)",
          color: "#000000",
        },
      }).showToast()
    } else if ("getShootingDate" == command) {
      main.getShootingDate().then((sDate) => {
        Toastify({
          text: `${sDate}`,
          duration: 5000,
          position: "right",
          gravity: "bottom",
          style: {
            background: "linear-gradient(to right, #cccccc, #eeeeee)",
            color: "#000000",
          },
        }).showToast()
      })
    }
  })