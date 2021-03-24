const choice = ['ぐー✊', 'ちょき✌', 'ぱー✋'];
const msgJudge = ["引き分け😑","🎉🎉🎉勝利!😄🎊🎊","負け😧"];
let sumUse = [0, 0, 0];
let sumWin = [0, 0, 0];
let rateWin = [[], [], []];
let labelX = [1,2,3,4,5,6,7,8,9,10];
let myLineChart = 0;

// 0～maxの整数で乱数生成
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// 判定
function judge(yourChoice, cpuChoice) {

  if (yourChoice == cpuChoice) {//相子パターン
    return 0;
  } else if (yourChoice == cpuChoice - 1
    || (yourChoice == choice.length - 1 && cpuChoice == 0)) {// 勝ちパターン
    return 1;
  } else {// 負けパターン
    return 2;
  }
}
// グラフ初期表示
drawChart();

// じゃんけん実行
function janken(yourChoice) {
  // 乱数生成
  cpuChoice = getRandomInt(3);

  // 勝敗判定
  nJudge = judge(yourChoice, cpuChoice);

  // 結果表示
  alert("YOU : " + choice[yourChoice] + "\n" + "CPU : " + choice[cpuChoice] + "\n\n" + msgJudge[nJudge]);

  // 使った数カウント
  sumUse[yourChoice]++;

  // 勝った数カウント
  if (nJudge == 1) {
    sumWin[yourChoice]++;
  }

  // 勝率計算
  rateWin[yourChoice].push(100 * sumWin[yourChoice] / sumUse[yourChoice]);//勝率（％）

  // 横軸追加
  if(rateWin[yourChoice].length == labelX.length){
    labelX.push(labelX.length+1);
  }

  // グラフ更新
  drawChart();
}

// グラフ出力関数
function drawChart(impression) {
  var ctx = document.getElementById("myLineChart");
  // すでにグラフ（インスタンス）が生成されている場合は、グラフを破棄する
  // 公式ドキュメント https://misc.0o0o.org/chartjs-doc-ja/developers/api.html#destroy
  if(myLineChart){
    myLineChart.destroy();
  }
  myLineChart = new Chart(ctx, {// インスタンスをグローバル変数で生成
    type: 'line',
    data: {
      labels: labelX,
      datasets: [
        {
          label: '✊ ',
          data: rateWin[0],
          lineTension: 0,
          borderColor: "rgba(255,0,0,1)",
          backgroundColor: "rgba(0,0,0,0)",
          pointBackgroundColor: "rgba(255,0,0,.4)",
          pointRadius:5
        },
        {
          label: '🤞 ',
          data: rateWin[1],
          lineTension: 0,
          borderColor: "rgba(0,0,255,1)",
          backgroundColor: "rgba(0,0,0,0)",
          pointBackgroundColor: "rgba(0,0,255,.4)",
          pointRadius:5
        },
        {
          label: '✋ ',
          data: rateWin[2],
          lineTension: 0,
          borderColor: "rgba(0,150,0,1)",
          backgroundColor: "rgba(0,0,0,0)",
          pointBackgroundColor: "rgba(0,150,0,.4)",
          pointRadius:5
        }
      ],
    },
    options: {
      animation: {
        duration: 0, // アニメーションの時間
      },
      title: {
        display: true,
        text: '勝率(引き分けは負け扱い)'
      },
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: 100,
            suggestedMin: 0,
            stepSize: 10,
            callback: function (value, index, values) {
              return value + '%'
            }
          }
        }]
      },
    }
  });

}
