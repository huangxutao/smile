function asyncFoo () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ss')
        })
    })
}

function bar () {
    setTimeout(async() => {
        const rs = await asyncFoo();
        console.log(rs)
    }, 1000)
    // const rs = await asyncFoo();
    // console.log(rs)
}

// const rs = await asyncFoo();
bar();

// console.log('??', rs)