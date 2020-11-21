function colorRgb(str) {
  let sColor = str.toLowerCase()
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 16))
    }
    return sColorChange
  }
  return sColor
}

function backCycle(num, cycle) {
  let index = num % cycle
  if (index < 0) {
    index += cycle
  }
  return index
}

function numberFixed(num = 0, count = 3) {
  const power = 10 ** count
  return Math.floor(num * power) / power
}

function RGB2HSL(R = 0, G = 0, B = 0, stringMode = false) {
  const bR = R / 255
  const bG = G / 255
  const bB = B / 255
  const Cmax = Math.max(bR, bG, bB)
  const Cmin = Math.min(bR, bG, bB)
  const V = Cmax - Cmin

  let H = 0
  if (V === 0) {
    H = 0
  } else if (Cmax === bR) {
    H = 60 * (((bG - bB) / V) % 6)
  } else if (Cmax === bG) {
    H = 60 * ((bB - bR) / V + 2)
  } else if (Cmax === bB) {
    H = 60 * ((bR - bG) / V + 4)
  }

  H = Math.floor(backCycle(H, 360))
  const L = numberFixed((Cmax + Cmin) / 2)
  const S = V === 0 ? 0 : numberFixed(V / (1 - Math.abs(2 * L - 1)))

  if (stringMode) {
    return `hsl(${H},${numberFixed(100 * S)}%,${numberFixed(100 * L)}%)`
  }

  return { H, S, L }
}

export default {
  colorRgb,
  RGB2HSL
}
