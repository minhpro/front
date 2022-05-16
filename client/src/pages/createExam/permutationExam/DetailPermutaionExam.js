import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import * as Class from "Class";
import * as Function from "functions";
import * as Api from "api";
import { useParams } from "react-router-dom";
import * as Co from "components";

const DetailPermutaionExam = () => {
    const param = useParams();

    const [data, setData] = React.useState(null);
    const [testKit, setTestKit] = React.useState(null);
    React.useEffect(async () => {
        try {
            const res = await Api.testKitApi.getExam(param.id);
            const res2 = await Api.testKitApi.getDetail(param.id);
            setTestKit(res2)
            console.log(res2);
            setData(res);
        } catch (error) {}
    }, []);
    return (
        <Views.ViewContent title={"Đề hoán vị > " + testKit?.name}>
            {(testKit?.kits || []).map(kit =>(
                <Views.ViewBoard sx={{marginTop: "40px"}}>
                    <Mui.Stack spacing={12}>
                        <Mui.Stack py={1}>
                            <Co.Text.Body.Medium>
                                {"Đề thi: " + kit?.code}
                            </Co.Text.Body.Medium>
                        </Mui.Stack>
                    </Mui.Stack>

                    <Mui.Stack sx={{ height: "70vh", overflowY: "scroll" }}>
                        {(data?.questions || []).map((item, i) => (
                            <Mui.Stack key={i} mb={5}>
                                {item.type === "ConstructedResponseQuestion" ? (
                                    <Co.Card.ViewQuestion.Constructed
                                        index={i + 1}
                                        code={item.code}
                                        question={item.question}
                                    />
                                ) : (
                                    <Co.Card.ViewQuestion.MultiChoice
                                        index={i + 1}
                                        code={item.code}
                                        question={item.question}
                                        A={item.answerOne}
                                        B={item.answerTwo}
                                        C={item.answerThree}
                                        D={item.answerFour}
                                    />
                                )}
                            </Mui.Stack>
                        ))}
                    </Mui.Stack>
                </Views.ViewBoard>


            ))}
        </Views.ViewContent>
    );
};

export default DetailPermutaionExam;