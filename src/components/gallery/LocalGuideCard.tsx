import { LocalGuide } from "../../hooks/useLocalGuideInformation";

type LocalGuideCardProps = {
    localGuide: LocalGuide;
};

export function LocalGuideCard(props: LocalGuideCardProps) {
    return (
        <div className="">
            <div
                className="h-[300px] lg:w-[400px] w-[96vw] flex rounded-2xl"
                style={{
                    background: `url(${props.localGuide._source.photo}) lightgray 50% / cover no-repeat`,
                }}
            >
                <div
                    className="h-[97px] mt-auto w-full rounded-b-2xl"
                    style={{
                        background: "rgba(0, 0, 0, 0.30)",
                    }}
                >
                    <div className="pl-[31px] pt-[12px] font-[700] text-white">
                        <div className="text-3xl">{props.localGuide._source.name}</div>
                        <div className="text-xl truncate w-[80%]">{props.localGuide._source.personal_title}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
