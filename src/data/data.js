export const quizDimensions = [
    { 
        id: 'AD', title: '공격/수비 성향', 
        questions: [
            {
                question: '당신은 축구를 합니다.<br>수비를 하실겁니까? 공격을 하실겁니까?',
                options: [
                    { text: '수비', score: -1 }, 
                    { text: '공격', score: 1 }
                ]
            }
        ] 
    },
    
    { 
        id: 'BH', title: '대격돌/보조 성향', 
        questions: [
            {
                question: '불쌍한 친구 2명이 싸우고 있습니다.<br>언쟁에 껴들어 1ㄷ1ㄷ1 구조를 가져갑니까?<br>한 명을 도와 2ㄷ1 구조를 가져갑니까?',
                options: [
                    { text: '1ㄷ1ㄷ1 만들기', score: 1 }, 
                    { text: '2ㄷ1 만들기', score: -1 }
                ]
            }
        ] 
    },
    
    { 
        id: 'OT', title: '돌파/전략 성향', 
        questions: [
            {
                question: '친구가 장난을 걸어옵니다.<br>당신은 친구의 약점을 터트립니까, 들고 협박합니까?',
                options: [
                    { text: '친구의 약점 퍼트리기', score: 1 }, 
                    { text: '친구의 약점 들고 협박하기', score: -1 }
                ]
            }
        ] 
    },
    
    { 
        id: 'CG', title: '치명타/점진적 성향', 
        questions: [
            {
                question: '당신은 이세계에 떨어진 모험가입니다.<br>치명타 무기와 지속딜 무기 중 무엇을 선택할 것입니까?',
                options: [
                    { text: '치명타', score: 1 }, 
                    { text: '지속딜', score: -1 }
                ]
            }
        ] 
    }
];

export const tankResults = {
    'OICE': { name: '독일 8호 전차 마우스', description: '치명적인 한 방을 추구하는 극공형 전차' },
    'DSMA': { name: '영국 처칠 전차', description: '단단한 장갑과 꾸준한 지원을 중시하는 수비형 전차' },
    // ... 나머지 14개 결과 코드를 정의해야 함 (총 16개)
};