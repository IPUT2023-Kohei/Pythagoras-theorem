function generateRandomValues() {
    const a = Math.floor(Math.random() * 20) + 1; // 1から20のランダムな整数
    const b = Math.floor(Math.random() * 20) + 1; // 1から20のランダムな整数
    const c = Math.sqrt(a * a + b * b); // ピタゴラスの定理を使用してcを計算
    return { a, b, c: c.toFixed(0) }; // cを小数点以下0桁にフォーマット
}

function generateInvalidTriangle() {
    const a = Math.floor(Math.random() * 20) + 1; // 1から20のランダムな整数
    const b = Math.floor(Math.random() * 20) + 1; // 1から20のランダムな整数
    const c = Math.floor(Math.random() * (a + b))+(a + b); // a + b より大きい値を生成
    return { a, b, c }; // cは存在しない三角形のため、a + b より大きい
}