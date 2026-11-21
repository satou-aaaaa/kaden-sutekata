# AGENTS.md

家電どう捨てる？：捨てたい家電と場面を見て、正しい出し方を当てる1日5問の学習ゲーム。正解したら、どの決まり（家電リサイクル法の4品目・パソコンの回収・小型家電リサイクル法・似ているが外のもの）かも選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（30種類×3000問：選び肢・答えは1つ・答えと2段目が出典どおり・4品目の場面の言葉から答えを出し直す・出典）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は家電リサイクル法（特定家庭用機器再商品化法）第9条・第17条・施行令第1条、小型家電リサイクル法の施行令第1条、経済産業省「パソコンのリサイクル（資源有効利用促進法）」に書いてあることだけ（2026-11-21 に e-Gov 法令 API と経済産業省のページで読んだ。要点は共有フォルダ games/kaden-sutekata-research.md）。種類を足すときも出典を読み、`qa/run.mjs` の表（`ANS`）にも足す。施行令の4品目が改正されたら読み直す（2024年に有機ELテレビが足された）。
- 扱うのは、家電の出し方と決まりだけ。市区町村ごとにちがう出し方（日・場所・料金の額）は答えにしない。リサイクルマークよみ（recycle-mark）・家電の事故よぼう（kaden-anzen）・電気代いくら？（denkidai-ikura）と重ねない。問題の場面は練習の例。
- 公式の情報の代わりにしない：遊び方と「このゲームについて」と README に、公式の情報の代わりではないこと、出す日・場所・料金は市区町村などで確かめ、決まりは法令で確かめることを置く（QA が見る）。
- 問題はどれも、家電と場面から出し方（6つ）を選び、正解したら2段目「どの決まり？」で4つから選ぶ。やさしいは選び肢3つ（同じなかまの出し方を入れない）、ふつう・むずかしいは4つ（むずかしいは同じなかまを必ず入れる）。場面によっては答えにもなる出し方（パソコンの小型家電回収など）は `ng` で選び肢に入れない。4品目の問題は、場面の言葉（買い替え・前の店・車）から QA が答えを出し直して比べる。2回目のヒントはまちがいを消して2つにしぼり、要点（`key`）も見せる。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回し・まちがいの選び肢は、足すだけでも過去の日の問題が変わる。公開後は変えず、変えるときは QA の `PINS`（3日分の5問と上級）を作り直して理由を PR に書く。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「どの決まり？」・復習（1→3→7日後）。記録 `kds-v1`・文字 `kds-fs`・復習 `kds-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は法定速度よみ（hotei-sokudo）から写した。写し元の言葉が残っていないかを QA が見る。保存の読み直しは共通部品 GameStore（`<!-- store:begin -->`〜`end`。shared-workflows `template/store/store.js` の写しで、ここでは直さない）。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
