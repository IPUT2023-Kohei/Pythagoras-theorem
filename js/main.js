let correctAnswers = 0; // 正解数をカウントする変数
let totalQuestions = 5; // 出題数を固定        
let questionCount = 0; // 現在の問題数
let finishedQNoList = []; // 回答済の問題番号
let problems = []; // 問題文の配列
let answers = []; // 正解を格納する配列
let selectedTheorem = ""; // 選択された定理の名前を格納する変数
let userAnswers = []; // ユーザーの解答を保存する配列
let correctAnswersList = []; // 正しい解答を保存する配列

function changeTitle(name) {
    document.getElementById('titleText').textContent = '暗算で' + name + 'の定理をマスターせよ';
    selectedTheorem = name; // 選択された定理の名前を保存
}

function startGame(name) {
    changeTitle(name); // タイトルを変更

    document.getElementById('title').style.display = 'none';
    document.getElementById('mondai').style.display = 'block';

    problems = []; // 配列を初期化
    answers = []; // 配列を初期化
    correctAnswers = 0; // 正解数をリセット
    userAnswers = []; // ユーザーの解答をリセット
    finishedQNoList = []; // 回答済の問題番号をリセット

    // 問題タイトルを設定
    document.getElementById('problemTitle').textContent = `暗算で「${selectedTheorem}」の定理をマスターせよ`;

    // ランダムな問題文を生成
    for (let i = 0; i < totalQuestions; i++) {
        if (Math.random() < 0.98) { // 98%の確率で存在する三角形
            const { a, b, c } = generateRandomValues(); // ランダムな値を取得
            problems.push(`a=${a}, b=${b}の時のcを求めよ。ただし、存在しない場合は「ない」と解答すること`);
            answers.push(c);
            correctAnswersList.push(c);

            problems.push(`b=${b}, c=${c}の時のaを求めよ。ただし、存在しない場合は「ない」と解答すること`);
            answers.push(a);
            correctAnswersList.push(a);

            problems.push(`a=${a}, c=${c}の時のbを求めよ。ただし、存在しない場合は「ない」と解答すること`);
            answers.push(b);
            correctAnswersList.push(b);
        } else { // 2%の確率で存在しない三角形
            const { a, b, c } = generateInvalidTriangle(); // 無効な値を取得
            problems.push(`a=${a}, b=${b}の時のcを求めよ。ただし、存在しない場合は「ない」と解答すること`);
            answers.push("ない");
            correctAnswersList.push("ない");

            problems.push(`b=${b}, c=${c}の時のaを求めよ。ただし、存在しない場合は「ない」と解答すること`);
            answers.push("ない");
            correctAnswersList.push("ない");

            problems.push(`a=${a}, c=${c}の時のbを求めよ。ただし、存在しない場合は「ない」と解答すること`);
            answers.push("ない");
            correctAnswersList.push("ない");
        }
    }

    // 最初の問題を表示
    displayRandomProblem();

    // ボタン表示制御
    document.getElementById("teisyutuButton").style.display = 'inline';
    document.getElementById("nextButton").style.display = 'none';
    document.getElementById("resultButton").style.display = 'none';
}

// ランダムに問題文を選んで表示する関数
function displayRandomProblem() {
    if (questionCount < totalQuestions) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * problems.length);
        } while (finishedQNoList.includes(randomIndex)); // 既に出題された問題は除外

        finishedQNoList.push(randomIndex); // 出題済リストに追加
        const problemText = problems[randomIndex];
        document.getElementById('problem').textContent = problemText; // 問題文を表示
        questionCount++; // 問題数をカウント
    } else {
        document.getElementById('problem').textContent = "全ての問題が終了しました。";
        showResults(); // 結果を表示する関数を呼び出す
    }
}

// 提出ボタンのイベントリスナー
document.getElementById("teisyutuButton").addEventListener('click', function() {
    let userAnswer = document.getElementById("userAnswer").value.trim(); // ユーザーの解答を取得

    // ユーザーの解答を保存
    if (userAnswer) {
        userAnswers.push(userAnswer); // ユーザーの解答を保存
    } else {
        userAnswers.push("解答なし"); // 解答が空の場合は「解答なし」と保存
    }

    const currentProblemIndex = finishedQNoList[finishedQNoList.length - 1]; // 現在の問題のインデックス
    const correctAnswer = answers[currentProblemIndex]; // 正しい解答を取得

    // 正誤判定
    if (userAnswer === correctAnswer.toString()) {
        correctAnswers++; // 正解数をカウント
        alert("正解です！");
    } else {
        alert(`不正解です。正しい答えは ${correctAnswer} です。`);
    }

    // 入力欄を無効にする
    document.getElementById("userAnswer").disabled = true;

    // 次の問題へ進むボタンを表示
    document.getElementById("nextButton").style.display = 'inline';
    document.getElementById("teisyutuButton").style.display = 'none';
});

