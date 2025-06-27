// アプリケーションの状態管理
class EnglishPracticeApp {
    constructor() {
        this.currentCategory = null;
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.startTime = null;
        this.stats = this.loadStats();
        this.currentUser = null;
        
        this.init();
    }

    init() {
        this.setupAuthStateListener();
        this.updateUI();
        this.setupEventListeners();
        this.registerServiceWorker();
        this.checkForPWAInstall();
    }

    // 問題データベース
    questionDB = {
        'be-verb': [
            {
                type: '文法問題',
                question: '正しいbe動詞を選んでください: I ( ) a student.',
                options: ['am', 'is', 'are'],
                correct: 0,
                explanation: 'Iの後には常にamを使います。'
            },
            {
                type: '文法問題',
                question: '正しいbe動詞を選んでください: She ( ) very kind.',
                options: ['am', 'is', 'are'],
                correct: 1,
                explanation: 'She（彼女）は三人称単数なのでisを使います。'
            },
            {
                type: '文法問題',
                question: '正しいbe動詞を選んでください: They ( ) my friends.',
                options: ['am', 'is', 'are'],
                correct: 2,
                explanation: 'They（彼ら）は複数なのでareを使います。'
            },
            {
                type: '英作文問題',
                question: '「私は忙しいです」を英語にしてください。',
                options: ['I am busy.', 'I is busy.', 'I are busy.'],
                correct: 0,
                explanation: 'I am busy. が正解です。Iの後にはamを使います。'
            },
            {
                type: '文法問題',
                question: '正しいbe動詞を選んでください: You ( ) a good student.',
                options: ['am', 'is', 'are'],
                correct: 2,
                explanation: 'You（あなた）の後にはareを使います。'
            },
            {
                type: '文法問題',
                question: '正しいbe動詞を選んでください: It ( ) a beautiful day.',
                options: ['am', 'is', 'are'],
                correct: 1,
                explanation: 'It（それ）は三人称単数なのでisを使います。'
            },
            {
                type: '否定文問題',
                question: '「私は学生ではありません」を英語にしてください。',
                options: ['I am not a student.', 'I is not a student.', 'I not am a student.'],
                correct: 0,
                explanation: 'I am not a student. が正解です。be動詞の後にnotを置きます。'
            },
            {
                type: '疑問文問題',
                question: '「あなたは先生ですか？」を英語にしてください。',
                options: ['Are you a teacher?', 'Is you a teacher?', 'Am you a teacher?'],
                correct: 0,
                explanation: 'Are you a teacher? が正解です。疑問文ではbe動詞を前に出します。'
            },
            {
                type: '文法問題',
                question: '正しいbe動詞を選んでください: We ( ) happy.',
                options: ['am', 'is', 'are'],
                correct: 2,
                explanation: 'We（私たち）は複数なのでareを使います。'
            },
            {
                type: '文法問題',
                question: '正しいbe動詞を選んでください: He ( ) my brother.',
                options: ['am', 'is', 'are'],
                correct: 1,
                explanation: 'He（彼）は三人称単数なのでisを使います。'
            }
        ],
        'general-verb': [
            {
                type: '文法問題',
                question: '正しい動詞を選んでください: I ( ) tennis every day.',
                options: ['play', 'plays', 'playing'],
                correct: 0,
                explanation: 'I（私）の後には動詞の原形playを使います。'
            },
            {
                type: '文法問題',
                question: '正しい動詞を選んでください: She ( ) English.',
                options: ['study', 'studies', 'studying'],
                correct: 1,
                explanation: 'She（彼女）は三人称単数なのでstudiesを使います。'
            },
            {
                type: '文法問題',
                question: '正しい動詞を選んでください: They ( ) soccer.',
                options: ['play', 'plays', 'playing'],
                correct: 0,
                explanation: 'They（彼ら）の後には動詞の原形playを使います。'
            },
            {
                type: '文法問題',
                question: '正しい動詞を選んでください: He ( ) books.',
                options: ['read', 'reads', 'reading'],
                correct: 1,
                explanation: 'He（彼）は三人称単数なのでreadsを使います。'
            },
            {
                type: '文法問題',
                question: '正しい動詞を選んでください: We ( ) breakfast at 7.',
                options: ['eat', 'eats', 'eating'],
                correct: 0,
                explanation: 'We（私たち）の後には動詞の原形eatを使います。'
            },
            {
                type: '文法問題',
                question: '正しい動詞を選んでください: My mother ( ) dinner.',
                options: ['cook', 'cooks', 'cooking'],
                correct: 1,
                explanation: 'My mother（私の母）は三人称単数なのでcooksを使います。'
            },
            {
                type: '文法問題',
                question: '正しい動詞を選んでください: You ( ) music.',
                options: ['like', 'likes', 'liking'],
                correct: 0,
                explanation: 'You（あなた）の後には動詞の原形likeを使います。'
            },
            {
                type: '文法問題',
                question: '正しい動詞を選んでください: It ( ) a lot here.',
                options: ['rain', 'rains', 'raining'],
                correct: 1,
                explanation: 'It（それ）は三人称単数なのでrainsを使います。'
            },
            {
                type: '文法問題',
                question: '正しい動詞を選んでください: The children ( ) in the park.',
                options: ['play', 'plays', 'playing'],
                correct: 0,
                explanation: 'The children（子供たち）は複数なのでplayを使います。'
            },
            {
                type: '文法問題',
                question: '正しい動詞を選んでください: My dog ( ) very fast.',
                options: ['run', 'runs', 'running'],
                correct: 1,
                explanation: 'My dog（私の犬）は三人称単数なのでrunsを使います。'
            }
        ],
        'question': [
            {
                type: '疑問文問題',
                question: 'be動詞の疑問文: 「あなたは忙しいですか？」',
                options: ['Are you busy?', 'Is you busy?', 'Do you busy?'],
                correct: 0,
                explanation: 'be動詞の疑問文は「be動詞 + 主語」の順にします。'
            },
            {
                type: '疑問文問題',
                question: '一般動詞の疑問文: 「あなたはテニスをしますか？」',
                options: ['Do you play tennis?', 'Are you play tennis?', 'Play you tennis?'],
                correct: 0,
                explanation: '一般動詞の疑問文は「Do/Does + 主語 + 動詞の原形」です。'
            },
            {
                type: '疑問文問題',
                question: '一般動詞の疑問文: 「彼は音楽を聞きますか？」',
                options: ['Does he listen to music?', 'Do he listen to music?', 'Is he listen to music?'],
                correct: 0,
                explanation: '三人称単数にはDoesを使い、動詞は原形にします。'
            },
            {
                type: '疑問文問題',
                question: 'be動詞の疑問文: 「彼女は先生ですか？」',
                options: ['Is she a teacher?', 'Are she a teacher?', 'Does she a teacher?'],
                correct: 0,
                explanation: '三人称単数のbe動詞の疑問文はIsを使います。'
            },
            {
                type: '疑問文問題',
                question: '一般動詞の疑問文: 「彼らは毎日勉強しますか？」',
                options: ['Do they study every day?', 'Does they study every day?', 'Are they study every day?'],
                correct: 0,
                explanation: '複数の主語にはDoを使います。'
            },
            {
                type: '疑問文問題',
                question: '一般動詞の疑問文: 「あなたは本を読みますか？」',
                options: ['Do you read books?', 'Are you read books?', 'Does you read books?'],
                correct: 0,
                explanation: 'YouにはDoを使い、動詞は原形readです。'
            },
            {
                type: '疑問文問題',
                question: 'be動詞の疑問文: 「それは猫ですか？」',
                options: ['Is it a cat?', 'Are it a cat?', 'Does it a cat?'],
                correct: 0,
                explanation: 'Itは三人称単数なのでIsを使います。'
            },
            {
                type: '疑問文問題',
                question: '一般動詞の疑問文: 「彼女は英語を話しますか？」',
                options: ['Does she speak English?', 'Do she speak English?', 'Is she speak English?'],
                correct: 0,
                explanation: '三人称単数にはDoesを使い、動詞speakは原形にします。'
            },
            {
                type: '疑問文問題',
                question: 'be動詞の疑問文: 「私たちは友達ですか？」',
                options: ['Are we friends?', 'Is we friends?', 'Do we friends?'],
                correct: 0,
                explanation: 'Weは複数なのでAreを使います。'
            },
            {
                type: '疑問文問題',
                question: '一般動詞の疑問文: 「あなたは料理をしますか？」',
                options: ['Do you cook?', 'Are you cook?', 'Does you cook?'],
                correct: 0,
                explanation: 'Youの一般動詞疑問文はDoを使います。'
            }
        ],
        'negative': [
            {
                type: '否定文問題',
                question: 'be動詞の否定文: 「私は忙しくありません」',
                options: ['I am not busy.', 'I not am busy.', "I don't busy."],
                correct: 0,
                explanation: 'be動詞の否定文は「be動詞 + not」です。'
            },
            {
                type: '否定文問題',
                question: '一般動詞の否定文: 「私はテニスをしません」',
                options: ["I don't play tennis.", 'I am not play tennis.', 'I not play tennis.'],
                correct: 0,
                explanation: '一般動詞の否定文は「don\'t/doesn\'t + 動詞の原形」です。'
            },
            {
                type: '否定文問題',
                question: '一般動詞の否定文: 「彼は音楽を聞きません」',
                options: ["He doesn't listen to music.", "He don't listen to music.", 'He is not listen to music.'],
                correct: 0,
                explanation: '三人称単数の否定文はdoesn\'tを使います。'
            },
            {
                type: '否定文問題',
                question: 'be動詞の否定文: 「彼女は先生ではありません」',
                options: ['She is not a teacher.', 'She not is a teacher.', "She doesn't a teacher."],
                correct: 0,
                explanation: 'be動詞isの否定文は「is not」または「isn\'t」です。'
            },
            {
                type: '否定文問題',
                question: '一般動詞の否定文: 「彼らは毎日勉強しません」',
                options: ["They don't study every day.", "They doesn't study every day.", 'They are not study every day.'],
                correct: 0,
                explanation: '複数の主語の否定文はdon\'tを使います。'
            },
            {
                type: '否定文問題',
                question: 'be動詞の否定文: 「それは私の本ではありません」',
                options: ['It is not my book.', 'It not is my book.', "It doesn't my book."],
                correct: 0,
                explanation: 'be動詞の否定文は「is not」または「isn\'t」です。'
            },
            {
                type: '否定文問題',
                question: '一般動詞の否定文: 「あなたは本を読みません」',
                options: ["You don't read books.", "You doesn't read books.", 'You are not read books.'],
                correct: 0,
                explanation: 'Youの一般動詞否定文はdon\'tを使います。'
            },
            {
                type: '否定文問題',
                question: '一般動詞の否定文: 「彼女は英語を話しません」',
                options: ["She doesn't speak English.", "She don't speak English.", 'She is not speak English.'],
                correct: 0,
                explanation: '三人称単数の否定文はdoesn\'tを使い、動詞は原形にします。'
            },
            {
                type: '否定文問題',
                question: 'be動詞の否定文: 「私たちは友達ではありません」',
                options: ['We are not friends.', 'We not are friends.', "We don't friends."],
                correct: 0,
                explanation: 'be動詞areの否定文は「are not」または「aren\'t」です。'
            },
            {
                type: '否定文問題',
                question: '一般動詞の否定文: 「私は肉を食べません」',
                options: ["I don't eat meat.", "I doesn't eat meat.", 'I am not eat meat.'],
                correct: 0,
                explanation: 'Iの一般動詞否定文はdon\'tを使います。'
            }
        ],
        'tense': [
            {
                type: '時制問題',
                question: '現在形: 「私は毎日英語を勉強します」',
                options: ['I study English every day.', 'I studied English every day.', 'I will study English every day.'],
                correct: 0,
                explanation: '習慣を表すときは現在形を使います。'
            },
            {
                type: '時制問題',
                question: '過去形: 「昨日雨が降りました」',
                options: ['It rained yesterday.', 'It rains yesterday.', 'It will rain yesterday.'],
                correct: 0,
                explanation: '昨日（yesterday）なので過去形rainedを使います。'
            },
            {
                type: '時制問題',
                question: '未来形: 「明日東京に行きます」',
                options: ['I will go to Tokyo tomorrow.', 'I go to Tokyo tomorrow.', 'I went to Tokyo tomorrow.'],
                correct: 0,
                explanation: '明日（tomorrow）なので未来形will goを使います。'
            },
            {
                type: '時制問題',
                question: '過去形: 「彼は先週映画を見ました」',
                options: ['He watched a movie last week.', 'He watches a movie last week.', 'He will watch a movie last week.'],
                correct: 0,
                explanation: '先週（last week）なので過去形watchedを使います。'
            },
            {
                type: '時制問題',
                question: '現在形: 「太陽は東から昇ります」',
                options: ['The sun rises in the east.', 'The sun rose in the east.', 'The sun will rise in the east.'],
                correct: 0,
                explanation: '一般的な事実を表すときは現在形を使います。'
            },
            {
                type: '時制問題',
                question: '未来形: 「来年大学生になります」',
                options: ['I will be a university student next year.', 'I am a university student next year.', 'I was a university student next year.'],
                correct: 0,
                explanation: '来年（next year）なので未来形will beを使います。'
            },
            {
                type: '時制問題',
                question: '過去形: 「私たちは昨日忙しかった」',
                options: ['We were busy yesterday.', 'We are busy yesterday.', 'We will be busy yesterday.'],
                correct: 0,
                explanation: '昨日（yesterday）なのでbe動詞の過去形wereを使います。'
            },
            {
                type: '時制問題',
                question: '現在形: 「彼女は毎朝6時に起きます」',
                options: ['She gets up at 6 every morning.', 'She got up at 6 every morning.', 'She will get up at 6 every morning.'],
                correct: 0,
                explanation: '毎朝（every morning）の習慣なので現在形を使います。'
            },
            {
                type: '時制問題',
                question: '過去形（不規則動詞）: 「私は昨日本を読みました」',
                options: ['I read a book yesterday.', 'I readed a book yesterday.', 'I will read a book yesterday.'],
                correct: 0,
                explanation: 'readの過去形はreadです（発音は異なります）。'
            },
            {
                type: '時制問題',
                question: '未来形: 「彼らは来月結婚します」',
                options: ['They will get married next month.', 'They get married next month.', 'They got married next month.'],
                correct: 0,
                explanation: '来月（next month）なので未来形will get marriedを使います。'
            },
            {
                type: '時制問題',
                question: '過去形（不規則動詞）: 「彼は朝食を食べました」',
                options: ['He ate breakfast.', 'He eated breakfast.', 'He will eat breakfast.'],
                correct: 0,
                explanation: 'eatの過去形はateです。'
            },
            {
                type: '時制問題',
                question: '現在進行形: 「私は今本を読んでいます」',
                options: ['I am reading a book now.', 'I read a book now.', 'I will read a book now.'],
                correct: 0,
                explanation: '今（now）進行中の動作なので現在進行形am readingを使います。'
            },
            {
                type: '時制問題',
                question: '過去進行形: 「彼女は7時に料理をしていました」',
                options: ['She was cooking at 7.', 'She cooked at 7.', 'She will cook at 7.'],
                correct: 0,
                explanation: '過去の特定の時間に進行中だった動作なので過去進行形was cookingを使います。'
            },
            {
                type: '時制問題',
                question: '現在完了形（経験）: 「私は日本に行ったことがあります」',
                options: ['I have been to Japan.', 'I went to Japan.', 'I will go to Japan.'],
                correct: 0,
                explanation: '経験を表すときは現在完了形have beenを使います。'
            },
            {
                type: '時制問題',
                question: '現在完了形（継続）: 「私は5年間ここに住んでいます」',
                options: ['I have lived here for 5 years.', 'I live here for 5 years.', 'I lived here for 5 years.'],
                correct: 0,
                explanation: '過去から現在まで続いている状態なので現在完了形have livedを使います。'
            }
        ],
        'auxiliary': [
            {
                type: '助動詞問題',
                question: '能力: 「私は泳ぐことができます」',
                options: ['I can swim.', 'I must swim.', 'I should swim.'],
                correct: 0,
                explanation: '能力を表すときはcanを使います。'
            },
            {
                type: '助動詞問題',
                question: '未来・意志: 「明日あなたを手伝います」',
                options: ['I will help you tomorrow.', 'I can help you tomorrow.', 'I must help you tomorrow.'],
                correct: 0,
                explanation: '未来の意志を表すときはwillを使います。'
            },
            {
                type: '助動詞問題',
                question: '義務: 「あなたは宿題をしなければなりません」',
                options: ['You must do your homework.', 'You can do your homework.', 'You may do your homework.'],
                correct: 0,
                explanation: '義務を表すときはmustを使います。'
            },
            {
                type: '助動詞問題',
                question: 'アドバイス: 「あなたはもっと勉強すべきです」',
                options: ['You should study more.', 'You can study more.', 'You will study more.'],
                correct: 0,
                explanation: 'アドバイスを表すときはshouldを使います。'
            },
            {
                type: '助動詞問題',
                question: '許可: 「ここで写真を撮ってもいいですか？」',
                options: ['May I take a picture here?', 'Must I take a picture here?', 'Will I take a picture here?'],
                correct: 0,
                explanation: '丁寧に許可を求めるときはmayを使います。'
            },
            {
                type: '助動詞問題',
                question: '否定文: 「私は中国語を話せません」',
                options: ["I can't speak Chinese.", "I mustn't speak Chinese.", "I shouldn't speak Chinese."],
                correct: 0,
                explanation: 'canの否定形はcan\'t（cannot）です。'
            },
            {
                type: '助動詞問題',
                question: '疑問文: 「あなたは車を運転できますか？」',
                options: ['Can you drive a car?', 'Must you drive a car?', 'Should you drive a car?'],
                correct: 0,
                explanation: '能力について質問するときはcanを使います。'
            },
            {
                type: '助動詞問題',
                question: '禁止: 「ここで煙草を吸ってはいけません」',
                options: ["You mustn't smoke here.", "You can't smoke here.", "You shouldn't smoke here."],
                correct: 0,
                explanation: '強い禁止を表すときはmustn\'tを使います。'
            },
            {
                type: '助動詞問題',
                question: '推測: 「彼は疲れているに違いない」',
                options: ['He must be tired.', 'He can be tired.', 'He should be tired.'],
                correct: 0,
                explanation: '強い推測を表すときはmustを使います。'
            },
            {
                type: '助動詞問題',
                question: '依頼: 「窓を開けてくれませんか？」',
                options: ['Will you open the window?', 'Must you open the window?', 'Should you open the window?'],
                correct: 0,
                explanation: '依頼するときはwillを使います。'
            }
        ],
        'advanced': [
            {
                type: '受動態問題',
                question: '受動態: 「この本は多くの人に読まれています」',
                options: ['This book is read by many people.', 'This book reads by many people.', 'Many people is read this book.'],
                correct: 0,
                explanation: '受動態は「be動詞 + 過去分詞」で作ります。'
            },
            {
                type: '受動態問題',
                question: '受動態: 「この手紙は昨日書かれました」',
                options: ['This letter was written yesterday.', 'This letter wrote yesterday.', 'Yesterday wrote this letter.'],
                correct: 0,
                explanation: '過去の受動態は「was/were + 過去分詞」です。'
            },
            {
                type: '不定詞問題',
                question: '不定詞（名詞的用法）: 「英語を勉強することは楽しいです」',
                options: ['To study English is fun.', 'Study English is fun.', 'Studying English is fun.'],
                correct: 0,
                explanation: '主語として使う場合は不定詞「to + 動詞の原形」を使います。'
            },
            {
                type: '不定詞問題',
                question: '不定詞（名詞的用法）: 「私は本を読みたいです」',
                options: ['I want to read a book.', 'I want read a book.', 'I want reading a book.'],
                correct: 0,
                explanation: 'wantの後には不定詞「to + 動詞の原形」を使います。'
            },
            {
                type: '不定詞問題',
                question: '不定詞（形容詞的用法）: 「私には何かすることがあります」',
                options: ['I have something to do.', 'I have something do.', 'I have something doing.'],
                correct: 0,
                explanation: '名詞を修飾する場合は「to + 動詞の原形」を使います。'
            },
            {
                type: '不定詞問題',
                question: '不定詞（副詞的用法）: 「私は牛乳を買うために店に行きました」',
                options: ['I went to the store to buy milk.', 'I went to the store for buy milk.', 'I went to the store buying milk.'],
                correct: 0,
                explanation: '目的を表すときは「to + 動詞の原形」を使います。'
            },
            {
                type: '現在完了問題',
                question: '現在完了（経験）: 「あなたは寿司を食べたことがありますか？」',
                options: ['Have you ever eaten sushi?', 'Do you ever eat sushi?', 'Did you ever eat sushi?'],
                correct: 0,
                explanation: '経験を表すときは「have/has + 過去分詞」を使います。'
            },
            {
                type: '現在完了問題',
                question: '現在完了（継続）: 「私は3年間英語を勉強しています」',
                options: ['I have studied English for 3 years.', 'I study English for 3 years.', 'I studied English for 3 years.'],
                correct: 0,
                explanation: '継続を表すときは「have/has + 過去分詞」とforを使います。'
            },
            {
                type: '現在完了問題',
                question: '現在完了（完了）: 「私はちょうど宿題を終えました」',
                options: ['I have just finished my homework.', 'I just finish my homework.', 'I just finished my homework.'],
                correct: 0,
                explanation: '完了を表すときは「have/has + 過去分詞」とjustを使います。'
            },
            {
                type: '進行形問題',
                question: '現在進行形: 「彼らは今サッカーをしています」',
                options: ['They are playing soccer now.', 'They play soccer now.', 'They played soccer now.'],
                correct: 0,
                explanation: '今進行中の動作は「be動詞 + 動詞のing形」で表します。'
            },
            {
                type: '進行形問題',
                question: '過去進行形: 「私があなたに電話したとき、あなたは何をしていましたか？」',
                options: ['What were you doing when I called you?', 'What did you do when I called you?', 'What do you do when I called you?'],
                correct: 0,
                explanation: '過去の特定の時点で進行中だった動作は「was/were + 動詞のing形」です。'
            },
            {
                type: '受動態問題',
                question: '受動態の疑問文: 「英語はカナダで話されますか？」',
                options: ['Is English spoken in Canada?', 'Does English speak in Canada?', 'Do English speak in Canada?'],
                correct: 0,
                explanation: '受動態の疑問文は「be動詞 + 主語 + 過去分詞」です。'
            },
            {
                type: '受動態問題',
                question: '受動態の否定文: 「この家は去年建てられませんでした」',
                options: ['This house was not built last year.', 'This house did not build last year.', 'This house not built last year.'],
                correct: 0,
                explanation: '受動態の否定文は「be動詞 + not + 過去分詞」です。'
            },
            {
                type: '不定詞問題',
                question: '疑問詞 + 不定詞: 「どこに行くべきかわかりません」',
                options: ["I don't know where to go.", "I don't know where go.", "I don't know where going."],
                correct: 0,
                explanation: '疑問詞の後の不定詞は「疑問詞 + to + 動詞の原形」です。'
            },
            {
                type: '現在完了問題',
                question: '現在完了の否定文: 「私はまだ宿題を終えていません」',
                options: ["I haven't finished my homework yet.", "I don't finish my homework yet.", "I didn't finish my homework yet."],
                correct: 0,
                explanation: '現在完了の否定文は「have/has + not + 過去分詞」です。'
            }
        ],
        'vocabulary': [
            {
                type: '単語問題',
                question: '「family」の意味は？',
                options: ['家族', '友達', '学校'],
                correct: 0,
                explanation: 'familyは「家族」という意味です。'
            },
            {
                type: '単語問題',
                question: '「student」の意味は？',
                options: ['先生', '学生', '医者'],
                correct: 1,
                explanation: 'studentは「学生」という意味です。'
            },
            {
                type: '単語問題',
                question: '「breakfast」の意味は？',
                options: ['昼食', '夕食', '朝食'],
                correct: 2,
                explanation: 'breakfastは「朝食」という意味です。'
            },
            {
                type: '単語問題',
                question: '「yesterday」の意味は？',
                options: ['今日', '明日', '昨日'],
                correct: 2,
                explanation: 'yesterdayは「昨日」という意味です。'
            },
            {
                type: '単語問題',
                question: '「library」の意味は？',
                options: ['図書館', '病院', '公園'],
                correct: 0,
                explanation: 'libraryは「図書館」という意味です。'
            },
            {
                type: '英作文問題',
                question: '「忙しい」を英語で言うと？',
                options: ['busy', 'happy', 'tired'],
                correct: 0,
                explanation: '「忙しい」はbusyです。'
            },
            {
                type: '英作文問題',
                question: '「料理する」を英語で言うと？',
                options: ['eat', 'cook', 'drink'],
                correct: 1,
                explanation: '「料理する」はcookです。'
            },
            {
                type: '単語問題',
                question: '「important」の意味は？',
                options: ['簡単な', '重要な', '難しい'],
                correct: 1,
                explanation: 'importantは「重要な」という意味です。'
            },
            {
                type: '単語問題',
                question: '「beautiful」の意味は？',
                options: ['美しい', '大きい', '小さい'],
                correct: 0,
                explanation: 'beautifulは「美しい」という意味です。'
            },
            {
                type: '英作文問題',
                question: '「始める」を英語で言うと？',
                options: ['finish', 'start', 'stop'],
                correct: 1,
                explanation: '「始める」はstartまたはbeginです。'
            },
            {
                type: '英作文問題',
                question: '「教える」を英語で言うと？',
                options: ['learn', 'teach', 'study'],
                correct: 1,
                explanation: '「教える」はteachです。'
            },
            {
                type: '単語問題',
                question: '「hospital」の意味は？',
                options: ['学校', '病院', '店'],
                correct: 1,
                explanation: 'hospitalは「病院」という意味です。'
            },
            {
                type: '単語問題',
                question: '「weather」の意味は？',
                options: ['天気', '時間', '場所'],
                correct: 0,
                explanation: 'weatherは「天気」という意味です。'
            },
            {
                type: '英作文問題',
                question: '「旅行」を英語で言うと？',
                options: ['trip', 'work', 'study'],
                correct: 0,
                explanation: '「旅行」はtripまたはtravelです。'
            },
            {
                type: '英作文問題',
                question: '「忘れる」を英語で言うと？',
                options: ['remember', 'forget', 'think'],
                correct: 1,
                explanation: '「忘れる」はforgetです。'
            },
            {
                type: '単語問題',
                question: '「probably」の意味は？',
                options: ['絶対に', 'たぶん', '決して'],
                correct: 1,
                explanation: 'probablyは「たぶん」という意味です。'
            },
            {
                type: '単語問題',
                question: '「necessary」の意味は？',
                options: ['不要な', '必要な', '簡単な'],
                correct: 1,
                explanation: 'necessaryは「必要な」という意味です。'
            },
            {
                type: '英作文問題',
                question: '「急ぐ」を英語で言うと？',
                options: ['walk', 'hurry', 'stop'],
                correct: 1,
                explanation: '「急ぐ」はhurryです。'
            },
            {
                type: '英作文問題',
                question: '「働く」を英語で言うと？',
                options: ['play', 'work', 'sleep'],
                correct: 1,
                explanation: '「働く」はworkです。'
            },
            {
                type: '単語問題',
                question: '「vacation」の意味は？',
                options: ['仕事', '休暇', '勉強'],
                correct: 1,
                explanation: 'vacationは「休暇」という意味です。'
            }
        ]
    };

