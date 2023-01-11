/* === Bateria === */
initBattery()

function initBattery() {
    const batteryLiquid = document.querySelector(".battery__liquid"),
          batteryStatus = document.querySelector(".battery__status"),
          batteryPercentage = document.querySelector(".battery__percentage")

    navigator.getBattery().then((batt) => {
        updateBattery = () => {
            /* === 1. Atualizando o nível numérico da bateria === */
            let level = Math.floor(batt.level * 100)
            batteryPercentage.innerHTML = level+ "%"

            /* === 2. Atualizando o nível de fundo da bateria === */
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            /* === 3. Validando bateria cheia, bateria fraca e se está carregando ou não ==== */
            if(level == 100) { /* === Validando se a bateria está cheia === */
                batteryStatus.innerHTML = `Bateria cheia <i class="ri-battery-2-fill green-color"></i>`
                batteryLiquid.style.height = "103%" /* === Ocultar a elipse === */
            } 
            else if(level <= 20 &! batt.charging) { /* === Validando se a bateria está fraca === */
                batteryStatus.innerHTML = `Bateria baixa <i class="ri-plug-2-line animated-red"></i>`
            }
            else if(batt.charging) { /* === Validando se a bateria está carregando=== */
                batteryStatus.innerHTML = `Carregando... <i class="ri-flashlight-line animated-green"></i>`
            }
            else { /* === Se não estiver carregando, não mostre nada === */
                batteryStatus.innerHTML = ``
            }

            /* === Mudando as cores da bateria e retirando as outras cores === */
            if(level <= 20) {
                batteryLiquid.classList.add("gradient-color-red")
                batteryLiquid.classList.remove("gradient-color-orange", "gradient-color-yellow", "gradient-color-green")
            }
            else if(level <= 40) {
                batteryLiquid.classList.add("gradient-color-orange")
                batteryLiquid.classList.remove("gradient-color-red", "gradient-color-yellow", "gradient-color-green")
            }
            else if(level <= 80) {
                batteryLiquid.classList.add("gradient-color-yellow")
                batteryLiquid.classList.remove("gradient-color-red", "gradient-color-orange", "gradient-color-green")
            }
            else{
                batteryLiquid.classList.add("gradient-color-green")
                batteryLiquid.classList.remove("gradient-color-red", "gradient-color-orange", "gradient-color-yellow")
            }
        }
        updateBattery()

        /* === Eventos de status da bateria === */
        batt.addEventListener("chargingchange", () => {updateBattery()})
        batt.addEventListener("levelchange", () => {updateBattery()})
    })
}