// 次の問題ボタンのイベントリスナー
document.getElementById("nextButton").addEventListener('click', function() {
    document.getElementById("userAnswer").value = ""; // 入力フィールドをクリア
    document.getElementById("userAnswer").disabled = false; // 入力欄を再度有効にする
    displayRandomProblem(); // 次の問題を表示
    document.getElementById("nextButton").style.display = 'none'; // 次の問題ボタンを非表示
    document.getElementById("teisyutuButton").style.display = 'inline'; // 提出ボタンを再表示
});

// 結果を表示する関数
function showResults() {
    document.getElementById('mondai').style.display = 'none'; // 問題画面を非表示
    document.getElementById('result').style.display = 'block'; // 結果画面を表示

    document.getElementById('resultAnswer').textContent = `正解数: ${correctAnswers} / ${totalQuestions}`;

    // ユーザーの解答と正しい解答を表示
    const answerList = document.getElementById('answerList');
    answerList.innerHTML = ''; // 以前の内容をクリア

    for (let i = 0; i < finishedQNoList.length; i++) {
        const problemIndex = finishedQNoList[i];
        const userAnswer = userAnswers[i] || "解答なし"; // ユーザーの解答
        const correctAnswer = correctAnswersList[problemIndex]; // 正しい解答

        if(finishedQNoList.length === 0){
            answerList.textContent = "問題がありません。";
            return;
        }

        // 結果を表示するための要素を作成
        const resultItem = document.createElement('div');
        // ユーザーの解答が正解でない場合のみ正しい解答を表示
        if (userAnswer !== correctAnswer.toString()) {
            resultItem.textContent = `あなたの解答: ${userAnswer} | 正しい解答: ${correctAnswer}`;
        } else {
            resultItem.textContent = `あなたの解答: ${userAnswer} | 正しい解答: 正解です！`;
        }
        answerList.appendChild(resultItem); // 結果リストに追加
    }
}

//豆知識
document.getElementById("cb1").addEventListener('click',function(){
    event.preventDefault(); // デフォルトのアンカー動作を防ぐ
    document.getElementById("title").style.display = 'none';
    document.getElementById("minitips").style.display = 'block';
    document.getElementById("output1").textContent = "定理の概要";
    document.getElementById("output1.1").textContent = "定義: 三平方の定理は、直角三角形において、斜辺の長さの二乗が他の二辺の長さの二乗の和に等しいことを示します。";
    document.getElementById("output1.2").textContent = "数式で表すと次のようになります： [ a^2 + b^2 = c^2 ] ここで、(c)は斜辺の長さ、(a)と(b)は他の二辺の長さです。";
    document.getElementById("output2").textContent = "歴史的背景";
    document.getElementById("output2.1").textContent = "古代の知識: ピタゴラスの名にちなんでいますが、この定理は彼の時代よりも前にバビロニアやインドの古代文明で知られていました。バビロニアのプランプトン322という粘土板には、ピタゴラス数が記載されています。";
    document.getElementById("output2.2").textContent = "独立した発見: 中国でも「勾股の定理」として独立に発見され、古代の文献「周髀算経」にはこの定理の応用が見られます。";
    document.getElementById("output3").textContent = "数学的意義";
    document.getElementById("output3.1").textContent = "多様な証明: 三平方の定理には400以上の異なる証明方法が存在し、幾何学的な方法から代数的な方法まで多岐にわたります。インドの数学者バスカラによる「見よ!」証明が有名です。";
    document.getElementById("output3.2").textContent = "ピタゴラス数: (a^2 + b^2 = c^2) を満たす正の整数の組（ピタゴラス数）は、(3, 4, 5) や (5, 12, 13) などがあります。";
    document.getElementById("output4").textContent = "応用";
    document.getElementById("output4.1").textContent = "実生活での利用: 建築、工学、物理学などの分野で広く利用され、距離の計算や構造の設計、直角三角形に関する問題の解決に役立ちます。";
    document.getElementById("output4.2").textContent = "ユークリッド距離: 座標平面における2点間のユークリッド距離を計算する際にも使用されます。";
    document.getElementById("output5").textContent = "文化的影響";
    document.getElementById("output5.1").textContent = "教育的ツール: 三平方の定理は、幾何学の授業で最初に教えられる重要な数学的原則の一つであり、数学的関係の力と美しさを示しています";
    document.getElementById("output5.2").textContent = "数学への影響: この定理は、代数、三角法、微積分など、さまざまな数学の分野に影響を与えています。";
    document.getElementById("output6").textContent = "一般化";
    document.getElementById("output6.1").textContent = "高次元への拡張: 三平方の定理は、2次元を超えて3次元やそれ以上の次元にも拡張可能であり、さまざまな数学や科学の分野で応用されます。";
    document.getElementById("output6.2").textContent = "非ユークリッド幾何学: 非ユークリッド幾何学においても、異なるバージョンの定理が適用されます。";
    document.getElementById("output7").textContent = "豆知識";
    document.getElementById("output7.1").textContent = "ピタゴラスの螺旋: この定理を用いたグラフィカルな表現は、ピタゴラスの螺旋と呼ばれ、直角三角形の辺の関係を視覚的に示します。";
})