    // カテゴリ開始
    startCategory(categoryId) {
        this.currentCategory = categoryId;
        this.currentQuestions = this.shuffleArray([...this.questionDB[categoryId]]);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.startTime = new Date();
        
        this.showSection('quiz-section');
        this.updateQuizHeader();
        this.displayQuestion();
    }

    // ランダムテスト開始
    startRandomTest() {
        const allQuestions = [];
        Object.values(this.questionDB).forEach(questions => {
            allQuestions.push(...questions);
        });
        
        this.currentCategory = 'random';
        this.currentQuestions = this.shuffleArray(allQuestions).slice(0, 20);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.startTime = new Date();
        
        this.showSection('quiz-section');
        this.updateQuizHeader();
        this.displayQuestion();
    }

    // 配列をシャッフル
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // 問題表示
    displayQuestion() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        
        document.getElementById('question-type').textContent = question.type;
        document.getElementById('question-text').textContent = question.question;
        
        const optionsContainer = document.getElementById('answer-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-option';
            optionElement.textContent = option;
            optionElement.onclick = () => this.selectAnswer(index);
            optionsContainer.appendChild(optionElement);
        });
        
        this.selectedAnswer = null;
        document.getElementById('submit-btn').disabled = true;
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('feedback').style.display = 'none';
    }

    // 答え選択
    selectAnswer(index) {
        // 既に回答済みの場合は選択不可
        if (document.querySelector('.answer-option.correct, .answer-option.incorrect')) {
            return;
        }
        
        // 以前の選択を解除
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // 新しい選択を設定
        document.querySelectorAll('.answer-option')[index].classList.add('selected');
        this.selectedAnswer = index;
        document.getElementById('submit-btn').disabled = false;
    }

    // 回答提出
    submitAnswer() {
        if (this.selectedAnswer === null) return;
        
        const question = this.currentQuestions[this.currentQuestionIndex];
        const isCorrect = this.selectedAnswer === question.correct;
        
        // スコア更新
        if (isCorrect) {
            this.score += 10;
            this.updateStats(this.currentCategory, true);
        } else {
            this.updateStats(this.currentCategory, false);
        }
        
        // UI更新
        this.showAnswerFeedback(isCorrect, question);
        document.getElementById('submit-btn').style.display = 'none';
        document.getElementById('next-btn').style.display = 'inline-flex';
        
        // スコア表示更新
        document.getElementById('current-score').textContent = this.score;
        document.getElementById('total-score').textContent = this.stats.totalScore;
    }

    // 回答フィードバック表示
    showAnswerFeedback(isCorrect, question) {
        const options = document.querySelectorAll('.answer-option');
        
        // 正解を緑色に
        options[question.correct].classList.add('correct');
        
        // 不正解を赤色に
        if (!isCorrect) {
            options[this.selectedAnswer].classList.add('incorrect');
        }
        
        // すべての選択肢を無効化
        options.forEach(option => {
            option.classList.add('disabled');
            option.onclick = null;
        });
        
        // フィードバック表示
        const feedback = document.getElementById('feedback');
        feedback.style.display = 'block';
        feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        
        feedback.innerHTML = `
            <div class="feedback-title">
                <span class="material-icons">${isCorrect ? 'check_circle' : 'cancel'}</span>
                ${isCorrect ? '正解！' : '不正解'}
            </div>
            <p>${question.explanation}</p>
        `;
    }

    // 次の問題
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex >= this.currentQuestions.length) {
            this.showResults();
        } else {
            this.updateQuizHeader();
            this.displayQuestion();
            document.getElementById('submit-btn').style.display = 'inline-flex';
        }
    }

    // クイズヘッダー更新
    updateQuizHeader() {
        const categoryNames = {
            'be-verb': 'be動詞',
            'general-verb': '一般動詞',
            'question': '疑問文',
            'negative': '否定文',
            'tense': '時制',
            'auxiliary': '助動詞',
            'advanced': '応用文法',
            'vocabulary': '基本単語',
            'random': 'ランダム練習'
        };
        
        document.getElementById('category-title').textContent = categoryNames[this.currentCategory];
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.currentQuestions.length;
        document.getElementById('current-score').textContent = this.score;
    }

    // 結果表示
    showResults() {
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - this.startTime) / 1000);
        const totalQuestions = this.currentQuestions.length;
        const correctAnswers = this.score / 10;
        const incorrectAnswers = totalQuestions - correctAnswers;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        // 結果メッセージ
        let resultIcon, resultMessage;
        if (percentage >= 90) {
            resultIcon = '🎉';
            resultMessage = '素晴らしい！完璧に近い結果です！';
        } else if (percentage >= 80) {
            resultIcon = '🌟';
            resultMessage = 'とても良い結果です！';
        } else if (percentage >= 70) {
            resultIcon = '👍';
            resultMessage = 'まずまずの結果です。復習して更に上達しましょう！';
        } else if (percentage >= 60) {
            resultIcon = '📚';
            resultMessage = 'もう少しです。基礎をしっかり復習しましょう！';
        } else {
            resultIcon = '💪';
            resultMessage = '諦めずに頑張りましょう！基礎から復習することをお勧めします。';
        }
        
        // UI更新
        document.getElementById('result-icon').textContent = resultIcon;
        document.getElementById('result-message').textContent = resultMessage;
        document.getElementById('final-score').textContent = correctAnswers;
        document.getElementById('final-total').textContent = totalQuestions;
        document.getElementById('score-percentage').textContent = `${percentage}%`;
        document.getElementById('correct-count').textContent = correctAnswers;
        document.getElementById('incorrect-count').textContent = incorrectAnswers;
        document.getElementById('time-taken').textContent = this.formatTime(timeTaken);
        
        this.showSection('result-section');
        
        // 統計更新
        this.updateGlobalStats(correctAnswers, totalQuestions);
        this.saveStats();
    }

    // 時間フォーマット
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}分${secs}秒`;
    }

    // 統計更新
    updateStats(category, isCorrect) {
        if (!this.stats.categories[category]) {
            this.stats.categories[category] = {
                attempted: 0,
                correct: 0,
                totalScore: 0
            };
        }
        
        this.stats.categories[category].attempted++;
        if (isCorrect) {
            this.stats.categories[category].correct++;
            this.stats.categories[category].totalScore += 10;
            this.stats.totalScore += 10;
        }
        
        this.stats.totalAttempted++;
        this.updateProgress();
    }

    // グローバル統計更新
    updateGlobalStats(correct, total) {
        this.stats.totalQuizzes++;
        this.stats.totalCorrect += correct;
        this.stats.totalQuestions += total;
        
        document.getElementById('completed-questions').textContent = this.stats.totalQuestions;
    }

    // 進捗更新
    updateProgress() {
        Object.keys(this.questionDB).forEach(category => {
            const categoryStats = this.stats.categories[category];
            if (categoryStats) {
                const totalQuestions = this.questionDB[category].length;
                const progress = Math.min((categoryStats.attempted / totalQuestions) * 100, 100);
                const progressBar = document.querySelector(`[data-category="${category}"]`);
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
            }
        });
    }

    // セクション表示
    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // ホームに戻る
    goHome() {
        this.showSection('home-section');
        this.updateUI();
    }

    // クイズリトライ
    retryQuiz() {
        if (this.currentCategory === 'random') {
            this.startRandomTest();
        } else {
            this.startCategory(this.currentCategory);
        }
    }

    // 統計表示
    showStats() {
        this.updateStatsDisplay();
        this.showSection('stats-section');
    }

    // 統計表示更新
    updateStatsDisplay() {
        document.getElementById('total-points').textContent = this.stats.totalScore;
        document.getElementById('total-answered').textContent = this.stats.totalQuestions;
        
        const averageScore = this.stats.totalQuestions > 0 
            ? Math.round((this.stats.totalCorrect / this.stats.totalQuestions) * 100)
            : 0;
        document.getElementById('average-score').textContent = `${averageScore}%`;
        
        // カテゴリ別統計
        const categoryStatsContainer = document.getElementById('category-stats');
        categoryStatsContainer.innerHTML = '';
        
        Object.entries(this.stats.categories).forEach(([category, stats]) => {
            const categoryNames = {
                'be-verb': 'be動詞',
                'general-verb': '一般動詞',
                'question': '疑問文',
                'negative': '否定文',
                'tense': '時制',
                'auxiliary': '助動詞',
                'advanced': '応用文法',
                'vocabulary': '基本単語'
            };
            
            const accuracy = stats.attempted > 0 
                ? Math.round((stats.correct / stats.attempted) * 100)
                : 0;
            
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-stat';
            categoryElement.innerHTML = `
                <h4>${categoryNames[category] || category}</h4>
                <div class="stat-row">
                    <span>挑戦数</span>
                    <span>${stats.attempted}問</span>
                </div>
                <div class="stat-row">
                    <span>正答数</span>
                    <span>${stats.correct}問</span>
                </div>
                <div class="stat-row">
                    <span>正答率</span>
                    <span>${accuracy}%</span>
                </div>
                <div class="stat-row">
                    <span>獲得ポイント</span>
                    <span>${stats.totalScore}点</span>
                </div>
            `;
            categoryStatsContainer.appendChild(categoryElement);
        });
    }

    // UI更新
    updateUI() {
        document.getElementById('total-score').textContent = this.stats.totalScore;
        document.getElementById('completed-questions').textContent = this.stats.totalQuestions;
        this.updateProgress();
    }

    // イベントリスナー設定
    setupEventListeners() {
        // グローバル関数として設定
        window.startCategory = (category) => this.startCategory(category);
        window.startRandomTest = () => this.startRandomTest();
        window.showStats = () => this.showStats();
        window.goHome = () => this.goHome();
        window.submitAnswer = () => this.submitAnswer();
        window.nextQuestion = () => this.nextQuestion();
        window.retryQuiz = () => this.retryQuiz();
    }

    // 統計保存
    saveStats() {
        localStorage.setItem('englishPracticeStats', JSON.stringify(this.stats));
        
        // ログイン中の場合、クラウドにも保存
        if (this.currentUser) {
            this.saveUserData();
        }
    }

    // 統計読み込み
    loadStats() {
        const saved = localStorage.getItem('englishPracticeStats');
        return saved ? JSON.parse(saved) : {
            totalScore: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            totalQuizzes: 0,
            totalAttempted: 0,
            categories: {}
        };
    }

    // Service Worker登録
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    // PWAインストール可能性チェック
    checkForPWAInstall() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // インストールボタンを表示
            this.showInstallButton(deferredPrompt);
        });
        
        // インストール後の処理
        window.addEventListener('appinstalled', () => {
            console.log('PWA installed successfully');
            deferredPrompt = null;
            this.hideInstallButton();
        });
    }

    // インストールボタン表示
    showInstallButton(deferredPrompt) {
        // ヘッダーにインストールボタンを追加
        const header = document.querySelector('.header .container');
        const installBtn = document.createElement('button');
        installBtn.id = 'install-btn';
        installBtn.className = 'install-btn';
        installBtn.innerHTML = `
            <span class="material-icons">get_app</span>
            アプリをインストール
        `;
        
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const result = await deferredPrompt.userChoice;
                console.log('PWA install result:', result);
                deferredPrompt = null;
                this.hideInstallButton();
            }
        });
        
        header.appendChild(installBtn);
    }

    // インストールボタン非表示
    hideInstallButton() {
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.remove();
        }
    }

    // Firebase認証状態リスナー
    setupAuthStateListener() {
        // Firebase初期化を待つ
        const checkFirebase = () => {
            if (window.firebaseAuth) {
                window.firebaseAuth.onAuthStateChanged((user) => {
                    this.currentUser = user;
                    this.updateAuthUI();
                    
                    if (user) {
                        console.log('ユーザーログイン:', user.displayName);
                        this.loadUserData();
                    } else {
                        console.log('ユーザーログアウト');
                        this.loadStats(); // ローカルデータにフォールバック
                    }
                });
            } else {
                // Firebase未初期化の場合、100ms後に再試行
                setTimeout(checkFirebase, 100);
            }
        };
        checkFirebase();
    }

    // 認証UI更新
    updateAuthUI() {
        const loginSection = document.getElementById('login-section');
        const userSection = document.getElementById('user-section');
        
        if (this.currentUser) {
            // ログイン後
            loginSection.style.display = 'none';
            userSection.style.display = 'flex';
            
            document.getElementById('user-name').textContent = this.currentUser.displayName || 'ユーザー';
            document.getElementById('user-avatar').src = this.currentUser.photoURL || '';
        } else {
            // 未ログイン
            loginSection.style.display = 'flex';
            userSection.style.display = 'none';
        }
    }

    // Firestoreからユーザーデータ読み込み
    async loadUserData() {
        if (!this.currentUser || !window.firebaseDb) return;
        
        try {
            const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const userDocRef = doc(window.firebaseDb, 'users', this.currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const cloudData = userDoc.data().stats;
                console.log('✅ クラウドからデータ読み込み:', cloudData);
                this.stats = cloudData || this.loadStats();
            } else {
                console.log('🆕 初回ログイン: ローカルデータをクラウドに保存');
                // 初回ログイン：ローカルデータをクラウドに保存
                await this.saveUserData();
            }
            
            this.updateUI();
        } catch (error) {
            console.error('❌ ユーザーデータ読み込みエラー:', error);
            console.error('エラー詳細:', error.message);
        }
    }

    // Firestoreにユーザーデータ保存
    async saveUserData() {
        if (!this.currentUser || !window.firebaseDb) {
            console.log('保存スキップ: ユーザー未ログインまたはFirebase未初期化');
            return;
        }
        
        try {
            const { doc, setDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const userDocRef = doc(window.firebaseDb, 'users', this.currentUser.uid);
            
            console.log('Firestoreに保存中...', this.stats);
            
            await setDoc(userDocRef, {
                stats: this.stats,
                lastUpdated: serverTimestamp(),
                displayName: this.currentUser.displayName,
                email: this.currentUser.email
            }, { merge: true });
            
            console.log('✅ クラウドにデータ保存完了:', this.stats);
        } catch (error) {
            console.error('❌ ユーザーデータ保存エラー:', error);
            console.error('エラー詳細:', error.message);
        }
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EnglishPracticeApp();
});

// グローバル認証関数
async function signInWithGoogle() {
    try {
        const { signInWithPopup } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
        const result = await signInWithPopup(window.firebaseAuth, window.googleProvider);
        console.log('ログイン成功:', result.user.displayName);
    } catch (error) {
        console.error('ログインエラー:', error);
        alert('ログインに失敗しました。もう一度お試しください。');
    }
}

async function signOut() {
    try {
        const { signOut: firebaseSignOut } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
        await firebaseSignOut(window.firebaseAuth);
        console.log('ログアウト成功');
    } catch (error) {
        console.error('ログアウトエラー:', error);
    }
}

// デバッグ用関数
function testFirestoreConnection() {
    if (window.app && window.app.currentUser) {
        console.log('🔍 Firestore接続テスト開始');
        console.log('ユーザー:', window.app.currentUser.displayName);
        console.log('現在の統計:', window.app.stats);
        
        // 手動でデータ保存をテスト
        window.app.saveUserData();
    } else {
        console.log('❌ ユーザーがログインしていません');
    }
}