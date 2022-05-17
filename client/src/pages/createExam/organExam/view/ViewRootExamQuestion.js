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

export const ViewRootExamQuestion = () => {
    const param = useParams();

    const [data, setData] = React.useState(null);
    React.useEffect(async () => {
        try {
            const res = await Api.testKitApi.getExam(param.id);
            console.log(res);
            setData(res);
        } catch (error) {}
    }, []);
    return (
        <Views.ViewContent title={"Khảo thí > " + data?.code}>
            <Views.ViewBoard>
                <Mui.Stack sx={{ height: "70vh", overflowY: "scroll" }}>
                    {data
                        ? data.questions.map((item, i) => (
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
                        ))
                        : null}
                </Mui.Stack>
            </Views.ViewBoard>
        </Views.ViewContent>
    );
};
