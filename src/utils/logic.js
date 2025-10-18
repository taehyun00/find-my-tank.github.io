import { tankResults } from "../data/data";
export function calculateTankType(answers) {
  let code = "";

  answers.forEach(a => {
    const [pos, neg] = a.dimensionId.split("");
    code += (a.score > 0) ? pos : neg;
  });

  return tankResults[code] || { 
    name: "알 수 없는 전차", 
    description: "결과 데이터가 존재하지 않습니다." 
  };
}
