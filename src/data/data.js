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
ABOC: { 
name: "15식 VT-5", 
description: "수출형 경전차 계보 유사. 105mm 강선포(38발), RWS(12.7mm·35mm 유탄발사기), 작전거리 450km, 평균속도 70km/h.",
img: "ABOC.png"
},
ABOG: { 
name: "M1A2 Abrams (SEPv3)", 
description: "120mm 활강포, 자동화된 화력통제, RWS(12.7mm). 복합·반응장갑, 최고속 60–70km/h, 작전거리 400–550km.",
img: "ABOG.png"
},
ABTC: { 
name: "T-14 Armata", 
description: "무인 포탑·3인승, 125mm 자동장전 주포(유도탄 발사 가능), 보조기관총 12.7mm, 최고속 75km/h, 항속 500km+.",
img: "ABTC.png"
},
ABTG: { 
name: "T-90MS", 
description: "T-90 계열 현대화형. 125mm 주포, 보조기관총·대전차 미사일 호환, 도로속도 60–72km/h, 항속 500–550km.",
img: "ABTG.png"
},
AHOC: { 
name: "K-2 Black Panther", 
description: "120mm 활강포, 자동장전, 정밀탐지장비(열영상·레이더), 최고속 70km/h, 항속 450km.",
img: "AHOC.png"
},
AHOG: { 
name: "Leopard 2A7", 
description: "120mm L/55 주포, 정밀화력·향상된 FCS, 도로속도 70km/h, 항속 450km, 원거리 정밀 교전에 최적.",
img: "AHOG.png"
},
AHTC: { 
name: "Type 10 (Japan)", 
description: "120mm L/44 주포(22발), 48t 경량 차체, CVT 변속기·하이드로서스펜션, 최고속 70km/h, 항속 500km.",
img: "AHTC.png"
},
AHTG: { 
name: "Arjun Mk II", 
description: "120mm 강선포, 1,500hp 엔진, 최고속 70km/h, 항속 450–500km, 다무장·고화력 조합.",
img: "AHTG.png"
},
DBOC: { 
name: "Merkava Mk.4", 
description: "120mm 주포, 전방 엔진 배치로 생존성 강조, 보조: 12.7mm·7.62mm·60mm 박격포, 최고속 64km/h, 항속 500km.",
img: "DBOC.png"
},
DBOG: { 
name: "T-72B3", 
description: "125mm 주포(자동장전), 향상된 화력통제장치, 최고속 70km/h, 항속 500km. 근거리 방어형.",
img: "DBOG.png"
},
DBTC: { 
name: "Leclerc", 
description: "120mm L/52 주포(자동장전), 1,500hp 엔진, 최고속 71km/h, 항속 550km, 근거리 다무장 고화력.",
img: "DBTC.png"
},
DBTG: { 
name: "K1A2", 
description: "120mm 주포, 보조기관총·원격무장, 최고속 65km/h, 항속 500km, 지속전·점진적 피해 누적에 강함.",
img: "DBTG.png"
},
DHOC: { 
name: "Challenger 2", 
description: "120mm 강선포(50발), 첨단 복합장갑, 최고속 59km/h, 항속 550km, 방어형 고화력 전차.",
img: "DHOC.png"
},
DHOG: { 
name: "Leopard 2A4", 
description: "120mm 주포(라이넘탈), 안정된 화력통제, 최고속 68–70km/h, 항속 450km, 장거리 정밀 지속형.",
img: "DHOG.png"
},
DHTC: { 
name: "ZTZ-99 (Type 99)", 
description: "125mm 자동장전 주포(미사일 발사 가능), 1,500hp 엔진, 최고속 80km/h, 항속 600km.",
img: "DHTC.png"
},
DHTG: { 
name: "BMP-3 (IFV)", 
description: "100mm + 30mm + 7.62mm 다무장, 수상주행 가능, 최고속 70km/h, 항속 600km, 지속 지원형.",
img: "DHTG.png"
},
};