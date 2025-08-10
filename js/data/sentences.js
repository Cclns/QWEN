const ScenarioSentences = {
  introductions: [
    {phrase:'안녕하세요, 저는 ___입니다.', meaning:'Hello, I am ___.', reply:['안녕하세요'], ack:'반갑습니다'},
    {phrase:'만나서 반갑습니다.', meaning:'Nice to meet you.', reply:['네, 반갑습니다'], ack:'네'},
    {phrase:'저는 한국어를 조금 해요.', meaning:'I speak a little Korean.', reply:['와, 잘하시네요'], ack:'감사합니다'}
  ],
  restaurant: [
    {phrase:'안녕하세요.', meaning:'Hello.', reply:['안녕하세요'], ack:'네'},
    {phrase:'두 명이에요.', meaning:'We are two.', reply:['이쪽으로 오세요'], ack:'감사합니다'},
    {phrase:'메뉴판 주세요.', meaning:'Menu please.', reply:['여기 있습니다'], ack:'감사합니다'},
    {phrase:'이거 주세요.', meaning:'Please give me this.', reply:['네, 알겠습니다'], ack:'네'},
    {phrase:'물 좀 주세요.', meaning:'Water please.', reply:['네, 잠시만요'], ack:'감사합니다'},
    {phrase:'계산서 주세요.', meaning:'Bill please.', reply:['네, 금방 가져올게요'], ack:'네'},
    {phrase:'카드 돼요?', meaning:'Can I pay by card?', reply:['네, 됩니다'], ack:'감사합니다'},
    {phrase:'잘 먹었습니다.', meaning:'Thank you for the meal.', reply:['감사합니다'], ack:'안녕히 계세요'}
  ],
  cafe: [
    {phrase:'안녕하세요.', meaning:'Hello.', reply:['안녕하세요'], ack:'네'},
    {phrase:'아메리카노 한 잔 주세요.', meaning:'One Americano please.', reply:['네, 알겠습니다'], ack:'감사합니다'},
    {phrase:'따뜻한가요?', meaning:'Is it hot?', reply:['네, 따뜻합니다'], ack:'좋아요'},
    {phrase:'여기서 마실게요.', meaning:'I will drink here.', reply:['알겠습니다'], ack:'감사합니다'},
    {phrase:'계산서 주세요.', meaning:'Bill please.', reply:['네, 여기 있습니다'], ack:'감사합니다'},
    {phrase:'카드로 계산할게요.', meaning:'I will pay by card.', reply:['네, 카드 주세요'], ack:'여기요'},
    {phrase:'잘 마셨습니다.', meaning:'Thanks for the drink.', reply:['감사합니다'], ack:'안녕히 계세요'}
  ],
  hotel: [
    {phrase:'안녕하세요. 예약했어요.', meaning:'Hello. I have a reservation.', reply:['성함이 어떻게 되세요?'], ack:'___입니다'},
    {phrase:'체크인하고 싶어요.', meaning:'I would like to check in.', reply:['여권 보여주세요'], ack:'네, 여기요'},
    {phrase:'짐 좀 맡아주세요.', meaning:'Please keep my luggage.', reply:['네, 맡아드릴게요'], ack:'감사합니다'},
    {phrase:'세탁 서비스 있나요?', meaning:'Do you have laundry service?', reply:['네, 있습니다'], ack:'얼마예요?'},
    {phrase:'얼마예요?', meaning:'How much is it?', reply:['하루에 만 원입니다'], ack:'감사합니다'},
    {phrase:'체크아웃할게요.', meaning:'I will check out.', reply:['네, 즐거운 여행 되세요'], ack:'감사합니다'},
    {phrase:'감사합니다.', meaning:'Thank you.', reply:['감사합니다'], ack:'안녕히 계세요'}
  ]
};
