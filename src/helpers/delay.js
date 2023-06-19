function delay(time) {
  console.log(`delay function running ${time}ms!`)
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export default delay