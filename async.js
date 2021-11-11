let janjian = new Promise((resolve, reject) => {
  console.log("Janji dimulai")
  
  setTimeout(() => {
    // sebuah / serangkaian proses yang dikerjakan
    let isSuccess = true

    // jika hasil proses nya berhasil, maka panggil resolve
    // dan panggil rejek jika sebaliknya
    if (isSuccess) {
      resolve([200, '>> PROSES BERHASIL'])
    } else {
      reject('!! PROSES GAGAL')
    }
  }, 2000)
})

async function doJanjian() {
  try {
    let janji = await janjian
    console.log(janji)
  } catch(e) {
    console.error(e)
  }
}

doJanjian()