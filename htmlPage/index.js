module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'index.html',
    template: 'App.ejs',
    action: 'index',
    description: 'First Class 頭等倉運動空間推出多元運動為方向的規劃，除了一對一私人教練課、體態評估、團體課程等，也歡迎自由教練場租，另提供教練新媒體行銷推廣。',
    chunks: ['index']
  }, {
    title: '關於我們',
    filename: 'about.html',
    template: 'App.ejs',
    action: 'about',
    description: 'First Class 頭等倉運動空間，不受限於健身房和健身概念，我們的目標是讓每一位學生培養出運動的興趣，除了重訓，功能性訓練、增肌減脂、體態雕塑都是我們擅長的項目。',
    chunks: ['about']
  }, {
    title: '私人教練課',
    filename: 'service.html',
    template: 'App.ejs',
    action: 'service',
    description: 'First Class 頭等倉運動空間推出多元運動為方向的規劃，除了一對一及一對二私人教練課，也歡迎自由教練場租。',
    chunks: ['service']
  }, {
    title: '教練招募',
    filename: 'careers.html',
    template: 'App.ejs',
    action: 'careers',
    description: 'First Class 頭等倉運動空間正在招募新血! 對於健身有想法、教學有熱忱，擁有健談外向人格特質的你，快來投遞履歷!',
    chunks: ['careers']
  }, {
    title: '專業教練團隊',
    filename: 'ourteam.html',
    template: 'App.ejs',
    action: 'ourteam',
    description: 'First Class 頭等倉運動空間目前有四位教練，對於增肌減脂、體態雕塑、肌力訓練、健美、健力都保持著專業知識，不斷精進自我能力，只為了提供學生更安全有效率的健身教學內容。',
    chunks: ['ourteam']
  }, {
    title: '教練課預約體驗',
    filename: 'contact.html',
    template: 'App.ejs',
    action: 'contact',
    description: '對於增肌減脂、體態雕塑、肌力訓練、健美、健力有需求的您，歡迎填寫 First Class 頭等倉運動空間體驗表單、預約一對一私人教練課體驗健身氛圍。',
    chunks: ['contact']
  }, {
    title: '交通與環境',
    filename: 'information.html',
    template: 'App.ejs',
    action: 'information',
    description: 'First Class 頭等倉運動空間位於民權西路捷運站四號出口步行約三分鐘處，附近有兩大停車場，方便的交通與地理位置，讓您不再因為距離因素而放棄健身的熱情。',
    chunks: ['information']
  }, {
    title: '教練課預約體驗',
    filename: 'resevation.html',
    template: 'App.ejs',
    action: 'resevation',
    description: 'First Class 頭等倉運動空間目前推出免費體驗課與新生優惠前10堂8000元活動，幫助想要打好重訓基礎的人用最少的投資換到最大的效益，本店位於民權西路捷運站四號出口步行約三分鐘處，位處台北市中心，方便的交通讓您不再因距離因素而放棄健身的熱情。',
    chunks: ['resevation']
  }, {
    title: '感謝您的預約!',
    filename: 'thankyou.html',
    template: 'App.ejs',
    action: 'resevation',
    description: '感謝您預約 First Class 頭等倉運動空間免費體驗課程',
    chunks: ['thankyou']
  }]
};