// 最初の要素を表示
document.getElementById("mini1").style.display = 'block';

// 次へボタンのイベントリスナーを設定
for (let i = 1; i <= 6; i++) {
    document.getElementById("next" + i).addEventListener('click', function() {
        // 現在表示されている要素を取得
        const currentMini = document.getElementById("mini" + i);
        const nextMini = document.getElementById("mini" + (i + 1));

        // 現在の要素を非表示にし、次の要素を表示
        if (currentMini.style.display === 'block') {
            currentMini.style.display = 'none';
            if (nextMini) {
                nextMini.style.display = 'block';
            }
        }
    });
}

//注意事項
document.getElementById("cb2").addEventListener('click',function(){
    event.preventDefault(); // デフォルトのアンカー動作を防ぐ
    document.getElementById("title").style.display = 'none';
    document.getElementById("minitips").style.display = 'block';
    document.getElementById("output8").textContent = "√が出た場合は小数点０桁以下の整数値を入力してください" ;
    document.getElementById("output9").textContent = "√nの場合:m^2(=t)にn≒tが近い数値(m)を入力してください";
    document.getElementById("output10").textContent = "具体例";
    document.getElementById("output10.1").textContent = "√2の場合:1^2(=1)orか2^2(=4)では「1」と解答";
    document.getElementById("output10.2").textContent = "√5の場合:2^2(=4)orか3^2(=9)では「2」と解答";
    document.getElementById("output10.3").textContent = "√11の場合:3^2(=9)orか4^2(=16)では「3」と解答";
    document.getElementById("output10.4").textContent = "√20の場合:4^2(=16)or5^2(=25)では「4」と解答";
    document.getElementById("output10.5").textContent = "√22の場合:5^2(=25)or6^2(=36)では「5」と解答";
    document.getElementById("output10.6").textContent = "√31の場合:6^2(=36)or7^2(=49)では「6」と解答";
    document.getElementById("output10.7").textContent = "√50の場合:7^2(=49)orか8^2(=64)では「7」と解答";
    document.getElementById("output10.8").textContent = "√70の場合:8^2(=64)or9^2(=81)では「8」と解答";
    document.getElementById("output10.9").textContent = "√90の場合:9^2(=81)or10^2(=100)では「9」と解答";
    document.getElementById("output11").textContent = "ピタゴラス数を覚えよう";
    document.getElementById("output11.1").textContent = "i:3,4,5";
    document.getElementById("output11.2").textContent = "ii:5,12,13";
    document.getElementById("output11.3").textContent = "iii:7,24,25";
    document.getElementById("output11.4").textContent = "iv:8,15,17";
    document.getElementById("output11.5").textContent = "v:9,40,41";
})

// スタートボタンのイベントリスナーを設定
document.getElementById("startButton1").addEventListener('click', function() {
    startGame("三平方");
});

document.getElementById("startButton2").addEventListener('click', function() {
    startGame("ピタゴラス");
});

// ページが読み込まれたときに問題文を表示
window.onload = function() {
    // 初期状態では問題文を表示しない
    document.getElementById('problem').textContent = "";
};
