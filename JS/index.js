let n = 5
let str = ""
for (let i = 1; i <= n; i++) {
    
    for (let j = 1; j <= n - 1; j++) {
        console.log(" ");
    }
    
    for (let k = 0; k < 2 * i - 1; k++) {
        str += "*"
    }
    
    console.log(str);
}